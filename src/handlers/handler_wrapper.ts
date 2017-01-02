import * as Base from '../interfaces/base';

export default class HandlerWrapper {
  static safelyWrap(handler: Function) {
    return (event: Base.Event, context: Base.Context<Base.Response>) => {
      const result = handler(event, context);
      const isPromise = Promise.resolve(result) === result;

      if (isPromise) {
        const promise = result as Promise<Base.Response>;
        promise.then(
          (response) => {
            context.done(null, response);
          }, (error) => {
            context.done(error);
          }
        )
      }
    }
  }
}
