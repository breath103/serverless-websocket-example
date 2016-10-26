import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();


import handler from '../index';

describe("Hello", () => {
  describe("handler", () => {
    it("should work", () => {
      return new Promise((resolve, reject) => {
        handler(
          {},
          {
            // Properties
            functionName: "mock",
            functionVersion: "mock",
            invokedFunctionArn: "mock",
            memoryLimitInMB: 1,
            awsRequestId: "mock",
            logGroupName: "mock",
            logStreamName: "mock",

            // Functions
            succeed(result?: Object) {
              resolve(result);
            },
            fail(error?: Error) {
              reject(error);
            },
            done(error?: Error, result?: Object) {
              if (error) reject(error);
              else resolve(result);
            },
            getRemainingTimeInMillis() {
              return 1;
            }
          }
        );
      });
    });
  });
});
