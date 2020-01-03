const path = require('path')
const fs = require('fs')
const babel = require('rollup-plugin-babel')
const alias = require('@rollup/plugin-alias')
const cjs = require('@rollup/plugin-commonjs')
const replace = require('@rollup/plugin-replace')
const node = require('@rollup/plugin-node-resolve')
const json = require('@rollup/plugin-json')
const {terser} = require('rollup-plugin-terser')
const pkg = require('../package.json')
const resolve = p => path.resolve(__dirname, '../', p)

const options = {
  input: fs.existsSync(resolve('src/index.js')) ? resolve(`src/index.js`) : resolve(`src/${pkg.name}.js`),
  outputName: pkg.name,
  moduleName: camelCase(pkg.name),
  external_cjs_esm: source => {
    const external = [/^core-js/, /^@babel\/runtime/, ...Object.keys(pkg.dependencies)]
    if (external.find(re => re === source || (re.test && re.test(source)))) {
      return true
    }
  },
}

const babelTargetEsmodules = {
  babelrc: false,
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: false,
      "targets": {
        "esmodules": true,
      },
    }]
  ],
}

const builds = {
  'cjs': {
    entry: options.input,
    dest: resolve(`dist/${options.outputName}.cjs.js`),
    format: 'cjs',
    plugins: defaultPlugins({babel: babelTargetEsmodules}),
    external: options.external_cjs_esm,
  },
  'esm': {
    entry: options.input,
    dest: resolve(`dist/${options.outputName}.esm.js`),
    format: 'es',
    plugins: defaultPlugins({babel: babelTargetEsmodules}),
    external: options.external_cjs_esm,
  },
  'umd': {
    entry: options.input,
    dest: resolve(`dist/${options.outputName}.js`),
    format: 'umd',
    plugins: defaultPlugins(),
    moduleName: options.moduleName,
  },
  'umd-min': {
    entry: options.input,
    dest: resolve(`dist/${options.outputName}.min.js`),
    format: 'umd',
    plugins: defaultPlugins(),
    moduleName: options.moduleName,
    sourcemap: false,
  },
}

const aliases = require('./alias')
function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      alias(Object.assign({}, aliases, opts.alias)),
      ...opts.plugins,
    ],
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner || defaultBanner(),
      name: opts.moduleName,
      sourcemap: opts.sourcemap,
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }

  // built-in vars
  const vars = {}
  // build-specific env
  if (opts.env) {
    vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }
  if (Object.keys(vars).length > 0) {
    config.plugins.push(replace(vars))
  }
  const isProd = /(min|prod)\.js$/.test(config.output.file)
  if (isProd) {
    config.plugins.push(terser())
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
function studlyCase (str) {
  return str && (str[0].toUpperCase() + str.substr(1))
}
function camelCase (str) {
  const temp = str.toString().split(/[-_]/)
  for (let i = 1; i < temp.length; i++) {
    temp[i] = studlyCase(temp[i])
  }
  return temp.join('')
}

function defaultBanner() {
  return `
/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author}
 * Released under the ${pkg.license} License.
 */`.trim()
}

function defaultPlugins(opt = {}) {
  return [
    babel({
      runtimeHelpers: true,
      exclude: ['node_modules/**'],
      ...opt.babel
    }),
    node({...opt.node}),
    cjs({...opt.cjs}),
    json({...opt.json}),
  ];
}
