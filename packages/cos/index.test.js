const path = require("path");
const _ = require("lodash");
const Cos = require("./index.cjs.js");
//const Cos = require("./index.js");
const config = require("./.cos-config.js");

(async function () {
  const cos = new Cos(
    _.merge(config.gtimg, {
      ExtConfig: {
        // Domain: '',//测试域名
      },
      CosObjectConfig: {
        ACL: "public-read",// default、private、public-read
       // Bucket:'',// 测试异常参数
      },
    })
  );
  const res = await cos.uploadFiles(
   // path.join(__dirname, "testfiles/h2r.jpeg"), //测试单个文件
    path.join(__dirname, "testfiles/"), // 测试目录
    "ost/cos/demo5"
  );
  console.log({res})
})();
