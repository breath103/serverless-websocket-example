import { APIGatewayProxyHandler } from "aws-lambda";
import * as debug from "debug";

import {
  ClientMessage,
  SessionManager,
} from "./session_manager";

import { Room, Session } from "../models";

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
      const roomId = queryParams.roomId;

      if (!userId || !roomId) {
        return {
          statusCode: 401,
          body: "you must need to provide userId and roomId",
        };
      }

      // Find Room
      const room = await Room.primaryKey.get(roomId);
      if (!room) {
        return {
          statusCode: 401,
          body: "room doesn't exists",
        };
      }

      // Create Session
      const session = new Session();
      session.sessionId = sessionId;
      session.userId = userId;
      session.roomId = roomId;
      await session.save();

      // reverse refernce from room
      room.sessionIds.push(session.sessionId);
      await room.save();
    } else if (routeKey === "$disconnect") {
      const session = await Session.primaryKey.get(sessionId);
      if (!session) {
        // very starange.. this should not happen
      } else {
        // find room also.
        const room = await Room.primaryKey.get(session.roomId);
        if (room) {
          room.sessionIds = room.sessionIds.filter(id => id !== session.sessionId);
          await room.save();
        }

        // Delete session
        await session.delete();
      }

    } else {
      // // All the other actions
      // const payload = JSON.parse(event.body!) as ClientMessage;

      // switch (payload.type) {
      //   // tslint:disable:align
      //   case "create_chat_message": {
      //     await sessionManager.broadcastMessageToClient({
      //       type: "chat_message_created",
      //       message: payload.message,
      //       sessionId,
      //     });
      //   } break;
      //   case "login": {
      //     const session = (await sessionManager.findSession(sessionId))!;
      //     session.metadata = {
      //       username: payload.username
      //     };
      //     await session.save();

      //     await sessionManager.broadcastMessageToClient({
      //       type: "user_connected",
      //       username: payload.username,
      //       sessionId,
      //     });
      //   } break;
      //   default: {
      //     throw new Error(`Invalid message: ${JSON.stringify(payload)}`);
      //   }
      //   // tslint:enable:align
      // }
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
