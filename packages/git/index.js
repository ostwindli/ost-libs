const { execSync } = require("child_process");

/**
 * 获取当前仓库的Git用户信息
 * @name getGitUserInfo
 * @since v1.0.0
 * @returns Object
 * @example
 * const git = require('@licq/git')
 * const res = git.getGitUserInfo()
 * //==> eg: { useName: 'ostwindli', useEmail: 'ostwindli@tencent.com' }
 */
function getGitUserInfo() {
  const result = execSync("git config -l");
  try {
    const usesInfo = result
      .toString()
      .match(/(?<=\b(user\.email|user\.name)=)(.*)/g);
    const useName = usesInfo.pop();
    const useEmail = usesInfo.pop();
    return {
      useName,
      useEmail,
    };
  } catch (error) {
    return {};
  }
}

module.exports = {
  getGitUserInfo,
};
