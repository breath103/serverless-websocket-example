import * as chai from "chai";
chai.should();

import handler from "../index";
const mockEvent = require("./mock_event.json"); // tslint:disable-line

describe("HelloKinesisStream", () => {
  describe("handler", () => {
    it("should work", async () => {
      const result = await handler(mockEvent);
      result.should.be.deep.eq({
        count: 1,
        payloads: [
          {
            sampleData: [
              100,
              200,
            ],
          },
        ],
      });
    });
  });
});
