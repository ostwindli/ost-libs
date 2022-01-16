const { v4, validate } = require("uuid");

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

/**
 * 生成uuid (v4)
 * @name uuid
 * @since v1.0.5
 * @returns uuid String
 * @example
 * const str = require('@licq/string')
 * const uuid = str.uuid()
 * // ==> 51001e12-509b-4f4a-ad73-8d7de4cef6bf
 */
function uuid(){
  return v4()
}

/**
 * 校验是否是uuid
 * @name uuidValidate
 * @param {String} uuid 
 * @since v1.0.5
 * @returns boolean
 * @example
 * const str = require('@licq/string')
 * const isUUID = str.uuidValidate('51001e12-509b-4f4a-ad73-8d7de4cef6bf');
 * // ==> true
 * const isUUID1 = str.uuidValidate('eH2dTHAoYOAaxegIeFq7bcGrGhPcfv83');
 * // ==> false
 */
function uuidValidate(uuid){
  return validate(uuid)
}

module.exports = {
  randomString,
  uuid,
  uuidValidate
};
