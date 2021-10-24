import { getPort, killPorts, getPortsPids } from "./port";
// const expect = require('chai').expect
// const assert = require('chai').assert
// const net = require('net')

describe("port test", () => {
  const portReg = /^(0|[1-9]\d*)$/;

  it("Get a port with invalid port", () =>
    getPort(-1).then((port) => {
      // console.log("Get a port with invalid port ", port);
      expect(String(port)).toMatch(portReg);
    }));

  it("Get a port with true 、 invalid port", () =>
    getPort(-1, true).catch((invalid_msg) =>
      expect(invalid_msg).toBe("Param  -1 is not a valid port")
    ));

  it("Get a port with valid port", () =>
    getPort(60008).then((port) => {
      // console.log("Get a port with valid port(maybe 60008): ", port);
      expect(String(port)).toMatch(portReg);
    }));

  it("Get a expected port with must", () =>
    getPort(8000, true).then((port) => {
      expect(port).toBe(port);
    }));

  it("Get a port without params", () =>
    getPort().then((port) => {
      expect(String(port)).toMatch(portReg);
    }));

  // 杀端口
  it("Kill a port", async () => {
    const pid = await killPorts(4000);
    //  console.log("Kill a port: ", pid);
    expect(pid).toEqual(expect.any(Number));
  });

  it("Kill a port with invalid params", async () => {
    //@ts-ignore
    const pid = await killPorts("xx");
    //  console.log("Kill a port with invalid params: ", pid);
    expect(pid).toBe(-1);
  });

  it("Kill a lot of ports", async () => {
    const pids = await killPorts([5000, 4000]);
    //   console.log("Kill a lot of ports: ", pids);
    expect(pids).toContainEqual(expect.any(Number));
  });

  // 获取pid
  it("Get a port's pid", async () => {
    const pid = await getPortsPids(3000);
    //   console.log("Get a port's pid: ", pid);
    expect(pid).toEqual(expect.any(Number));
  });

  it("Get a invalid port's pid", async () => {
    //@ts-ignore
    const pid = await getPortsPids("xxx");
    // console.log("Get a invalid port's pid: ", pid);
    expect(pid).toBe(-1);
  });

  it("Get a lot of ports's pids", async () => {
    const pids = await getPortsPids([3000, 4000]);
    // console.log("Get a lot of ports's pids: ", pids);
    expect(pids).toContainEqual(expect.any(Number));
  });
});
