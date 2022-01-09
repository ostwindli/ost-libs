/**
 * node publish.js string [version]
 */
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const fse = require("fs-extra");
const {
  getPkgsBasePath,
  getCurrPkgs,
  isPkgExist,
  getInputPkgName,
} = require("./utils.js");

const pkgName = getInputPkgName();

if (!isPkgExist()) {
  console.log(`\n包名${pkgName}不存在, 请传入以下包名中的一个进行文档生成\n`);
  console.log(getCurrPkgs());
  process.exit(-1);
}

console.log(`\n开始发布...`);

const pkgJSONPath = getPkgsBasePath(pkgName, "package.json");

let pkg = fse.readJSONSync(pkgJSONPath);

console.log(`\n旧版本：`, pkg.version);
pkg.version =
  process.argv[3] ||
  pkg.version
    .split(".")
    .map((n, index) => (index === 2 ? Number(n) + 1 : n))
    .join(".");
console.log(`\n新版本：`, pkg.version);

fs.writeFileSync(pkgJSONPath, JSON.stringify(pkg, null, 4));

cp.execSync(
  `cd ${getPkgsBasePath(pkgName)}
  npm run docs
  npm run test
  npm publish --access=public --registry=https://registry.npmjs.org/
  git add .
  git commit -m 'release(@licq/${pkgName}): 发布 v${pkg.version}'
  `
);

console.log("\n发布成功：", `https://www.npmjs.com/package/@licq/${pkgName}\n`);
