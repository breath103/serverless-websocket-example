const argv = require('optimist').argv;
const handlers = require("../dst/handlers");
const fs = require('fs');
const path = require('path');
const util = require('util');

function invoke() {
  console.log(argv);
  if (!argv.f) {
    throw new Error("Invoke script requires '-f' options for functionName");
  }

  const handler = handlers[argv.f];
  if (!handler) {
    throw new Error(`function \"${argv.f}\" not exist`);
  }

  let mockEvent = {};
  const mockEventPath = argv.e;
  if (mockEventPath) {
    mockEvent = require(
      path.join(
        '../', // To get to root
        mockEventPath
      )
    );
  }

  const succeed = function(result) {
    console.log("\n ====> Succeed: \n");
    switch(result.headers['Content-Type']) {
      case 'application/json': {
        result.body = JSON.parse(result.body);
      } break;
      case 'text/html': {

      } break;
    }
    console.log(util.inspect(result, { depth: null, colors: true }));
  }
  const fail = function(error) {
    console.error("\n ====> Fail: \n", util.inspect(error));
  }

  const mockContext = {
    succeed: succeed,
    fail: fail,
    done: function(error, result) {
      if (error) fail(error);
      else succeed(result);
    }
  }
  return handler(mockEvent, mockContext);
}

if (!module.parent) {
  invoke();
} else {
  module.export = invoke;
}
