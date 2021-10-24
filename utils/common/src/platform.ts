/**
 * 判断是否是Mac系统 支持浏览器、node.js
 *
 * @since 0.0.1
 * @returns
 */
export const isMac = (): boolean => {
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
 *
 * @since 0.0.1
 * @returns
 */
export const isLinux = (): boolean => {
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
 * @since 0.0.1
 * @returns
 */
export const isWin = (): boolean => {
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
