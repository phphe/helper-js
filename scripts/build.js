const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const zlib = require('zlib')
const rollup = require('rollup')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

let builds = require('./config').getAllBuilds()

// filter builds via command line arg
if (process.argv[2]) {
  const filters = process.argv[2].split(',')
  builds = builds.filter(b => {
    return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
  })
}

build(builds)

function build (builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}

function buildEntry (config) {
  const output = config.output
  const isZip = Boolean(config.plugins.find(v => v.name === 'terser'))
  const { file, banner } = output
  return rollup.rollup(config)
    .then(bundle => bundle.generate(output))
    .then(async bundle => {
      const {code, map} = bundle.output[0]
      if (output.sourcemap) {
        const mapPath = `${file}.map`
        await write(mapPath, map.toString())
      }
      await write(file, code, isZip)
    })
}

function write (dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }
    mkdirp.sync(path.dirname(dest))
    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
