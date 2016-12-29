import HandlerWrapper, { LambdaHandler } from './handler_wrapper'
interface Handlers {
  [handlerName: string]: LambdaHandler;
}



// List of handlers
import hello from './hello';
import asyncHello from './async-hello';

const handlers: Handlers = {
  hello: HandlerWrapper.syncHandler(hello),
  asyncHello: HandlerWrapper.asyncHandler(asyncHello),
};

export = handlers;