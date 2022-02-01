# @licq/string

封装一些字符串的操作方法

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@licq/string.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@licq/string
[download-image]: https://img.shields.io/npm/dm/@licq/string.svg?style=flat-square
[download-url]: https://npmjs.org/package/@licq/string

## 安装

```js
npm i --save-dev @licq/string
```

## API


### randomString 

生成指定长度的随机字符串


**Returns**: String  
**Since**: v1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| length | <code>Number</code> | 长度 |

**Example**  
```js
const str = require('@licq/string')
const res = str.randomString(10);
//==> eg: dUbkGTBgKN
```
### uuid 

生成uuid (v4)


**Returns**: uuid String  
**Since**: v1.0.5  
**Example**  
```js
const str = require('@licq/string')
const uuid = str.uuid()
// ==> 51001e12-509b-4f4a-ad73-8d7de4cef6bf
```
### uuidValidate 

校验是否是uuid


**Returns**: boolean  
**Since**: v1.0.5  

| Param | Type |
| --- | --- |
| uuid | <code>String</code> | 

**Example**  
```js
const str = require('@licq/string')
const isUUID = str.uuidValidate('51001e12-509b-4f4a-ad73-8d7de4cef6bf');
// ==> true
const isUUID1 = str.uuidValidate('eH2dTHAoYOAaxegIeFq7bcGrGhPcfv83');
// ==> false
```

