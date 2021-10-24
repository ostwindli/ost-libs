import request from "umi-request";

/**
 * 获取公网ip
 * @since 0.0.1
 * @param {undefined}
 * @returns {string} 返回公网ip 或者 ''
 */
export async function getPublicNetworkIp(): Promise<string> {
  const result = await request("http://pv.sohu.com/cityjson?ie=utf-8");
  let ipstr = result.match(/\d+\.\d+\.\d+\.\d+/g);
  ipstr = ipstr && ipstr.length ? ipstr[0] : "";
  return ipstr;
}
