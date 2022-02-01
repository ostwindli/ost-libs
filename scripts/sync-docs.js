const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const scp2 = require("scp2");
const Config = require("./config.json");

const destDocsPath = path.join(__dirname, "../docs");

const isDeploy = process.argv[2];

if (isDeploy === "deploy") {
  deploy();
} else {
  sync();
}

function sync() {
  const srcPkgsPath = path.join(__dirname, "../packages");
  const pkgs = fs.readdirSync(srcPkgsPath);

  console.log(pkgs);

  const sidebarJSON = JSON.stringify(
    pkgs.map((pkg) => `/${pkg}/README.md`),
    null,
    4
  );
  console.log({ sidebarJSON });
  fs.writeFileSync(
    path.join(destDocsPath, ".vuepress/sidebar.json"),
    sidebarJSON
  );

  pkgs.forEach((pkg) => {
    const destPkgPath = path.join(destDocsPath, pkg);
    if (!fs.existsSync(destPkgPath)) {
      fs.mkdirSync(destPkgPath);
    }
    fs.copyFileSync(
      path.join(srcPkgsPath, pkg, "README.md"),
      path.join(destPkgPath, "README.md")
    );
  });
}

function deploy() {
  console.log(chalk.green(`上传云服务器 start \n`));
  const distPath = path.join(destDocsPath, ".vuepress/dist");
  scp2.scp(distPath, Config.cvm, function (err) {
    if (err) log(`异常：${err}`);
    console.log(chalk.green(`上传云服务器 end \n`));
  });
}
