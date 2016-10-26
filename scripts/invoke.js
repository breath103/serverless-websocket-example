const argv = require('optimist').argv;
const handlers = require("../dst/handlers");

function invoke() {
  console.log(argv);
  if (!argv.f) {
    throw new Error("Invoke script requires '-f' options for functionName");
  }

  const handler = handlers[argv.f];
  if (!handler) {
    throw new Error(`function \"${argv.f}\" not exist`);
  }

  const mockEvent = {
  };
  const mockContext = {
    succeed: function(result) {
      console.log("==> Succeed: ", result);
    },
    fail: function(error) {
      console.error("==> Fail: ", error);
    }
  }
  return handler(mockEvent, mockContext);
}

if (!module.parent) {
  invoke();
} else {
  module.export = invoke;
}
