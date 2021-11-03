# @ostwindli/common

a lot of js common utils

## 安装

```sh
$ yarn add @ostwindli/common
```

## 功能清单

  ```ts

      isWin: () => boolean;

    getNpmInfo(pkgName: string, timeout?: number): Promise<any>;

    getReadmeContent(pkgName: string, timeout?: number): Promise<any>;

    getPublicNetworkIp(): Promise<string>;

  ```
  