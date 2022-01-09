/**
 * 生成指定长度的随机字符串
 * @name randomString
 * @param {Number} length 长度
 * @since v1.0.0
 * @returns String
 * @example
 * const str = require('@licq/string')
 * const res = str.randomString(10);
 * //==> eg: dUbkGTBgKN
 */
function randomString(length = 8) {
  const str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += str[Math.floor(Math.random() * str.length)];
  return result;
}

module.exports = {
  randomString,
};
