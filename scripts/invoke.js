const argv = require('optimist').argv;
const handlers = require("../dst/handlers");
const fs = require('fs');

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
    mockEvent = JSON.parse(fs.readFileSync(argv.e).toString());
  }

  const mockContext = {
    succeed: function(result) {
      console.log("==> Succeed: ", result);
    },
    fail: function(error) {
      console.error("==> Fail: ", error);
    },
    done: function(error, result) {
      if (error)
        console.error("==> Fail: ", error);
      else
        console.log("==> Succeed: ", result);
    }
  }
  return handler(mockEvent, mockContext);
}

if (!module.parent) {
  invoke();
} else {
  module.export = invoke;
}
