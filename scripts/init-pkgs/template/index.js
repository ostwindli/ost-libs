/**
 * @name helloWorld
 * @param {Number} value 这是一个示例属性
 * @since v1.0.0
 * @returns String
 * @example
 * const {{PKG_NAME}} = require('@licq/{{PKG_NAME}}')
 * const res = {{PKG_NAME}}.helloWorld(1)
 * //==> eg: 2
 */
function helloWorld(value) {
  return value + 1;
}

module.exports = {
  helloWorld,
};
