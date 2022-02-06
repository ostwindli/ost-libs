const { networkInterfaces } = require("os");
const { exec } = require("child_process");
const { parse, parseCIDR } = require("ipaddr.js");
const defaultGateway = require("default-gateway");
const umi = require("umi-request");
const request = umi.extend({ timeout: 10000 });

/**
 * 获取本机局域网ipV4地址
 * @name getIPV4
 * @since v1.0.0
 * @returns String
 * @example
 * const net = require('@licq/net')
 * const res = net.getIPV4()
 * //==> eg: 192.168.1.10
 */
function getIPV4() {
  return findIp(defaultGateway.v4.sync().gateway);
}

/**
 * 获取本机局域网ipV6地址
 * @name getIPV6
 * @since v1.0.0
 * @returns String
 * @example
 * const net = require('@licq/net')
 * const res = net.getIPV6()
 * //==> eg: fe80::/10
 */
function getIPV6() {
  return findIp(defaultGateway.v6.sync().gateway);
}

/**
 * 获取本机公网ipV4地址
 * @name getPublicIP
 * @since v1.0.0
 * @returns String
 * @example
 * const net = require('@licq/net')
 * const res = await net.getPublicIP()
 * //==> eg: 121.122.200.139
 */
async function getPublicIP() {
  // exec("curl -L ip.tool.lu", function (err, std) {
  //   if (std) {
  //     console.log(std.toString());
  //   }
  // });

  const result = await request("http://pv.sohu.com/cityjson?ie=utf-8");

  let ipstr = result.match(/\d+\.\d+\.\d+\.\d+/g);
  return ipstr && ipstr.length ? ipstr[0] : "";
}

function findIp(gateway) {
  const gatewayIp = parse(gateway);
  for (const addresses of Object.values(networkInterfaces())) {
    for (const address of addresses) {
      const prefix = parse(address.netmask).prefixLengthFromSubnetMask();
      const net = parseCIDR(`${address.address}/${prefix}`);
      if (
        net[0] &&
        net[0].kind() === gatewayIp.kind() &&
        gatewayIp.match(net)
      ) {
        return net[0].toString();
      }
    }
  }
}

module.exports = {
  getIPV4,
  getIPV6,
  getPublicIP,
};
