import * as debug from "debug";

import * as LambdaProxy from "../interfaces/lambda-proxy";

const logger = debug("Websocket");
export const websocket = async function(event: LambdaProxy.Event) {
  logger("%j", event);
  return true;
}