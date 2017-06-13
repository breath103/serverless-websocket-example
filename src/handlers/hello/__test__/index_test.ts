import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
chai.should();

import * as LambdaProxy from "../../../interfaces/lambda-proxy";
import handler from "../index";
const mockEvent = require("./mock_event.json"); // tslint:disable-line

describe("Hello", () => {
  describe("handler", () => {
    it("should work", () => {
      return new Promise((resolve, reject) => {
        handler(
          mockEvent,
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
            succeed(result?: LambdaProxy.Response) {
              resolve(result);
            },
            fail(error: Error) {
              reject(error);
            },
            done(error: Error | null, result?: LambdaProxy.Response) {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
            getRemainingTimeInMillis() {
              return 1;
            },
          },
        );
      });
    });
  });
});
