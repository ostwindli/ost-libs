/**
 * 判断是否是Mac系统 支持浏览器、node.js
 * @name isMac
 * @since 1.0.0
 * @example
 * const platform = require('@licq/platform')
 * const res = platform.isMac()
 * //==> eg: true/false
 * @returns Boolean
 */
export const isMac = () => {
  if (
    typeof process !== "undefined" &&
    typeof process.platform === "string" &&
    process.platform === "darwin"
  ) {
    return true;
  }
  if (
    typeof navigator === "object" &&
    typeof navigator.platform === "string" &&
    navigator.platform.startsWith("Mac")
  ) {
    return true;
  }
  return false;
};

/**
 * 判断是否是Linux系统 支持浏览器、node.js
 * @name isLinux
 * @since 1.0.0
 * @example
 * const platform = require('@licq/platform')
 * const res = platform.isLinux()
 * //==> eg: true/false
 * @returns Boolean
 */
export const isLinux = () => {
  if (
    typeof process !== "undefined" &&
    typeof process.platform === "string" &&
    process.platform === "linux"
  ) {
    return true;
  }
  if (
    typeof navigator === "object" &&
    typeof navigator.platform === "string" &&
    navigator.platform.indexOf("linux") > -1
  ) {
    return true;
  }
  return false;
};

/**
 * 判断是否是Windows系统 支持浏览器、node.js
 *
 * @name isWin
 * @since 1.0.0
 * @example
 * const platform = require('@licq/platform')
 * const res = platform.isWin()
 * //==> eg: true/false
 * @returns Boolean
 */
export const isWin = () => {
  if (
    typeof process !== "undefined" &&
    typeof process.platform === "string" &&
    process.platform === "win32"
  ) {
    return true;
  }
  if (
    typeof navigator === "object" &&
    typeof navigator.platform === "string" &&
    navigator.platform.startsWith("Win")
  ) {
    return true;
  }
  return false;
};

module.exports = {
  isWin,
  isLinux,
  isMac,
};
