import * as os from "os";
import { isMac, isWin, isLinux } from "./platform";

describe("os test", () => {
  it("isMac test", async () => {
    const res = isMac();
    expect(res).toBe(os.platform() === "darwin");
  });

  it("isLinux test", async () => {
    const res = isLinux();
    expect(res).toBe(os.platform() === "linux");
  });

  it("isWin test", async () => {
    const res = isWin();
    expect(res).toBe(os.platform() === "win32");
  });
});
