const utils = require('./utils');

module.exports = function () {
  try {
    const current = utils.getCurrentVersion()
    console.log(current);
  } catch (e) {
    console.log(e.stack);
  }
}
