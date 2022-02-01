// https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#navbar
import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import sidebar from "./sidebar.json";

export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: "zh-CN",
  title: "Ostwindli's Asenal",
  description: "Ostwindli's JavaScript Tools",

  // 主题和它的配置
  theme: "@vuepress/theme-default",

  themeConfig: {
    logo: "https://mpqq.gtimg.cn/ost/ost-hourse.png",
    repo: "ostwindli/asenal",
    docsDir: "docs",
    sidebar,
  },
});
