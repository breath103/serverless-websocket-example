type AsyncHandler = (event: LambdaProxyEvent) => Promise<LambdaResponse>;
type SyncHandler = (event: LambdaProxyEvent, context: Context) => void;

export type LambdaHandler = SyncHandler;

export default class HandlerWrapper {
  static asyncHandler(handler: AsyncHandler) : LambdaHandler {
    return (event: LambdaProxyEvent, context: Context) => {
      handler(event).then(
        (response) => {
          context.done(null, response)
        }, (error) => {
          context.done(error)
        }
      )
    }
  }

  static syncHandler(handler: SyncHandler) : LambdaHandler {
    return handler;
  }
}
