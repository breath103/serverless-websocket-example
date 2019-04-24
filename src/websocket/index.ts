import { APIGatewayProxyHandler } from "aws-lambda";
import * as debug from "debug";

import {
  ClientMessage,
  SessionManager,
} from "./session_manager";

import { Session } from "../models";

const logger = debug("Websocket");

const sessionManager = new SessionManager();

export const handler: APIGatewayProxyHandler = async (event) => {
  const context = event.requestContext;
  const sessionId = context.connectionId!;
  const routeKey = context.routeKey as "$connect" | "$disconnect" | "$default";

  logger("%O", event);

  try {
    if (routeKey === "$connect") {
      const queryParams = event.queryStringParameters || {};
      const userId = queryParams.userId;

      if (!userId) {
        return {
          statusCode: 401,
          body: "you must need to provide userId and roomId",
        };
      }

      // Create Session
      const session = new Session();
      session.sessionId = sessionId;
      session.userId = userId;
      await session.save();
    } else if (routeKey === "$disconnect") {
      const session = await Session.primaryKey.get(sessionId);
      if (!session) {
        // very starange.. this should not happen
      } else {
        await session.delete();
      }
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
        case "create_stroke": {
          await sessionManager.broadcastMessageToClient({
            type: "stroke_created",
            stroke: payload.stroke,
          });
        } break;
        default: {
          throw new Error(`Invalid message: ${JSON.stringify(payload)}`);
        }
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
    body: "Success",
  };
};
