
# @licq/git

封装一些操作git信息的方法

## 安装

```js
npm i --save-dev @licq/git
```

## API
### getGitUserInfo 

获取当前仓库的Git用户信息


**Returns**: Object  
**Since**: v1.0.0  
**Example**  
```js
const git = require('@licq/git')
const res = git.getGitUserInfo()
//==> eg: { useName: 'ostwindli', useEmail: 'ostwindli@tencent.com' }
```
