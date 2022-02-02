const { execSync } = require("child_process");
const fs = require("fs");

/**
 * 获取当前仓库的Git用户信息
 * @name getGitUserInfo
 * @since v1.0.0
 * @returns Object
 * @example
 * const git = require('@licq/git')
 * const res = git.getGitUserInfo()
 * //==> eg: { userName: 'ostwindli', userEmail: 'ostwindli@tencent.com' }
 */
function getGitUserInfo() {
  const result = execSync("git config -l");
  try {
    const usesInfo = result
      .toString()
      .match(/(?<=\b(user\.email|user\.name)=)(.*)/g);
    const userName = usesInfo.pop();
    const userEmail = usesInfo.pop();
    return {
      userName,
      userEmail,
    };
  } catch (error) {
    return {};
  }
}

/**
 * 根据git项目，生成对应的changelog的markdown内容
 * @name getGitChangelog
 * @param {Object} Params 参数
 * @param {String} Params.gitProjectPath git项目路径 [必填] eg："/Users/xxx/asenal"
 * @param {String} Params.gitCommitRepo git项目仓库提交路径 [必填] eg: "https://github.com/ostwindli/asenal/commit"
 * @param {Array|undefined} Params.titleArray 生成的changlog头信息 [可选] eg：['# 更新日志', '更新内容简介xxx']
 * @param {String|undefined} Params.markdownFile 生成的markdown文件路径 [可选] eg："/Users/xxx/asenal/CHANGELOG.md"
 * @since v2.0.0
 * @returns String
 * @example
 * const git = require('@licq/git')
 * const res = git.getGitChangelog({
 *     gitProjectPath: __dirname,
 *     gitCommitRepo: 'https://github.com/ostwindli/asenal/commit',
 *     titleArray: ['# 更新日志', '\n这是一个测试changelog'],
 *     markdownFile: '/Users/xxx/asenal/CHANGELOG.md'
 * })x
 * //==> eg: https://mpqq.gtimg.cn/ost/asenal/changelog_demo.png
 */
function getGitChangelog(params) {
  // msg eg: '0a06a93550771de2624f1b0bcdf0246cad7c8b44----2021-12-20 15:21:00 +0800----doc: 完善文档描述'
  // => {hash: '0a06a93550771de2624f1b0bcdf0246cad7c8b44', date: '2021-12-20', msg:  'doc: 完善文档描述',}
  function getBaseInfo(msg) {
    const res = msg.split("----");
    return {
      hash: res[0],
      date: res[1].split(" ")[0],
      msg: res[2],
    };
  }

  // msg eg: 'init: 文档项目开源初始化'
  // hash eg: 'f5835b66de8c35bbe0291da2be68cdfbb1204967'
  // ==> '* init: 文档项目开源初始化 ([f5835b6](https://github.com/ostwindli/asenal/commit/f5835b66de8c35bbe0291da2be68cdfbb1204967))'
  function assembleMsg(msg, hash) {
    return `* ${msg} ([${hash.substr(0, 7)}](${params.gitCommitRepo}/${hash}))`;
  }

  try {
    if (!fs.existsSync(params.gitProjectPath)) {
      console.log(`\ngetGitChangelog路径${params.gitProjectPath}不存在\n`);
      process.exit(-1);
    }
    // 取出所有git log
    // 格式：'0a06a93550771de2624f1b0bcdf0246cad7c8b44----2021-12-20 15:21:00 +0800----doc: 完善文档描述'
    let res = execSync(
      `
    cd ${params.gitProjectPath}
    git log --format='%H----%ai----%s'`
    )
      .toString()
      .trim();
    // 转换成数组
    res = res.split("\n");

    const resObj = {};
    res
      // 过滤掉无效提交记录
      .filter(
        (r) =>
          !r.includes("Merge pull request #") && !r.includes("Merge branch")
      )
      .forEach((r) => {
        // 拿到提交日期、hash、提交内容
        let { date, hash, msg } = getBaseInfo(r);
        // 以日期为维度
        if (resObj[date]) {
          resObj[date].push(assembleMsg(msg, hash));
        } else {
          resObj[date] = [assembleMsg(msg, hash)];
        }
      });

    //开始组装markdown内容
    params.titleArray = params.titleArray || [];
    let resArr = [...params.titleArray];
    Object.keys(resObj)
      .sort((a, b) => a - b)
      .forEach((date) => {
        // 增加换行
        resArr.push(`\n## ${date}\n`);
        resArr = resArr.concat(resObj[date]);
      });

    resArr = resArr.join("\n");
    if (params.markdownFile) {
      try {
        fs.writeFileSync(params.markdownFile, resArr);
      } catch (error) {
        console.log(
          `\n------\n文件写入失败，请检查路径是否存在：${params.markdownFile}\n------\n`
        );
      }
    }
    return resArr;
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
}

module.exports = {
  getGitUserInfo,
  getGitChangelog,
};
