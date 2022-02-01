# @licq/cos

封装腾讯 cos 上传相关的方法
[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@licq/cos.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@licq/cos
[download-image]: https://img.shields.io/npm/dm/@licq/cos.svg?style=flat-square
[download-url]: https://npmjs.org/package/@licq/cos

## 安装

```js
npm i --save-dev @licq/cos
```

## API

### Cos 

腾讯云对象存储cos上传


**Returns**: instanceof COS  
**Since**: v1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| Config | <code>Object</code> | 对象存储参数 参考：<https://cloud.tencent.com/document/product/436/8629#.E9.85.8D.E7.BD.AE.E9.A1.B9> |
| Config.SecretId | <code>String</code> | 必填 |
| Config.SecretKey | <code>String</code> | 必填 |
| Config.Bucket | <code>String</code> | 必填 |
| Config.Region | <code>String</code> | 必填 |
| Config.ACL | <code>String</code> | 可选 默认：'public-read' |
| Config._Domain | <code>String</code> | 可选 上传后的域名 默认：https://{Bucket}.cos.{Region}.myqcloud.com |

**Example**  
```js
const Cos = require('@licq/cos');
const cos = new Cos(Config);
const res = await cos.uploadFiles(__dirname, 'ost/cos/demo');
// => https://test-web-1251388888.cos.ap-guangzhou.myqcloud.com/ost/cos/demo/demo1.jpeg
// => https://test-web-1251388888.cos.ap-guangzhou.myqcloud.com/ost/cos/demo/demo2.jpeg
```

