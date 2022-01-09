/**
 * 根据模板生成包
 * @author ostwindli
 */
const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");
const inquirer = require("inquirer");
const { getPkgsBasePath, isPkgExist } = require("../utils.js");

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "输入包名称",
      validate(value) {
        value = value ? value.trim() : "";
        if (!value) return "必填";
        if (isPkgExist(value)) return `包名${value}已存在`;
        return true;
      },
    },
    {
      type: "input",
      name: "des",
      message: "输入包描述",
      validate(value) {
        if (!value || !value.trim()) return "必填";
        return true;
      },
    },
  ])
  .then(({ name, des }) => {
    // 复制模板
    fse.copySync(path.join(__dirname, "./template"), getPkgsBasePath(name));

    // 读取所有目标文件
    const files = fs.readdirSync(getPkgsBasePath(name));

    // 批量替换占位变量
    files.forEach((file) => {
      const filePath = getPkgsBasePath(name, file);
      let fileContent = fs.readFileSync(filePath).toString();
      fileContent = fileContent
        .replace(/{{PKG_NAME}}/g, name)
        .replace(/{{PKG_DES}}/g, des);

      fs.writeFileSync(filePath, fileContent);
    });
    console.log("\n生成成功\n");
  })
  .catch((error) => {
    console.log(error);
  });
