# @licq/dl

文件下载

## 安装

```sh
npm i @licq/dl -g
or
npm i --save @licq/dl
```

## 使用

### 常规使用

```js
const dl = require("@licq/dl");

const testUrl = "https://dl.nwjs.io/v0.64.0/nw.lib";
const testUrl1 = "http://dl.nwjs.io/v0.57.1/nwjs-sdk-v0.57.1-win-x64.zip";
(async function () {
  // async
  await dl.downloadAsync(testUrl);

 // multiples
  dl.download([testUrl, testUrl1], {
    dir: __dirname, 
    target: 'demo.zip',
  }, (error) => {
    error && console.error(error);
  });
})();

// 参数：
// target
// dir
// resume
// force
// sockets
// quiet
// frequency
// proxy
// strictSSL
```

### CLI

```sh
Usage: dl <urls> [options]
  -o, --output     output filename
  -d, --dir        output parent directory
  -c, --continue   resume aborted download
  -f, --force      ignore response codes > 299
  -s, --sockets    concurrent socket limit (default infinity)
  -q, --quiet      disable logging
  --proxy          specify a proxy to use
  --no-strict-ssl  disable strict SSL cehcking
```

### examples

```sh
dl http://foo.com/bar.jpg
# dls bar.jpg and stores it in the current directory
```

or

```sh
dl http://foo.com/bar.jpg -O baz.jpg
# saves it as baz.jpg. you can also do lowercase -o
```

if you get a statusCode of 300 or greater download will stop. you can force it to stream the response into a file anyway by doing `download http://404link.com/file.html -f` or `--force` works too

you can also download multiple files, just pass multiple urls:

![download multiple](https://miniapp.gtimg.cn/test/demo666.png)

## options

The following options are recognized by download:

- `-o|-O|--out` - specify the filename to write to. this only works if you are downloading a single file
- `-d|--dir` - save files in a directory other than the current one.
- `-c|--continue` - resume downloads if a partially complete target file already exists. If the target file exists and is the same size as the remote file, nothing will be done.
- `-f|--force` - force the server response to be saved to the target file, even if it's a non-successful status code.
- `-s|--sockets` - default Infinity. specify the number of http sockets to use at once (this controls concurrency)
- `-q|--quiet` - disable logging
- `--proxy` - specify a proxy to use
- `--no-strict-ssl` - disable strict ssl

## TODO

- replace request with [got](https://github.com/sindresorhus/got)
