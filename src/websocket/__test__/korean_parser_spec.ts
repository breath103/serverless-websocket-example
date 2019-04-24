import { expect } from "chai";

import { decompose } from "../korean_parser";

describe("KoreanParser", () => {
  it("should decompose", () => {
    expect(decompose("안녕하세여")).to.be.deep.eq([
      { start: "ㅇ", middle: "ㅏ", end: "ㄴ" },
      { start: "ㄴ", middle: "ㅕ", end: "ㅇ" },
      { start: "ㅎ", middle: "ㅏ", end: "" },
      { start: "ㅅ", middle: "ㅔ", end: "" },
      { start: "ㅇ", middle: "ㅕ", end: "" }
    ]);
  });
});
