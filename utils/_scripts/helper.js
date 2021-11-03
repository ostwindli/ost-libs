const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const fse = require("fs-extra");

const methodsName = ["g_index", "publish", "readme"];

//工具库名称： node\common\electron\web
const libName = process.argv[2];
// 具体要执行的方法名称：g_index \ publish
const methodName = process.argv[3];

const libsBase = path.resolve(__dirname, "../");
const srcPath = path.resolve(libsBase, libName, "./src");

const legalLibNames = getLibsName();
if (!legalLibNames.includes(libName)) {
  throw `参数${libName}不合法，需属于${legalLibNames}其中之一`;
}

if (!methodsName.includes(methodName)) {
  throw `methodName：${methodName}不匹配，应是${methodsName}其中之一`;
}

switch (methodName) {
  case "g_index":
    generateIndexJs(libName);
    break;
  case "publish":
    publish(libName);
    break;
  case "readme":
    updateReadme(libName);
    break;
}

// 获取所有的库文件名称: node\common\electron\web
function getLibsName() {
  const baseDirs = fs
    .readdirSync(libsBase)
    .filter(
      (file) =>
        fs.statSync(path.join(libsBase, file)).isDirectory() &&
        !file.startsWith("_")
    );
  console.log({ baseDirs });
  return baseDirs;
}

// 自动生成index.ts文件
function generateIndexJs(_libName) {
  console.log(`开始生成${srcPath}下的index.ts文件`);
  try {
    const importStr = [];
    const exportStr = [];
    // 读取并加工ts文件
    fs.readdirSync(srcPath)
      .filter(
        (file) => !["index.ts"].includes(file) && !file.includes(".test.")
      )
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
// 此文件由helper.js自动生成于：${
      new Date().toLocaleDateString() +
      " " +
      new Date().toLocaleTimeString("en-GB", {
        hour12: false,
      })
    }
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

// 发版
function publish(_libName) {
  log(`开始发布...`);
  const pkgPath = path.join(libsBase, _libName, "package.json");
  let pkg = fse.readJSONSync(pkgPath);
  log(`旧版本：`, pkg.version);
  pkg.version = pkg.version
    .split(".")
    .map((n, index) => (index === 2 ? Number(n) + 1 : n))
    .join(".");
  log(`新版本：`, pkg.version);
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4));

  // shell.exec(`pwd`)
  // console.log(process.cwd())
  shell.exec(
    `npm publish --access=public --registry=https://registry.npmjs.org/`
  );
  shell.exec(`git add .`);
  shell.exec(`git commit -m 'feat(${_libName}): release v${pkg.version}'`);
}

// 更新readme里的功能清单
function updateReadme(_libName) {
  log(`开始更新readme...`);
  const indexDTsPath = path.join(libsBase, _libName, "libs/index.d.ts");
  let indexDTs = fs.readFileSync(indexDTsPath).toLocaleString();//读取d.ts

  indexDTs = indexDTs.split('declare const _default: {')[1];
  indexDTs = indexDTs.split('};')[0];

  indexDTs = indexDTs.split(/\r?\n/);// 切分换行

  // indexDTs = indexDTs.map(d => d.replace(/\s/g, ''))
  indexDTs = indexDTs.join("\n\n");// 换行
  // log(indexDTs)

  const readmePath = path.join(libsBase, _libName, "README.md");
  let readme = fs.readFileSync(readmePath).toLocaleString();
  // 新的readme内容
  readme = readme.split("## 功能清单")[0];
  readme =
    readme +
    `## 功能清单

  \`\`\`ts
  ${indexDTs}

  \`\`\`
  `;
  log(readme);
  fs.writeFileSync(readmePath, readme);
}

function log(...msg) {
  console.log();
  console.log(...msg);
  console.log();
}
