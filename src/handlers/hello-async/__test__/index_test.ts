import * as chai from "chai";
chai.should();

import handler from "../index";
const mockEvent = require("./mock_event.json"); // tslint:disable-line

describe("HelloAsync", () => {
  describe("handler", () => {
    it("should work", () => {
      // return handler(mockEvent);
    });
  });
});
