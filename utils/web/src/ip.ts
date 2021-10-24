import request from "umi-request";
export async function getPublicNetworkIp(): Promise<string> {
  const result = await request("http://pv.sohu.com/cityjson?ie=utf-8");
  let ipstr = result.match(/\d+\.\d+\.\d+\.\d+/g);
  ipstr = ipstr && ipstr.length ? ipstr[0] : "";
  return ipstr;
}
