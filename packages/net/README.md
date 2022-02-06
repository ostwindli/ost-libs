# @licq/net

封装一些关于网络的方法

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@licq/net.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@licq/net
[download-image]: https://img.shields.io/npm/dm/@licq/net.svg?style=flat-square
[download-url]: https://npmjs.org/package/@licq/net

## 安装

```js
npm i --save-dev @licq/net
```

## API


### getIPV4 

获取本机局域网ipV4地址


**Returns**: String  
**Since**: v1.0.0  
**Example**  
```js
const net = require('@licq/net')
const res = net.getIPV4()
//==> eg: 192.168.1.10
```
### getIPV6 

获取本机局域网ipV6地址


**Returns**: String  
**Since**: v1.0.0  
**Example**  
```js
const net = require('@licq/net')
const res = net.getIPV6()
//==> eg: fe80::/10
```
### getPublicIP 

获取本机公网ipV4地址


**Returns**: String  
**Since**: v1.0.0  
**Example**  
```js
const net = require('@licq/net')
const res = await net.getPublicIP()
//==> eg: 121.122.200.139
```

