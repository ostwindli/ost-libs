
# @licq/string

封装一些字符串的操作方法

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
