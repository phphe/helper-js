const packageInfo = require('./package.json')

module.exports = {
  plugins: {
    babel: {
      runtimeHelpers: true,
    }
  },
  output: {
    format: ["esm", "cjs", "umd", "umd-min"],
    moduleName: "helperJs",
    fileName(info, name) {
      name = name.replace(/\[name\]/, packageInfo.name)
      if (info.format === 'umd') {
        name = name.replace(/\.\[format\]/, '')
      } else if (info.format === 'cjs') {
        name = name.replace(/\[min\]/, '.[format][min]')
      }
      return name
    }
  },
};
