const fs = require('fs')
const path = require('path')
const spawn = require('tape-spawn')
const test = require('tape')

test('usage', function (t) {
  const child = spawn(t, path.join(__dirname, '..', 'bin.js'))
  child.stdout.match(fs.readFileSync(path.join(__dirname, '..', 'usage.txt')).toString() + '\n')
  child.stderr.empty()
  child.end()
})
