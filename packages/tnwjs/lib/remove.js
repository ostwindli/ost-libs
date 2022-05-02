const fs = require('fs');
const utils = require('./utils');
const chalk = require('chalk');
const figures = require('figures')
require('shelljs/global')

module.exports = function (version) {
  try {
    const dir = `${utils.nwPath}/${version}`;
    if(!fs.existsSync(dir)){
      return console.log(chalk.red(`${figures.cross} 版本 ${version} 不存在`))
    }

    const current = utils.getCurrentVersion()
    if (current === version) {
      utils.setCurrentVersion(null)
    }
    rm('-rf', dir);
    console.log(chalk.green(`${figures.tick} 版本${version}移除成功`))
  } catch (e) {
    console.log(e.stack)
  }
}
