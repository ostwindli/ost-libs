/**
 * 获取npm的readme
 * @author ostwind
 */

import { getReadmeContent, getNpmInfo } from "./npm";

jest.setTimeout(30000);
const testNpm = "@00a/example";
describe("npm test", () => {
  it("get-npm-info test", async () => {
    const res = await getNpmInfo(testNpm);
    expect(res.name).toBe(testNpm);
  });
  it("get-npm-readme test", async () => {
    const res = await getReadmeContent(testNpm);
    expect(res).toContain(testNpm);
  });
  it("get-npm-readme with timeout test", async () => {
    try {
      const res = await getReadmeContent(testNpm, 100);
      // expect(res).toContain(testNpm)
    } catch (error) {
      expect(error.message).toContain("timeout of 100ms exceeded");
    }
  });
});
