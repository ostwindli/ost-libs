# @licq/site-cdn

主要用于静态站点的静态资源走cdn，比如hexo、vuepress

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@licq/site-cdn.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@licq/site-cdn
[download-image]: https://img.shields.io/npm/dm/@licq/site-cdn.svg?style=flat-square
[download-url]: https://npmjs.org/package/@licq/site-cdn

## 安装

```js
npm i --save-dev @licq/site-cdn
```

## API

### siteCdn 

替换`vuepress`、`hexo`等构建产物里html的静态资源路径


**Returns**: undefined  
**Since**: v1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dist | <code>String</code> | 构建产物绝对路径 |
| base | <code>String</code> | 静态资源前缀 eg： '/' | '/blog/' |
| cdn | <code>String</code> | cdn地址 eg: 'https://demo.cdn.com/blog/' |

**Example**  
```js
const siteCdn = require('@licq/site-cdn')
siteCdn('/Users/xxx/path/to/vuepress/dist', '/blog/', 'https://demo.cdn.com/blog/')
//==> undefined
```
**Example**  
```js
// eg: xxx.html ===>

// -<script type="module" src="/blog/assets/app.7bfa9b79.js" defer></script>
// +<script type="module" src="https://demo.cdn.com/blog/assets/app.7bfa9b79.js" defer></script>

// -<link rel="stylesheet" href="/blog/assets/style.c2b7e6ed.css">
// +<link rel="stylesheet" href="https://demo.cdn.com/blog/assets/style.c2b7e6ed.css">

// -<img class="logo" src="/blog/assets/ost-hourse.png" alt="Ostwindli's Asenal">
// +<img class="logo" src="https://demo.cdn.com/blog/assets/ost-hourse.png" alt="Ostwindli's Asenal">
```

