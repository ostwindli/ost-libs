
# @licq/file

封装关于文件操作相关的方法

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
