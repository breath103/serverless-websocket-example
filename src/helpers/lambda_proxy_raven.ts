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
    return new Promise((resolve, reject) => {
      Raven.captureException(e, (error: Error, eventId: string) => {
        // This callback fires once the report has been sent to Sentry
        if (error) {
          console.error(error);
          console.error('Failed to send captured exception to Sentry');
        } else {
          console.log('eventID : ', eventId);
          console.log('Captured exception and send to Sentry successfully');
        }

        resolve();
      });
    })
  }
}