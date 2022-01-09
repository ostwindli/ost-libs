const path = require("path");
const fs = require("fs");

/**
 * 获取目前所有的包
 */
function getCurrPkgs() {
  return fs
    .readdirSync(getPkgsBasePath())
    .filter((pkg) => fs.statSync(getPkgsBasePath(pkg)).isDirectory());
}

/**
 * 获取包的基础路径
 * @param {*} packageName 包名
 * @param {*} file 到具体包的具体文件
 * @returns string
 */
function getPkgsBasePath(packageName, file) {
  return path.join(
    __dirname,
    `../packages/${packageName ? packageName : ""}`,
    `${file ? file : ""}`
  );
}

module.exports = {
  getPkgsBasePath,
  getCurrPkgs,
};
