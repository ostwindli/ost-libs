# @licq/git

封装一些操作 git 信息的方法

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@licq/git.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@licq/git
[download-image]: https://img.shields.io/npm/dm/@licq/git.svg?style=flat-square
[download-url]: https://npmjs.org/package/@licq/git

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

