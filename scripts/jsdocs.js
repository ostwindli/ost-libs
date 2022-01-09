/**
 * 生成readme文档
 * eg: node jsdocs.js string => readme.md
 * refer: https://github.com/jsdoc2md/jsdoc-to-markdown/blob/master/docs/API.md
 */
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const jsdoc2md = require("jsdoc-to-markdown");
const {
  getPkgsBasePath,
  getCurrPkgs,
  isPkgExist,
  getInputPkgName,
} = require("./utils.js");

const packageName = getInputPkgName();

const packages = getCurrPkgs();

if (!isPkgExist(packageName)) {
  console.log(
    `\n包名${packageName}不存在, 请传入以下包名中的一个进行文档生成\n`
  );
  console.log(packages);
  process.exit(-1);
}

jsdoc2md
  .render({ files: getPkgsBasePath(packageName, "index.js") })
  .then((docContent) => {
    docContent = jsdocsPerf(docContent);

    const readmeTemplate = getPkgsBasePath(packageName, "README-template.md");
    let content = fs.readFileSync(readmeTemplate).toString();
    content = content.replace("{{API}}", docContent);

    fs.writeFileSync(getPkgsBasePath(packageName, "README.md"), content);

    console.log("\n生成成功\n");
  });

//http://tool.chinaz.com/tools/unicode.aspx
function jsdocsPerf(content) {
  content = content.includes("</dl>") ? content.split("</dl>\n")[1] : content;
  return content
    .replace(/<a.*<\/a>\n\n/g, "")
    .replace(/\u0023\u0023\s/g, "### ") //## -> ###
    .replace(/⇒/g, "\n")
    .replace(/\u002a\u002aKind\u002a\u002a.*/g, ""); // 去除**Kind**
}
