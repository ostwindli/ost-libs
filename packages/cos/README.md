# @licq/cos

基于腾讯 cos nodesdk, 封装批量上传方法，特点是简单，并发效率高

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
**Since**: v2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| Config | <code>Object</code> | 对象存储参数 参考：<https://cloud.tencent.com/document/product/436/8629#.E9.85.8D.E7.BD.AE.E9.A1.B9> |
| Config.SecretId | <code>String</code> | 必填 |
| Config.SecretKey | <code>String</code> | 必填 |
| Config.CosObjectConfig | <code>Object</code> | 参见 <https://cloud.tencent.com/document/product/436/64980#.E7.AE.80.E5.8D.95.E4.B8.8A.E4.BC.A0.E5.AF.B9.E8.B1.A1> 中的参数说明 |
| Config.CosObjectConfig.Bucket | <code>String</code> | 必填 |
| Config.CosObjectConfig.Region | <code>String</code> | 必填 |
| Config.CosObjectConfig.ACL | <code>String</code> | 可选 默认：'public-read' |
| Config.ExtConfig | <code>Object</code> | 可选 本工具自定义参数 |
| Config.ExtConfig.Domain | <code>String</code> | 可选 上传后的域名 默认：https://{Bucket}.cos.{Region}.myqcloud.com |

**Example**  
```js
const Cos = require('@licq/cos');
const cos = new Cos({
   SecretId: "SECRET_ID",
   SecretKey: "SECRET_KEY",
   CosObjectConfig: {
      Bucket: "test-12345678",
      Region: "ap-guangzhou",
      ACL: 'default'
   },
   ExtConfig: {
      Domain: 'https://demos.gtimg.cn/',
   }
});

await cos.uploadFiles(__dirname, 'ost/cos/demo');
```

* [Cos](#Cos) 

    * [.uploadFiles(localPath, cosPath)](#Cos+uploadFiles) 

    * [.uploadFileByData(cosPath, fileData)](#Cos+uploadFileByData) 


#### cos.uploadFiles(localPath, cosPath) 

批量上传


**Returns**: Promise  

| Param | Type | Description |
| --- | --- | --- |
| localPath | <code>String</code> | 本地文件/目录的绝对路径 |
| cosPath | <code>String</code> | cos的path |

#### cos.uploadFileByData(cosPath, fileData) 

通过文件数据上传


**Returns**: Promise<>  
**Since**: v2.1.3  

| Param | Type | Description |
| --- | --- | --- |
| cosPath | <code>String</code> | cos路径 |
| fileData | <code>Buffer</code> \| <code>String</code> \| <code>Stream</code> | 文件数据 |


