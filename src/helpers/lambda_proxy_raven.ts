import * as LambdaProxy from '../interfaces/lambda-proxy';
import Raven = require('raven');

export class LambdaProxyRaven {
  constructor(private event: LambdaProxy.Event) {
    if (!process.env.RAVEN_KEY) {
      throw new Error("RAVEN KEY must be provided in order to use raven");
    }
    Raven.config(process.env.RAVEN_KEY).install();
    Raven.setContext({
      event: event,
    });
  }

  capture(e: any) {
    Raven.captureException(e);
  }
}