const util = require("./index.js");

(async function () {
  const res = util.helloWorld(1);
  console.log("\nhelloWorld测试结果", res === 2);
})();
