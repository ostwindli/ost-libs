# @ostwindli/common

a lot of js common utils

## 安装

```sh
$ yarn add @ostwindli/common
```

## 使用方法

```js
const { isWin, isMac, isLinux } = require("@ostwindli/common");
isLinux();
```

## 功能清单

  ```ts
  

    isMac: () => boolean;

    isLinux: () => boolean;

    isWin: () => boolean;

    getNpmInfo(pkgName: string, timeout?: number): Promise<any>;

    getReadmeContent(pkgName: string, timeout?: number): Promise<any>;

    getPublicNetworkIp(): Promise<string>;



  ```
  