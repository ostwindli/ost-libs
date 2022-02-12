const site-cdn = require("./index.js");

(async function () {
  const res = site-cdn.helloWorld(1);
  console.log("\nhelloWorld测试结果", res);
})();
