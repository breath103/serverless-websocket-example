import { expect } from "chai";

import handler from "../index";
const mockEvent = require("./mock_event.json"); // tslint:disable-line

describe("HelloAsync", () => {
  describe("handler", () => {
    it("should work", async () => {
      const res = await handler(mockEvent);
      expect(res.statusCode).to.be.eq(200);
    });
  });
});
