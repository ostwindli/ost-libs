const utils = require("./utils");
const Batch = require("batch");
const fs = require("fs");
const path = require("path");

module.exports = {
  listFiles,
};

/**
 * 获取文件夹下所有文件，包含目录
 * @name listFiles
 * @since v1.0.0
 * @param {String} rootPath 绝对路径
 * @returns Promise<Array[]>
 * @example
 * const file = require('@licq/file')
 * const res = await file.listFiles(__dirname)
 * // => eg: [{path: '/Users/ostwind/batch/',size: 0,isDir: true}, {path: '/Users/ostwind/batch/package.json',size: 470,isDir: false}]
 */
function listFiles(rootPath) {
  let list = [];

  return new Promise((resolve, reject) => {
    try {
      const stat = fs.statSync(rootPath);
      stat.isDir = true;
      stat.path = path.join(rootPath, "/");
      stat.size = 0;
      deep(stat, () => resolve(list));
    } catch (error) {
      console.log(error.message);
      reject(error.message);
    }
  });

  function deep(dirStat, deepNext) {
    list.push(statFormat(dirStat));

    fs.readdir(dirStat.path, function (err, files) {
      //  if (err) return cb(err);
      const batch = new Batch();
      batch.concurrency(16);
      files.forEach(function (file) {
        const filePath = path.join(dirStat.path, file);
        batch.push(function (done) {
          fs.stat(filePath, done);
        });
      });

      batch.end(function (err, stats) {
        stats.forEach(function (stat, i) {
          stat.isDir = stat.isDirectory();
          stat.path = path.join(dirStat.path, files[i], stat.isDir ? "/" : "");
          stat.isDir && (stat.size = 0);
        });

        const dirList = stats.filter((file) => file.isDir);
        const fileList = stats.filter((file) => !file.isDir);
        list = [...list, ...fileList.map(statFormat)];
        utils.eachLimit(dirList, 1, deep, deepNext);
      });
    });
  }

  function statFormat(stat) {
    return {
      path: stat.path,
      size: stat.size,
      isDir: stat.isDir,
    };
  }
}
