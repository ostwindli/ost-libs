const glob = require("glob");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

/**
 * 替换`vuepress`、`hexo`等构建产物里html的静态资源路径, 拼接cdn
 * @name siteCdn
 * @param {fs.PathLike} dist 构建产物绝对路径
 * @param {String} base 静态资源前缀 eg： '/' | '/blog/'
 * @param {String} cdn cdn地址 eg: 'https://demo.cdn.com/blog/'
 * @since v1.0.0
 * @returns undefined
 * @example
 * const siteCdn = require('@licq/site-cdn')
 * siteCdn('/Users/xxx/path/to/vuepress/dist', '/blog/', 'https://demo.cdn.com/')
 * //==> undefined
 * @example
 * // eg: xxx.html ===>
 *
 * // - <script type="module" src="/blog/assets/app.7bfa9b79.js" defer></script>
 * // + <script type="module" src="https://demo.cdn.com/blog/assets/app.7bfa9b79.js" defer></script>
 *
 * // - <link rel="stylesheet" href="/blog/assets/style.c2b7e6ed.css">
 * // + <link rel="stylesheet" href="https://demo.cdn.com/blog/assets/style.c2b7e6ed.css">
 *
 * // - <img class="logo" src="/blog/assets/ost-hourse.png" alt="Ostwindli's Asenal">
 * // + <img class="logo" src="https://demo.cdn.com/blog/assets/ost-hourse.png" alt="Ostwindli's Asenal">
 */
function siteCdn(dist, base, cdn) {
  if (!path.isAbsolute(dist) || !fs.existsSync(dist)) {
    return log(`dist:<${dist}>不是绝对路径或不存在，请检查`);
  }

  log("替换静态资源cdn start");

  // 更新dom的src或href
  function updateSrc($el, srcName) {
    const src = $el.attr(srcName);
    if (src && src.startsWith(base)) {
      $el.attr(srcName, (cdn + src).replace(/(?<!:)(\/+)/g, "/"));
    }
  }

  // 找出所有 html 文件
  const htmls = glob.sync(`${dist}/**/**.html`);
  // 处理本地 script
  htmls.forEach(async (html) => {
    const content = fs.readFileSync(html).toString();
    const $ = cheerio.load(content);

    const scripts = $("script");
    scripts.each((i, el) => updateSrc($(el), "src"));

    // 处理本地 link style
    const styles = $("link");
    styles.each((i, el) => updateSrc($(el), "href"));

    // 处理本地 图片
    const imgs = $("img");
    imgs.each((i, el) => updateSrc($(el), "src"));

    const newContent = $.html();
    fs.writeFileSync(html, newContent);
  });

  log("替换静态资源cdn end");
}

function log(...args) {
  console.log(`====> `, ...args);
}

module.exports = siteCdn;
