const home = require('user-home')
const fs = require('fs');
const isSemver = require('is-semver')
const config = require("./config");
const path = require('path')
const platform = require('./os').platform
const oldVesrion = require('./old-version')

const nwPath = `${home}/.nwjs`;

function getCurrentVersion() {
    return config.get("current");
}

function setCurrentVersion(version){
    config.set('current', version)
}

function getInstalledVersions() {
    let versions = fs.readdirSync(nwPath)
    versions = versions
        .filter(v => isSemver(v) && fs.statSync(path.join(nwPath, v)).isDirectory())
    // console.log(versions, getCurrentVersion(), '\n')
    return versions
}

function getNwBinPath() {
    const version = getCurrentVersion()
    const isNodeWebkit = oldVesrion(version)
    if (version) {
        let nw
        if (platform === 'osx') {
            nw = isNodeWebkit ? 'node-webkit.app/Contents/MacOS/node-webkit' : 'nwjs.app/Contents/MacOS/nwjs'
        } else if (platform === 'win') {
            nw = 'nw.exe'
        } else {
            nw = 'nw'
        }
        nw = path.join(nwPath, version, nw)

        return nw
    }

    return null
}


module.exports = {
    nwPath,
    getInstalledVersions,
    getCurrentVersion,
    getNwBinPath,
    setCurrentVersion
}