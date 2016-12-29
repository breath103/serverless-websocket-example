import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import handler from '../index';
const mockEvent = require('./mock_event.json');

describe("Hello", () => {
  describe("handler", () => {
    it("should work", () => {
      return handler(mockEvent);
    });
  });
});
