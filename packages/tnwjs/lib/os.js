const os = require('os')

let arch = os.arch()
let platform = os.platform()
if (platform === 'darwin') {
  platform = 'osx';
  // nw没有arm64架构的包，写死x64
  arch = 'x64';
} else if (platform === 'win32') {
  platform = 'win'
}

module.exports = {arch, platform}
