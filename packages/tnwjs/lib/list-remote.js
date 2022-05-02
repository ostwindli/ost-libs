const Spin = require('io-spin')
const chalk = require('chalk')
const aimer = require('aimer')
const isSemver = require('is-semver')
const utils = require('./utils')

const spin = new Spin()

function getRemote() {
  return aimer('http://dl.nwjs.io/')
    .then(function ($) {
      var versions = []
      $('tr').each(function () {
        var v = $(this).find('a').text()
        v = v.substring(1, v.length - 1)
        if (isSemver(v)) {
          versions.push(v)
        }
      })
      return versions
    })
    .catch(function (e) {
      throw e
    })
}

module.exports = async function () {
  try {
    spin.start()
    const current = utils.getCurrentVersion()
    let versions = await getRemote()
    versions = versions
      .map(v => v === current ? chalk.green(`* ${v}`) : `  ${v}`)
      .join('\n')
    spin.stop()
    console.log(versions)
  } catch (e) {
    spin.stop()
    console.log(e.stack)
  }
}
