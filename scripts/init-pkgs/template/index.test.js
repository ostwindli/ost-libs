const {{PKG_NAME}} = require("./index.js");

(async function () {
  const res = {{PKG_NAME}}.helloWorld(1);
  console.log("\nhelloWorld测试结果", res);
})();
