const fs = require("fs");
const path = require("path");
const os = require("os");
const date = require("@licq/date");
const open = require("open");
const fse = require("fs-extra");

const logPath = path.join(os.tmpdir(), `lcq/log`);
const filePath = path.join(
  logPath,
  `${date.formatTime("yyyyMMdd_hhmmss")}.log`
);
fse.ensureFileSync(filePath);

function buildMsg(msg = []) {
  let data = "";
  msg.forEach((_msg) => {
    let tmp = _msg;
    try {
      tmp = JSON.stringify(_msg);
    } catch (error) {}

    data += " " + tmp;
  });
  return data;
}

function writeLog(type, ...msg) {
  try {
    let data = `[${type}]${date.formatTime()}: ${buildMsg(msg)}\n`;

    fs.appendFileSync(filePath, data);
  } catch (error) {
    console.log(`@licq/log error: `, error.message);
  }
}

/**
 * 打印info日志
 * @name info
 * @param {...msg} 类似console.log参数
 * @since v1.0.0
 * @returns null
 * @example
 * const log = require('@licq/log')
 * const res = log.info(1, null, {}, true)
 */
function info(...msg) {
  console.log(...msg);
  writeLog("info", ...msg);
}

/**
 * 打印warn日志
 * @name info
 * @param {...msg} 类似console.warn参数
 * @since v1.0.0
 * @returns null
 * @example
 * const log = require('@licq/log')
 * const res = log.warn(1, null, {}, true)
 */
function warn(...msg) {
  console.warn(...msg);
  writeLog("warn", ...msg);
}

/**
 * 打印error日志
 * @name info
 * @param {...msg} 类似console.error参数
 * @since v1.0.0
 * @returns null
 * @example
 * const log = require('@licq/log')
 * const res = log.error(1, null, {}, true)
 */
function error(...msg) {
  console.error(...msg);
  writeLog("error", ...msg);
}

/**
 * 打开日志目录( `path.join(os.tmpdir(), 'lcq/log')` )、降级则是打开临时目录
 * @name openLogDir
 * @since v1.0.0
 * @returns null
 * @example
 * const log = require('@licq/log')
 * log.openLogDir()
 */
function openLogDir() {
  if (fs.existsSync(logPath)) {
    open(logPath);
  } else {
    open(os.tmpdir());
  }
}

/**
 * 清空日志目录 `path.join(os.tmpdir(), 'lcq/log')`
 * @name cleanLogDir
 * @since v1.0.0
 * @returns null
 * @example
 * const log = require('@licq/log')
 * log.cleanLogDir()
 */
function cleanLogDir() {
  fse.emptyDirSync(logPath);
}

module.exports = {
  openLogDir,
  info,
  warn,
  error,
  cleanLogDir,
};
