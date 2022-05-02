# @licq/tnwjs [![version](https://img.shields.io/npm/v/@licq/tnwjs.svg)](https://www.npmjs.com/package/@licq/tnwjs) [![npm](https://img.shields.io/npm/dm/@licq/tnwjs.svg)](https://www.npmjs.com/package/@licq/tnwjs)

You can use `@licq/tnwjs` as an nw.js version manager, and do things like `tnw /your/app/path`

## 安装

```sh
npm i -g @licq/tnwjs
```

## 使用

```sh
# Install a version
$ tnw install 0.64.0

# Install a SDK version
$ tnw install 0.64.0-sdk

# Run tnw in cwd or specific any directory
$ tnw .

# Use SDK version
$ tnw use 0.64.0-sdk

# Show the nw version currently in use
$ tnw current

# List all local cached versions
$ tnw ls

# Use a proxy
$ http_proxy=http://127.0.0.1:8989 tnw install 0.64.0-sdk

```

For all available versions to install please use `tnw ls-remote`

## 帮助

```sh
$ tnw -h

Usage: tnw [options] [command]

Options:
  -V, --version          output the version number
  -h, --help             output usage information

Commands:
  *                      Run nwjs in a directory
  install|i <version>    Install a nwjs version
  use|u <version>        Set an active nwjs version
  list|ls                List local cached nwjs versions
  list-remote|ls-remote  List all available nwjs versions from remote
  remove|r <version>     Remove a specific version of nwjs
  current|c              Show the nw version currently in use
```

## 程序使用

```js
const spawn = require("child_process").spawn;
// this returns the path to nwjs excutable
const nw = require("@licq/tnwjs");

const child = spawn(nw);
```
