const fs = require('fs')
const http = require('http')
const download = require('..')
const path = require('path')
const test = require('tape')

const data = new Buffer('hello everybody I am the data')

const testServer = http.createServer(function (req, res) {
  if (!req.headers['range']) {
    res.setHeader('content-length', data.length)
    res.setHeader('accept-ranges', 'bytes')
    res.end(data)
  } else {
    const range = req.headers['range'].split('=').pop().split('-').map(function (s) {
      return parseInt(s, 10)
    })
    res.setHeader('content-length', range[1] - range[0])
    res.setHeader('content-range', range[0] + '-' + range[1] + '/' + data.length)
    res.end(data.slice(range[0], range[1]))
  }
})

const target = path.join(__dirname, 'foobar.html')
if (fs.existsSync(target)) fs.unlinkSync(target)

fs.writeFileSync(target, data.slice(0, 10))

testServer.listen(0, function () {
  const port = this.address().port
  test('fetches rest of file', function (t) {
    download('http://localhost:' + port + '/foobar.html', {dir: __dirname, resume: true, quiet: true}, function (err) {
      if (err) t.ifErr(err)
      t.ok(fs.existsSync(target), 'downloaded file')
      t.equal(fs.statSync(target).size, data.length, 'file is complete')
      if (fs.existsSync(target)) fs.unlinkSync(target)
      t.end()
      testServer.close()
    })
  })
})
