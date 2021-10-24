const fs = require("fs");
const path = require("path");

const libName = process.argv[2];
const libsBase = path.resolve(__dirname, "../");
const srcPath = path.resolve(libsBase, libName, "./src");

const legalLibNames = getLibsName();
if (!legalLibNames.includes(libName)) {
  console.log(`参数${libName}不合法，需属于${legalLibNames}其中之一`);
  return;
}

generateIndexJs(libName);

// 获取所有的库文件名称
function getLibsName() {
  const baseDirs = fs.readdirSync(libsBase);
  console.log({ baseDirs });
  return baseDirs.filter(
    (file) =>
      fs.statSync(path.join(libsBase, file)).isDirectory() &&
      !file.startsWith("_")
  );
}

// 自动生成index.ts文件
function generateIndexJs(_libName) {
  console.log(`开始生成${srcPath}下的index.ts文件`);
  try {
    const importStr = [];
    const exportStr = [];
    // 读取并加工ts文件
    fs.readdirSync(srcPath)
      .filter((file) => !["index.ts"].includes(file) && !file.includes('.test.'))
      .map((file) => file.split(".")[0])
      .forEach((file) => {
        console.log({ file });
        importStr.push(`import * as ${file} from "./${file}";
`);

        exportStr.push(`...${file},
    `);
      });

    // 组装最终的index.ts文件内容
    const resultStr = `
// 此文件由helper.js自动生成于：${new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString("en-GB", {
      hour12: false,
    })}
${importStr.join("")}
export default {
    ${exportStr.join("")}
}`;

    console.log(resultStr);

    // 写入src/index.ts文件
    fs.writeFileSync(path.join(srcPath, "index.ts"), resultStr);
    console.log("生成成功");
  } catch (error) {
    console.log("生成失败", error.message);
  }
}
