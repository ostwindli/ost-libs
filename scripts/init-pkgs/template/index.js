/**
 * @name helloWorld
 * @param {Number} value 这是一个示例属性
 * @since v1.0.0
 * @returns String
 * @example
 * const res = helloWorld(1)
 * console.log(res === 2)
 */
function helloWorld(value) {
  return value + 1;
}

module.exports = {
  helloWorld,
};
