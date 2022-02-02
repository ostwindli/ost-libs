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
//==> eg: { userName: 'ostwindli', userEmail: 'ostwindli@tencent.com' }
```
### getGitChangelog 

根据git项目，生成对应的changelog的markdown内容


**Returns**: String  
**Since**: v2.0.0  

| Param | Type | Description |
| --- | --- | --- |
| Params | <code>Object</code> | 参数 |
| Params.gitProjectPath | <code>String</code> | git项目路径 [必填] eg："/Users/xxx/asenal" |
| Params.gitCommitRepo | <code>String</code> | git项目仓库提交路径 [必填] eg: "https://github.com/ostwindli/asenal/commit" |
| Params.titleArray | <code>Array</code> \| <code>undefined</code> | 生成的changlog头信息 [可选] eg：['# 更新日志', '更新内容简介xxx'] |
| Params.markdownFile | <code>String</code> \| <code>undefined</code> | 生成的markdown文件路径 [可选] eg："/Users/xxx/asenal/CHANGELOG.md" |

**Example**  
```js
const git = require('@licq/git')
const res = git.getGitChangelog({
    gitProjectPath: __dirname,
    gitCommitRepo: 'https://github.com/ostwindli/asenal/commit',
    titleArray: ['# 更新日志', '\n这是一个测试changelog'],
    markdownFile: '/Users/xxx/asenal/CHANGELOG.md'
})x
//==> eg: https://mpqq.gtimg.cn/ost/asenal/changelog_demo.png
```

