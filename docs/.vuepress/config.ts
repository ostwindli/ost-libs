// https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#navbar
import { defineUserConfig } from "vuepress";
import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { DefaultThemeOptions } from '@vuepress/theme-default'
// import type { DefaultThemeOptions } from "vuepress";
import sidebar from "./sidebar.json";

const base = '/asenal/';

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  base,
 // public: '',
  // 站点配置
  lang: "zh-CN",
  title: "Ostwind's Tools",
  description: "Ostwind's JavaScript Tools",
  // https://v2.vuepress.vuejs.org/zh/reference/config.html#bundler
  // 在使用 vuepress-vite 包的时候，你可以忽略这个字段，因为 Vite 是默认打包工具
  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {
    viteOptions: {
     // publicDir:'https://baidu.com/'
    }
  },
  // 主题和它的配置
  theme: "@vuepress/theme-default",
  themeConfig: {
    logo: "https://mpqq.gtimg.cn/ost/static/imgs/avatar/avataaars.png",
    repo: "ostwindli/asenal",
    docsDir: "docs",
    sidebar,
  },
});
