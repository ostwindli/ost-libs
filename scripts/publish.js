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

if (!isPkgExist()) {
  console.log(
    `\n包名${getInputPkgName()}不存在, 请传入以下包名中的一个进行文档生成\n`
  );
  console.log(getCurrPkgs());
  process.exit(-1);
}

console.log(`\n开始发布...`);

const pkgPath = getPkgsBasePath(getInputPkgName(), "package.json");

let pkg = fse.readJSONSync(pkgPath);

console.log(`\n旧版本：`, pkg.version);
pkg.version =
  process.argv[3] ||
  pkg.version
    .split(".")
    .map((n, index) => (index === 2 ? Number(n) + 1 : n))
    .join(".");
console.log(`\n新版本：`, pkg.version);

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4));

return;
cp.execSync(
  `npm publish --access=public --registry=https://registry.npmjs.org/`
);
cp.execSync(`git add .`);
cp.execSync(`git commit -m 'feat(${_libName}): release v${pkg.version}'`);
