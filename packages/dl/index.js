let request = require('request')
const fs = require('fs')
const path = require('path')
const log = require('single-line-log').stdout
const progress = require('progress-stream')
const prettyBytes = require('pretty-bytes')
const throttle = require('throttleit')
const EventEmitter = require('events').EventEmitter
const debug = require('debug')('@licq/dl')

function noop () {}

function dd(urls, opts, callback) {
  if (!Array.isArray(urls)) urls = [urls]
  if (urls.length === 1) opts.singleTarget = true

  let defaultProps = {}

  if (opts.sockets) {
    let sockets = +opts.sockets
    defaultProps.pool = {maxSockets: sockets}
  }

  if (opts.proxy) {
    defaultProps.proxy = opts.proxy
  }

  if (opts.strictSSL !== null) {
    defaultProps.strictSSL = opts.strictSSL
  }

  if (Object.keys(defaultProps).length > 0) {
    request = request.defaults(defaultProps)
  }

  let downloads = []
  let errors = []
  let pending = 0
  let truncated = urls.length * 2 >= (process.stdout.rows - 15)

  urls.forEach(function (url) {
    debug('start dl', url)
    pending++
    let dl = startDownload(url, opts, function done (err) {
      debug('done dl', url, pending)
      if (err) {
        debug('error dl', url, err)
        errors.push(err)
        dl.error = err.message
      }
      if (truncated) {
        let i = downloads.indexOf(dl)
        downloads.splice(i, 1)
        downloads.push(dl)
      }
      if (--pending === 0) {
        render()
        callback(errors.length ? errors : undefined)
      }
    })

    downloads.push(dl)

    dl.on('start', function (progressStream) {
      throttledRender()
    })

    dl.on('progress', function (data) {
      debug('progress', url, data.percentage)

      dl.speed = data.speed
      if (dl.percentage === 100) render()
      else throttledRender()
    })
  })

  let _log = opts.quiet ? noop : log
  render()
  let throttledRender = throttle(render, opts.frequency || 250)

  if (opts.singleTarget) return downloads[0]
  else return downloads

  function render () {
    let height = process.stdout.rows
    let rendered = 0
    let output = ''
    let totalSpeed = 0
    downloads.forEach(function (dl) {
      const pct = dl.percentage
      const speed = dl.speed
      const total = dl.fileSize
      totalSpeed += speed
      if (2 * rendered >= height - 8) return

      rendered++
      if (dl.error) {
        output += 'Downloading ' + path.basename(dl.target) + '\n'
        output += 'Error: ' + dl.error + '\n'
        return
      }

      let bar = Array(Math.floor(45 * pct / 100)).join('=') + '>'
      while (bar.length < 45) bar += ' '
      output += 'Downloading ' + path.basename(dl.target) + '\n' +
      '[' + bar + '] ' + pct.toFixed(1) + '%'
      if (total) output += ' of ' + prettyBytes(total)
      output += ' (' + prettyBytes(speed) + '/s)\n'
    })
    if (rendered < downloads.length) output += '\n... and ' + (downloads.length - rendered) + ' more\n'
    if (downloads.length > 1) output += '\nCombined Speed: ' + prettyBytes(totalSpeed) + '/s\n'
    _log(output)
  }

  function startDownload (url, opts, cb) {
    let targetName = path.basename(url).split('?')[0]
    if (opts.singleTarget && opts.target) targetName = opts.target
    let target = path.resolve(opts.dir || process.cwd(), targetName)
    if (opts.resume) {
      resume(url, opts, cb)
    } else {
      download(url, opts, cb)
    }

    let progressEmitter = new EventEmitter()
    progressEmitter.target = target
    progressEmitter.speed = 0
    progressEmitter.percentage = 0

    return progressEmitter

    function resume (url, opts, cb) {
      fs.stat(target, function (err, stats) {
        if (err && err.code === 'ENOENT') {
          return download(url, opts, cb)
        }
        if (err) {
          return cb(err)
        }
        let offset = stats.size
        let req = request.get(url)

        req.on('error', cb)
        req.on('response', function (resp) {
          resp.destroy()

          let length = parseInt(resp.headers['content-length'], 10)

          // file is already downloaded.
          if (length === offset) return cb()

          if (!isNaN(length) && length > offset && /bytes/.test(resp.headers['accept-ranges'])) {
            opts.range = [offset, length]
          }

          download(url, opts, cb)
        })
      })
    }

    function download (url, opts, cb) {
      let headers = opts.headers || {}
      if (opts.range) {
        headers.Range = 'bytes=' + opts.range[0] + '-' + opts.range[1]
      }
      let read = request(url, { headers: headers })

      read.on('error', cb)
      read.on('response', function (resp) {
        debug('response', url, resp.statusCode)
        if (resp.statusCode > 299 && !opts.force) return cb(new Error('GET ' + url + ' returned ' + resp.statusCode))
        let write = fs.createWriteStream(target, {flags: opts.resume ? 'a' : 'w'})
        write.on('error', cb)
        write.on('finish', cb)

        let fullLen
        let contentLen = Number(resp.headers['content-length'])
        let range = resp.headers['content-range']
        if (range) {
          fullLen = Number(range.split('/')[1])
        } else {
          fullLen = contentLen
        }

        progressEmitter.fileSize = fullLen;

        let downloaded;
        if (range) {
          downloaded = fullLen - contentLen
        }
        let progressStream = progress({ length: fullLen, transferred: downloaded }, onprogress)
        progressEmitter.emit('start', progressStream)

        resp
          .pipe(progressStream)
          .pipe(write)
      })

      function onprogress (p) {
        let pct = p.percentage
        progressEmitter.progress = p
        progressEmitter.percentage = pct
        progressEmitter.emit('progress', p)
      }
    }
  }
}


function downloadAsync(urls, opts = {}){


	return new Promise(function (resolve, reject) {
		dd(urls, opts, function (err) {
			if (err) {
				return reject(new Error(err))
			}
			resolve()
		})
	})
}

module.exports = {
  download: dd,
  downloadAsync
}