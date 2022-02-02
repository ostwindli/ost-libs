const path = require('path');
const util = require("./index.js");

(async function () {
  let res = util.getGitUserInfo();
  console.log("\ngetGitUserInfo测试结果", res);

  res = util.getGitChangelog({
    gitProjectPath: __dirname,
    gitCommitRepo: "https://github.com/ostwindli/asenal/commit",
    titleArray: ['# 更新日志', '\n这是一个测试changelog'],
    markdownFile: path.join(__dirname, 'CHANGELOG.md')
  });
  console.log("\ngetGitChangelog测试结果:\n\n", res);
})();
