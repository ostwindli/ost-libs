const fs = require('fs')
const http = require('http')
const download = require('..')
const path = require('path')
const test = require('tape')

const testServer = http.createServer(function (req, res) {
  res.end('hello')
})

const target = path.join(__dirname, 'resume.html')
if (fs.existsSync(target)) fs.unlinkSync(target)

testServer.listen(0, function () {
  const port = this.address().port
  test('fetches file', function (t) {
    download('http://localhost:' + port + '/resume.html', {dir: __dirname, quiet: true}, function (err) {
      if (err) t.ifErr(err)
      t.ok(fs.existsSync(target), 'downloaded file')
      if (fs.existsSync(target)) fs.unlinkSync(target)
      t.end()
    })
  })

  test('has progress events', function (t) {
    let gotProgress = false
    const dl = download('http://localhost:' + port + '/resume.html', {dir: __dirname, quiet: true}, function (err) {
      t.notOk(err, 'no error')
      t.ok(gotProgress, 'got progress event')
      t.end()
      testServer.close()
    })
    dl.once('progress', function (data) {
      t.ok(data.hasOwnProperty('percentage'), 'has percentage')
      gotProgress = true
    })
  })
})
