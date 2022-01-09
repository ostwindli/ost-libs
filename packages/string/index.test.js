const util = require("./index.js");

(async function () {
  const res = util.randomString(10);
  console.log(`\n randomString 测试结果:${res.length}\n`);
})();
