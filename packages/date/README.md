
# @licq/date

封装一些日期的操作方法
[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@licq/date.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@licq/date
[download-image]: https://img.shields.io/npm/dm/@licq/date.svg?style=flat-square
[download-url]: https://npmjs.org/package/@licq/date
## 安装

```js
npm i --save-dev @licq/date
```

## API
### formatTime 

格式化日期


**Returns**: String  
**Since**: v1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| format | <code>String</code> | 格式 default: 'yyyy-MM-dd hh:mm:ss' |
| date | <code>Date</code> | 日期 default: new Date() |

**Example**  
```js
const date = require('@licq/date')
const res = date.formatTime()
//==> eg: 2022-01-09 17:58:02

const res = date.formatTime('yyyy-MM-dd')
//==> eg: 2022-01-09
```
