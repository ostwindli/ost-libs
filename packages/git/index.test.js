const util = require("./index.js");

(async function () {
  const res = util.getGitUserInfo();
  console.log("\ngetGitUserInfo测试结果", res);
})();
