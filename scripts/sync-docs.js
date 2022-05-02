const path = require("path");
const fs = require("fs");
const siteCdn = require('@licq/site-cdn');
// const chalk = require("chalk");
// const scp2 = require("scp2");
// const Config = require("./config.json");

const targetPath = path.join(__dirname, "../packages");
const destDocsPath = path.join(__dirname, "../docs");

const isDeploy = process.argv[2];

if (isDeploy === "deploy") {
  deploy();
} else {
  sync();
}

function sync() {
  const pkgs = fs.readdirSync(targetPath).filter(pkg => fs.statSync(path.join(targetPath, pkg)).isDirectory() && !pkg.startsWith('_'));

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
      path.join(targetPath, pkg, "README.md"),
      path.join(destPkgPath, "README.md")
    );
  });
  console.log('\nsync succes\n')
}

async function deploy() {
  const OstTools = require("../../ost-scripts/scripts/tools.js");

  const distPath = path.join(destDocsPath, ".vuepress/dist");

  // 补全静态资源cdn
  siteCdn(distPath, '/asenal', OstTools.config.ost_cdn)

  await OstTools.uploadCos("cos_gtimg", distPath, "ost/asenal");

  await OstTools.uploadCVM("asenal_path", distPath);

  console.log(`https://lcq.show/asenal/\n`)
}
