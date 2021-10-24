import * as cp from "child_process";
import { promisify } from "util";
const exec = promisify(cp.exec);

/**
 * 获取当前项目的git用户信息
 * @returns username[email] eg: ostwind[9837438@qq.com]
 */
export const getGitUserInfo = async function (){
  const result = await exec("git config -l");
  try {
    const usesInfo = result.stdout.match(
      /(?<=\b(user\.email|user\.name)=)(.*)/g
    );
    const useName = usesInfo.pop();
    const useEmail = usesInfo.pop();
    return `${useName}[${useEmail}]`;
  } catch (error) {
    return "";
  }
};