const chalk = require('chalk');
const utils = require('./utils')

module.exports = function (version) {
  const versions = utils.getInstalledVersions();
  if(!versions.includes(version)){
    return console.log(`Run ${chalk.red(`tnw install ${version}`)} first`)
  }
  utils.setCurrentVersion(version);
  console.log(chalk.green(`You're using v${version} now!`))
}
