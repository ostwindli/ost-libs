const path = require("path");
const siteCdn = require("./index.js");

(async function () {
  // error
  // siteCdn('test-dist', '/blog/', 'https://demo.cdn.com/')

  // success
  siteCdn(path.join(__dirname, "test-dist"), "/blog/", "https://demo.cdn.com/");

  // success
  //siteCdn(path.join(__dirname, 'test-dist'), '/', 'https://demo.cdn.com/')

  console.log("\nsiteCdn 测试结束");
})();
