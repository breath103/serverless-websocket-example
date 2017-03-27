import Raven = require("raven");
let ravenInitialized = false;

export class RavenHelper {
  setContext(context: any) {
    Raven.setContext(context);
  }

  capture(e: any) {
    return new Promise((resolve, reject) => {
      Raven.captureException(e, (error: Error, eventId: string) => {
        // This callback fires once the report has been sent to Sentry
        if (error) {
          console.error(error);
          console.error("Failed to send captured exception to Sentry");
        } else {
          console.log("eventID : ", eventId);
          console.log("Captured exception and send to Sentry successfully");
        }

        resolve();
      });
    });
  }
}

if (!process.env.RAVEN_KEY) throw new Error(`process.env.RAVEN_KEY not exist`);

Raven.config(process.env.RAVEN_KEY).install();

const singleton = new RavenHelper();

export default singleton;
