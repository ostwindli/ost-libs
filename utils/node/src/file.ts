import * as path from "path";
import * as fs from "fs";

/**
 * 获取给定的目录(含子目录)下的所有符合条件的文件列表
 * @param dirPath    给定的目录路径
 * @param filterFun  过滤函数，null的时候，返回所有文件.形式 function(file, stat){ return true/false }
 * @param callback   返回结果 形式：[{
 *  fileName: 'test.png',
 *  file: 'User/ostwind/test.png',
 *  size: 1024,
 * }, {}]
 * 异常时：返回null
 * eg:
 * getAllMatchedFiles(
    filePath,
    (file: string, stats: fs.Stats) => {
      return (
        !file.startsWith(".") &&
        file.endsWith(".png") &&
        stats.size > 2300 * 1024
      );
    },
    (res) => {
      console.log({ res });
    }
  );
 */

let tmpFileList = [];
export interface MatchedFiles {
  fileName: string;
  file: string;
  size: number;
}
export function getAllMatchedFiles(
  dirPath: string,
  filterFun: null | ((_file: string, stats: fs.Stats) => boolean),
  callback: (res: MatchedFiles[]) => void
): void {
  if (!dirPath || !fs.existsSync(dirPath)) {
    throw `提示：路径${dirPath}不存在`;
  }

  if (filterFun !== null && typeof filterFun !== "function") {
    throw `提示：filterFun必须为null或函数`;
  }

  if (!callback || typeof callback !== "function") {
    throw `提示：请确保callback为函数`;
  }

  fs.readdir(dirPath, function (err, files) {
    if (err) {
      console.log(`getAllMatchedFiles fs.readdir error: ${err}`);
      tmpFileList = [];
      callback(null);
      return;
    }

    let count = 0;
    const checkEnd = function () {
      if (++count == files.length) {
        const fileList = [...tmpFileList];
        callback(fileList);
      }
    };

    //为空时直接回调
    if (!files.length) {
      callback(null);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fullPath = dirPath + "/" + file;
      // console.log({fullPath})

      fs.stat(fullPath, function (err, stats) {
        if (err) {
          console.log(`getAllMatchedFiles fs.stat error: ${err}`);
          tmpFileList = [];
          callback(null);
          return;
        }
        if (stats.isDirectory()) {
          // console.log({ file });
          return getAllMatchedFiles(fullPath, filterFun, checkEnd);
        } else {
          if (filterFun === null || filterFun(file, stats)) {
            tmpFileList.push({
              fileName: file,
              filePath: fullPath,
              size: stats.size / 1024,
            });
          }
          checkEnd();
        }
      });
    }
  });
}

// test();
function test() {
  const filePath =
    "/Users/cqli/Documents/workspaces/Tencent/abcmouse-bak/assets/resources";

  getAllMatchedFiles(
    filePath,
    (file: string, stats: fs.Stats) => {
      return (
        !file.startsWith(".") &&
        file.endsWith(".png") &&
        stats.size > 2300 * 1024
      );
    },
    (res) => {
      console.log({ res });
    }
  );
}
