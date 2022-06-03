# @licq/log

写本地日志

目录：`path.join(os.tmpdir(), 'lcq/log')`

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@licq/log.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@licq/log
[download-image]: https://img.shields.io/npm/dm/@licq/log.svg?style=flat-square
[download-url]: https://npmjs.org/package/@licq/log

## 安装

```js
npm i --save-dev @licq/log
```

## API


### info 

打印info日志


**Returns**: null  
**Since**: v1.0.0  

| Param | Type |
| --- | --- |
| ...类似console.log参数 | <code>msg</code> | 

**Example**  
```js
const log = require('@licq/log')
const res = log.info(1, null, {}, true)
```
### info 

打印warn日志


**Returns**: null  
**Since**: v1.0.0  

| Param | Type |
| --- | --- |
| ...类似console.warn参数 | <code>msg</code> | 

**Example**  
```js
const log = require('@licq/log')
const res = log.warn(1, null, {}, true)
```
### info 

打印error日志


**Returns**: null  
**Since**: v1.0.0  

| Param | Type |
| --- | --- |
| ...类似console.error参数 | <code>msg</code> | 

**Example**  
```js
const log = require('@licq/log')
const res = log.error(1, null, {}, true)
```
### openLogDir 

打开日志目录、降级则是临时目录 path.join(os.tmpdir(), `lcq/log`)


**Returns**: null  
**Since**: v1.0.0  
**Example**  
```js
const log = require('@licq/log')
log.openLogDir()
```
### cleanLogDir 

清空日志目录 path.join(os.tmpdir(), `lcq/log`)


**Returns**: null  
**Since**: v1.0.0  
**Example**  
```js
const log = require('@licq/log')
log.cleanLogDir()
```

