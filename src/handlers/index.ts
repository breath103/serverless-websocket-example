import HandlerWrapper from './handler_wrapper';

// List of handlers
import hello from './hello';
import helloAsync from './hello-async';

const handlers = {
  hello: HandlerWrapper.safelyWrap(hello),
  helloAsync: HandlerWrapper.safelyWrap(helloAsync),
};

export = handlers;