// eachLimit(
//   ["123", "234", "345", "456", "567"],
//   1,
//   (res, callback) => {
//     setTimeout(() => {
//       console.log("拿到值：", res);
//       callback();
//     }, 1000);
//   },
//   () => {
//     console.log("---over");
//   }
// );

module.exports = {
  eachLimit,
};

/**
 *
 * @param {Array} arr 数据源
 * @param {Number} limit  每组并发数
 * @param {*} iterator 执行器
 * @param {Function|undefined} callback 全部执行完毕后的回调
 * @returns void
 */
function eachLimit(arr, limit, iterator, callback = () => {}) {
  if (!arr.length || limit <= 0) {
    return callback();
  }

  let completed = 0;
  let started = 0;
  let running = 0;

  (function replenish() {
    if (completed >= arr.length) {
      return callback();
    }

    while (running < limit && started < arr.length) {
      started += 1;
      running += 1;
      iterator(arr[started - 1], function (err) {
        if (err) {
          callback(err);
          //callback = function () {};
        } else {
          completed += 1;
          running -= 1;
          if (completed >= arr.length) {
            // 全部结束
            callback();
          } else {
            // 本次结束，开始下一组
            replenish();
          }
        }
      });
    }
  })();
}

