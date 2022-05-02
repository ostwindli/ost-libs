const chalk = require('chalk')
const utils = require('./utils')

module.exports = function () {
  try {
    const current = utils.getCurrentVersion();
    const versions = utils.getInstalledVersions().map(v => v === current ? chalk.green(`* ${v}`) : `  ${v}`)
      .join('\n')
    console.log(versions)
  } catch (e) {
    console.log(e.stack)
  }
}
