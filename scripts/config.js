const {genConfig: genConfig0, camelCase, defaultPlugins, parseIntFloat} = require('rollup-helper')
const path = require('path')
const fs = require('fs')
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

const builds = {
  'cjs': {
    entry: options.input,
    dest: resolve(`dist/${options.outputName}.cjs.js`),
    format: 'cjs',
    plugins: defaultPlugins(),
    external: options.external_cjs_esm,
  },
  'esm': {
    entry: options.input,
    dest: resolve(`dist/${options.outputName}.esm.js`),
    format: 'es',
    plugins: defaultPlugins(),
    external: options.external_cjs_esm,
  },
  'umd': {
    entry: options.input,
    dest: resolve(`dist/${options.outputName}.js`),
    format: 'umd',
    plugins: defaultPlugins(),
    moduleName: options.moduleName,
    external: parseIntFloat,
  },
  'umd-min': {
    entry: options.input,
    dest: resolve(`dist/${options.outputName}.min.js`),
    format: 'umd',
    plugins: defaultPlugins(),
    moduleName: options.moduleName,
    sourcemap: true,
    external: parseIntFloat,
  },
}

const aliases = require('./alias')
function genConfig(name) {
  return genConfig0({name, pkg, aliases, builds})
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
