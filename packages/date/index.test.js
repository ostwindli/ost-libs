const util = require("./index.js");

(async function () {
  const res = util.formatTime();
  console.log("\nformatTime()测试结果", res);
  const res1 = util.formatTime("yyyy-MM-dd");
  console.log("\nformatTime('yyyy-MM-dd')测试结果", res1);
})();
