import * as AWS from "aws-sdk";
import { Session } from "../models";

export class SessionManager {
  public apiGateway = new AWS.ApiGatewayManagementApi({
    endpoint: "https://42miiaobvk.execute-api.ap-northeast-2.amazonaws.com/prod",
  });

  public async createSession(
    connectionId: string,
    userId: string
  ) {
    // Create Session.
    const session = new Session();
    session.sessionId = connectionId;
    session.userId = userId;
    await session.save();
  }

  public async findSession(connectionId: string) {
    const session = await Session.primaryKey.get(connectionId);
    return session;
  }

  public async destorySession(connectionId: string) {
    // Create Session.
    const session = await Session.primaryKey.get(connectionId);
    if (session) {
      await session.delete();
    }
  }

  public async sendMessageToClient(sessionId: string, message: ServerMessage) {
    await this.apiGateway.postToConnection({
      ConnectionId: sessionId,
      Data: JSON.stringify(message),
    }).promise();
  }

  public async broadcastMessageToClient(message: ServerMessage) {
    const sessions = (await Session.primaryKey.scan({})).records;
    await Promise.all(sessions.map((record) => this.sendMessageToClient(record.sessionId, message)));
  }
}

/**
 * Server -> Client message
 */
export type ServerMessage = (
  {
    type: "user_connected",
    sessionId: string,
    username: string,
  } | {
    type: "chat_message_created",
    message: string,
    sessionId: string,
  } | {
    type: "stroke_created",
    stroke: {
      x: number, y: number, color: string, size: number,
    }
  }
);

/**
 * Client -> Server Message
 */
export type ClientMessage = (
  {
    type: "create_chat_message",
    message: string,
  }| {
    type: "create_stroke",
    stroke: {
      x: number, y: number, color: string, size: number,
    }
  }
);
