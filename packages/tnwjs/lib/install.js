const path = require('path')
const os = require('./os')
const fs = require('fs')
const dl = require('@licq/dl')
const extract = require('extract-zip')
const chalk = require('chalk')
const figures = require('figures')
const oldVersion = require('./old-version')
const utils = require('./utils');
require('shelljs/global')


module.exports = async function (version) {
  try {
    const cacheDir = utils.nwPath;
    mkdir('-p', cacheDir)

    if (fs.existsSync(`${cacheDir}/${version}`)) {// win eg: C:\Users\ostwind\.nwjs/0.57.1-sdk
      return console.log(chalk.red(`A cached nwjs already located in ${cacheDir}/${version}`))
    }

    
    const realVersion = version.split('-sdk').shift()// eg: 0.57.1
    const isNodeWebkit = oldVersion(version)
    const prefix = isNodeWebkit ? 'node-webkit' : 'nwjs';

    // eg: nwjs-sdk-v0.64.0-osx-x64
    const fileName = version == realVersion ? `${prefix}-v${realVersion}-${os.platform}-${os.arch}` : `${prefix}-sdk-v${realVersion}-${os.platform}-${os.arch}`
    const ext = os.platform === 'linux' ? 'tar.gz' : 'zip'
    // eg: https://dl.nwjs.io/v0.64.0/nwjs-sdk-v0.64.0-osx-x64.zip
    const url = `http://dl.nwjs.io/v${realVersion}/${fileName}.${ext}`

    console.log(chalk.green(`\n将从下面链接下载：\n${url}\n`));

    await dl.downloadAsync(url, {dir: cacheDir, target: `${version}.${ext}`, verbose: true, proxy: process.env.HTTP_PROXY})

    // extract both zip and tarball
    const from = `${cacheDir}/${version}.${ext}`
    if (os.platform === 'linux') {
      exec(`tar -xzvf ${from} -C ${cacheDir}`, {silent: true})
    } else {
      await extract(from, {dir: cacheDir})
    }

    mv(`${cacheDir}/${fileName}`, `${cacheDir}/${version}`)
    // remove zip
    rm(from)
    
    utils.setCurrentVersion(version);

    console.log(chalk.green(`${figures.tick} Version ${version} is installed and activated`))
  } catch (e) {
    console.log(chalk.red(`Failed to install ${figures.cross} Version ${version}`))
    console.log(e.message)
  }
}
