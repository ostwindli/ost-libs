const path = require('path');
const Cos = require("./index.js");
const config = require('./.cos-config.js');

(async function () {
  // {
  //   SecretId: "xxxxx",
  //   SecretKey: "yyyyy",
  //   Bucket: "zzzzz",
  //   Region: "ap-guangzhou",
  // }
  const cos = new Cos(config.gtimg)
  const res = cos.uploadFiles(path.join(__dirname, 'testfiles'), 'ost/cos/demo1');
 // console.log("\nhelloWorld测试结果", res);
})();
