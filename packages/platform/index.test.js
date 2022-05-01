const platform = require("./index.js");

(async function () {
  const res = platform.isLinux();
  console.log("\nhelloWorld测试结果", res);
})();
