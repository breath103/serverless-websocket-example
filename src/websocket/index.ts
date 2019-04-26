import { APIGatewayProxyHandler } from "aws-lambda";
import * as debug from "debug";

import { Session } from "../models";

const logger = debug("Websocket");

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
          body: "you must need to provide userId",
        };
      }

      // Create Session
      const session = new Session();
      session.sessionId = sessionId;
      session.userId = userId;
      await session.save();
      ////
    } else if (routeKey === "$disconnect") {
      // Delete Session
      const session = await Session.primaryKey.get(sessionId);
      if (!session) {
        throw new Error("Session not exists!");
      }
      await session.delete();
      ////
    } else {
      // All the other actions
      logger("$default event - %o", event.body);
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
