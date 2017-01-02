import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import handler from '../index';
const mockEvent = require('./mock_event.json');

describe("HelloKinesisStream", () => {
  describe("handler", () => {
    it("should work", async () => {
      const result = await handler(mockEvent);
      result.should.be.deep.eq({
        "count": 1,
        "payloads": [
          {
            "sampleData": [
              100,
              200
            ]
          }
        ]
      });
    });
  });
});
