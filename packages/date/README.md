
# @licq/date

封装一些日期的操作方法

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
| format | <code>String</code> | 格式 defult: 'yyyy-MM-dd hh:mm:ss' |
| date | <code>Date</code> | 日期 default: new Date() |

**Example**  
```js
const res = formatTime()
//==> eg: 2022-01-09 17:58:02

const res = formatTime('yyyy-MM-dd')
//==> eg: 2022-01-09
```
