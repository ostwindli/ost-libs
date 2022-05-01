# @licq/platform

获取关于平台的相关信息

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@licq/platform.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@licq/platform
[download-image]: https://img.shields.io/npm/dm/@licq/platform.svg?style=flat-square
[download-url]: https://npmjs.org/package/@licq/platform

## 安装

```js
npm i --save-dev @licq/platform
```

## API


### isMac 

判断是否是Mac系统 支持浏览器、node.js


**Returns**: Boolean  
**Since**: 1.0.0  
**Example**  
```js
const platform = require('@licq/platform')
const res = platform.isMac()
//==> eg: true/false
```
### isLinux 

判断是否是Linux系统 支持浏览器、node.js


**Returns**: Boolean  
**Since**: 1.0.0  
**Example**  
```js
const platform = require('@licq/platform')
const res = platform.isLinux()
//==> eg: true/false
```
### isWin 

判断是否是Windows系统 支持浏览器、node.js


**Returns**: Boolean  
**Since**: 1.0.0  
**Example**  
```js
const platform = require('@licq/platform')
const res = platform.isWin()
//==> eg: true/false
```

