const str = require("./index.js");

(async function () {
  const res = str.randomString(32);
  console.log(`\n randomstr 测试结果:${res}\n`);

  const uuid = str.uuid();
  console.log(`\n uuid 测试结果:${uuid}\n`);


  const isUUID = str.uuidValidate(uuid);
  console.log(`\n uuidValidate 测试结果:${isUUID}\n`);// true

  const isUUID1 = str.uuidValidate(res);
  console.log(`\n uuidValidate 测试结果:${isUUID1}\n`);// false

})();
