const path = require("path");
const _ = require("lodash");
const Cos = require("./index.js");
const config = require("./.cos-config.js");

(async function () {
  const cos = new Cos(
    _.merge(config.gtimg, {
      ExtConfig: {
        // Domain: '',//测试域名
      },
      CosObjectConfig: {
        ACL: "public-read",
        // Bucket:'',// 测试异常参数
      },
    })
  );
  const res = await cos.uploadFiles(
    path.join(__dirname, "testfiles"),
    "ost/cos/demo5"
  );
  console.log({res})
})();
