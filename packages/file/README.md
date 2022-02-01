
# @licq/file

封装关于文件操作相关的方法
[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@licq/file.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@licq/file
[download-image]: https://img.shields.io/npm/dm/@licq/file.svg?style=flat-square
[download-url]: https://npmjs.org/package/@licq/file
## 安装

```js
npm i --save-dev @licq/file
```

## API
### listFiles 

获取文件夹下所有文件，包含目录


**Returns**: Promise<Array[]>  
**Since**: v1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| rootPath | <code>String</code> | 绝对路径 |

**Example**  
```js
const file = require('@licq/file')
const res = await file.listFiles(__dirname)
// => eg: [{path: '/Users/ostwind/batch/',size: 0,isDir: true}, {path: '/Users/ostwind/batch/package.json',size: 470,isDir: false}]
```
