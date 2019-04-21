import { APIGatewayProxyHandler } from "aws-lambda";
import * as debug from "debug";

import {
  ClientMessage,
  SessionManager,
} from "./session_manager";

const logger = debug("Websocket");

const sessionManager = new SessionManager();

export const handler: APIGatewayProxyHandler = async (event) => {
  const context = event.requestContext;
  const sessionId = context.connectionId!;
  const routeKey = context.routeKey as "$connect" | "$disconnect" | "$default";

  logger("%O", event);

  try {
    if (routeKey === "$connect") {
      await sessionManager.createSession(sessionId);
      await sessionManager.sendMessageToClient(sessionId, { type: "user_connected", sessionId });

    } else if (routeKey === "$disconnect") {
      await sessionManager.destorySession(sessionId);

    } else {
      // All the other actions
      const payload = JSON.parse(event.body!) as ClientMessage;

      switch (payload.type) {
        // tslint:disable:align
        case "create_chat_message": {
          await sessionManager.broadcastMessageToClient({
            type: "chat_message_created",
            message: payload.message,
            sessionId,
          });
        } break;
        default: {
          throw new Error(`Invalid message: ${payload.toString()}`);
        } break;
        // tslint:enable:align
      }
    }
  } catch (e) {
    logger("$default Error: %j\n%o", event.body, e);
    return {
      statusCode: 500,
      body: `Malformed event body: ${event.body}`,
    };
  }

  return {
    statusCode: 200,
    body: "Connected",
  };
};
