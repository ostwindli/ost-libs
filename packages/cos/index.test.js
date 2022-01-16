const path = require('path');
const Cos = require("./index.js");
const config = require('./.cos-config.js');

(async function () {
  const cos = new Cos(config.gtimg)
  const res = await cos.uploadFiles(path.join(__dirname, 'testfiles'), 'ost/cos/demo5');
})();
