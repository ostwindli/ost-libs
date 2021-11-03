# @ostwindli/node

a lot of js tools for nodejs

## 安装

```sh
$ yarn add @ostwindli/node
```

## 使用方法

```js
const { isWin, isMac, isLinux } = require("@ostwindli/node");
isLinux();
```

## 功能清单

  ```ts

      getPortsPids: (ports: number | number[]) => Promise<any>;

    killPorts: (ports: number | number[]) => Promise<any>;

    getPort: (port?: number, must?: boolean) => Promise<unknown>;

    getIpV4: () => string;

    getIpV6: () => string;

    getPublicNetworkIp: () => Promise<string>;

    getGitUserInfo: () => Promise<string>;

    getAllMatchedFiles(dirPath: string, filterFun: (_file: string, stats: import("fs").Stats) => boolean, callback: (res: file.MatchedFiles[]) => void): void;

  ```
  