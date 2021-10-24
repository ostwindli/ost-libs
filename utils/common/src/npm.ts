import { extend } from "umi-request";

const defaultRegistry = "https://registry.npmjs.org";

/**
 * 获取npm包的元信息
 *
 * @since 0.0.1
 * @param pkgName npm包名称 eg: lodash
 * @param timeout 超时时间
 * @returns {string} 返回npm包的元信息
 */
export function getNpmInfo(pkgName: string, timeout?: number): Promise<any> {
  const url = `${defaultRegistry}/${pkgName}`;
  let request = extend({ timeout });
  return request.get(url);
}

/**
 * 获取npm包的readme内容
 *
 * @since 0.0.1
 * @param pkgName npm包名称 eg: lodash
 * @param timeout
 * @returns readme内容字符串
 */
export async function getReadmeContent(
  pkgName: string,
  timeout?: number
): Promise<any> {
  return getNpmInfo(pkgName, timeout)
    .then((npmInfo) => npmInfo.readme)
    .catch((err) => Promise.reject(err));
}
