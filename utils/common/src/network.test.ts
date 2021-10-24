import { getPublicNetworkIp } from "./network";

describe("ip test", () => {
  it("getPublicNetworkIp test", async () => {
    const res = await getPublicNetworkIp();
    expect(res).toMatch(/\d+\.\d+\.\d+\.\d+/g);
  });
});
