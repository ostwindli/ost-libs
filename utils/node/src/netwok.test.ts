import { getIpV4, getIpV6 } from "./network";

describe("ip test", () => {
  it("getPublicNetworkIp test", async () => {
    const res = getIpV4();
    expect(res).toMatch(/\d+\.\d+\.\d+\.\d+/g);
  });
});
