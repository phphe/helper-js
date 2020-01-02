const {filterBuilds, build} = require('rollup-helper')

let builds = require('./config').getAllBuilds()
builds = filterBuilds(builds)
build(builds)
