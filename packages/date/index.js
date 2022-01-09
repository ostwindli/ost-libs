
/**
 * 格式化日期
 * @name formatTime
 * @param {String} format 格式 default: 'yyyy-MM-dd hh:mm:ss'
 * @param {Date} date 日期 default: new Date()
 * @since v1.0.0
 * @returns String
 * @example
 * const res = formatTime()
 * //==> eg: 2022-01-09 17:58:02
 * 
 * const res = formatTime('yyyy-MM-dd')
 * //==> eg: 2022-01-09
 */
function formatTime(format = "yyyy-MM-dd hh:mm:ss", date = new Date()) {
  date = new Date(date);
  const dateObj = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let key in dateObj) {
    if (new RegExp("(" + key + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? dateObj[key]
          : ("00" + dateObj[key]).substr(("" + dateObj[key]).length)
      );
    }
  }
  return format;
}

module.exports = {
  formatTime,
};
