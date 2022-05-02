
const spawn = require('child_process').spawn
const fs = require('fs');
const utils = require('./utils')
const chalk = require('chalk');

module.exports = function (dir, opts) {
  try {
    const version = utils.getCurrentVersion()
    const nw = utils.getNwBinPath()

    if (!fs.existsSync(nw)) {
      return console.log(`Cached tnwjs excutable v${version} not found, run ${chalk.cyan(`tnw install ${version}`)} first`)
    }

    const cliArgs = opts.parent.rawArgs.slice(3)

    console.log(`Using tnw.js v${version}`)

    const run = spawn(nw, [dir].concat(cliArgs))
    run.stdout.on('data', data => console.log(data.toString()))
    run.stderr.on('data', data => console.log(data.toString()))
    run.on('close', code => {
      process.exitCode = code
      console.log('===================='.green)
      console.log('bye!'.green)
    })
  } catch (e) {
    console.log(e.stack)
  }
}
