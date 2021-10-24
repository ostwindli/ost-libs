/**
 * 端口相关 适用于Windows、Unix
 * Created by uv-w on 2020/7/17.
 **/
import * as net from "net";
import { promisify } from "util";
import { exec } from "child_process";
import ostCommon from "@ostwindli/common";
const exe_shell = promisify(exec);

/**
 * 获取一个随机的可用端口
 * @param? port -> number 可选
 */
const getRandomPort = (port?: number) =>
  new Promise((resolve, reject) => {
    try {
      if (!validate_port(port)) {
        port = 0;
      }
      const server = net.createServer();
      server
        .unref()
        .on("error", reject)
        .listen(port, () => {
          //@ts-ignore
          const _port = server.address().port;
          server.close(() => resolve(_port));
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });

// 批量获取端口号对应的pid
export const getPortsPids = (ports: number | number[]) => {
  ports = Array.isArray(ports) ? ports : [ports];
  let checkPromiseArr = [];
  ports.forEach((port) => {
    if (validate_port(port)) {
      let command = ostCommon.isWin()
        ? 'netstat -ano | findstr ":' + port + '" | findstr "LISTENING"'
        : "lsof -i:" + port + " | grep LISTEN | awk '{print $2}'";

      checkPromiseArr.push(exe_shell(command).catch((err) => -1));
    } else {
      checkPromiseArr.push(Promise.resolve(-1));
    }
  });
  return Promise.all(checkPromiseArr)
    .then((stdouts) => {
      // console.log({stdouts})
      if (stdouts.length > 1) {
        return stdouts.map(({ stdout, stderr }) => parseStdout(stdout));
      }

      return parseStdout(stdouts[0].stdout);
    })
    .catch((err) => err);
};

// 批量杀端口
export const killPorts = (ports: number | number[]) => {
  try {
    return getPortsPids(ports)
      .then((pids) => {
        if (Array.isArray(pids)) {
          pids.forEach((pid) => {
            pid > 0 && process.kill(pid);
          });
        } else {
          pids > 0 && process.kill(pids);
        }

        return pids;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    return Promise.reject();
  }
};

/**
 *返回一个可用的端口
 *@param port 如果提供一个端口，则尽可能返回这个端口，否则返回一个随机可用端口
 *@param must 如果为true，则检查提供的端口是否被占用，占用则杀掉
 **/
export const getPort = (port?: number, must?: boolean) => {
  if (must === true) {
    if (!validate_port(port)) {
      return Promise.reject(`Param  ${port} is not a valid port`);
    }
    return killPorts(port)
      .then((pid) => port)
      .catch((err) => {
        console.log(err);
      });
  } else {
    return getRandomPort(port).catch(() => getRandomPort());
  }
};

//getPortsPids([3000, -1, 3001, 'ss', '3044']).then(pids => utils.log(pids, 'error'))
//getRandomPort(30001).then(port => utils.log(port)).catch(err => utils.log(err, 'error'))
//getPort(3000, true).then(port => utils.log(port))
//killPorts([3000, 3001]).then(pids => utils.log(pids))

//处理命令返回信息
function parseStdout(stdout) {
  let pid = -1;
  if (stdout && stdout != -1) {
    if (ostCommon.isWin()) {
      stdout = String(stdout).split("\n");
      stdout.forEach((line) => {
        line = line.trim().split(/\s+/); //通过空格截取每个标志字符
        if (line.length == 5) {
          pid = line[4];
        }
      });
    } else {
      pid = stdout || -1;
    }
  }

  return Number(pid);
}

function validate_port(port) {
  return port && /^(0|[1-9]\d*)$/.test(port) && port <= 65535;
}
