const file = require("./index.js");

(async function () {
  const res = await file.listFiles(__dirname);
  console.log("\nlistFiles测试结果", res);
})();
