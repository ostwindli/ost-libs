const ipUtils = require('ipaddr.js');
const net = require("./index.js");



(async function () {
  let res = net.getIPV4()
  console.log(`\ngetIPV4测试结果: ${res} ${ipUtils.IPv4.isIPv4(res)}\n`);

  res = net.getIPV6()
  console.log(`\ngetIPV6测试结果: ${res} ${ipUtils.IPv6.isIPv6(res)}\n`);

  res = await net.getPublicIP()
  console.log(`\ngetPublicIP测试结果: ${JSON.stringify(res)} ${ipUtils.IPv4.isIPv4(res)}\n`);
})();
