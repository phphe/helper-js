var fs = require('fs')
var path = require('path')
var rollup = require('rollup')
var resolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
var uglify = require('uglify-js')
var mkdirp = require('mkdirp')
var babel = require('rollup-plugin-babel')
var mainObj = {
  package: null,
  banner: null,
  babelConfig: null
}

function getBanner() {
  var banner =
    '/*!\n' +
    ' * ' + mainObj.package.name + ' v' + mainObj.package.version + '\n' +
    ' * ' + mainObj.package.author + '\n' +
    ' * ' + (mainObj.package.repository && mainObj.package.repository.url) + '\n' +
    ' * Released under the ' + mainObj.package.license + ' License.\n' +
    ' */\n'
  return banner
}

function getBabelConfig() {
  return {
    presets: [['env', {
      targets: {
        browsers: ['last 2 versions']
      },
      modules: false,
      debug: true
    }]]
  }
}
function compileDir(dir, outputDir, main, opt = {}) {
  main = main ? path.basename(main) : (mainObj.package.name + '.js')
  fs
  .readdirSync(dir)
  .filter(item => fs.statSync(dir + '/' + item).isFile() && item.match(/\.js$/))
  .forEach(item => {
    var filePath = dir + '/' + item
    var temp = path.relative(path.resolve('./src'), path.resolve(filePath)).replace('/', '_').replace('\\', '_')
    var isMain = main === item
    var moduleName = camelCase(isMain ? mainObj.package.name : mainObj.package.name + '_' + temp)
    var opt2 = {
      moduleName: moduleName
    }
    compileFile(filePath, outputDir, opt2)
  })
}
function compileFile(filePath, outputDir, opt = {}) {
  opt = Object.assign({
    moduleName: null, // for umd
    banner: mainObj.banner || getBanner(),
    formats: ['umd', 'cjs', 'esm'],
    babelConfig: getBabelConfig()
  }, opt)
  var name = path.parse(filePath).name
  // umd
  rollup.rollup({
    entry: filePath,
    plugins: [
      resolve(),
      // to include dependencies
      commonjs(),
      babel(opt.babelConfig)
    ]
  })
  .then(function (bundle) {
    var code = bundle.generate({
      format: 'umd',
      banner: opt.banner,
      moduleName: opt.moduleName
    }).code
    return write(`${outputDir}/${name}.js`, code, code)
  })
  .then(function (unminified) {
    var fileName = `${name}.min.js`
    var mapName = `${name}.min.js.map`
    var minified = uglify.minify(unminified, {
      outSourceMap: mapName,
      outFileName: fileName,
      fromString: true
    })
    var code = opt.banner + '\n' + minified.code
    var map = minified.map
    return write(`${outputDir}/${fileName}`, code, code)

    .then(function functionName() {
      return write(`${outputDir}/${mapName}`, map, code)
    })
  })
  .catch(logError)
  // common js and esm
  rollup.rollup({
    entry: filePath,
    plugins: [
      babel(opt.babelConfig)
    ]
  })
  .then(function (bundle) {
    return write(`${outputDir}/${name}.common.js`, bundle.generate({
      format: 'cjs',
      banner: opt.banner
    }).code, bundle)
  })
  .then(function (bundle) {
    return write(`${outputDir}/${name}.esm.js`, bundle.generate({
      format: 'es',
      banner: opt.banner
    }).code, bundle)
  })
  .catch(logError)
}

function write(dest, code, bundle) {
  mkdirp.sync(path.dirname(dest))
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve(bundle)
    })
  })
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError(e) {
  console.log(e)
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
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

mainObj.compileDir = compileDir
mainObj.compileFile = compileFile
mainObj.write = write
module.exports = mainObj
