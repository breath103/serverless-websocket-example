import * as Event from "aws-lambda";
import * as AWS from "aws-sdk";
import * as debug from "debug";

import { Session } from "../models";

const logger = debug("Websocket");

let apiGateway: AWS.ApiGatewayManagementApi;

export async function handler(event: Event.APIGatewayProxyEvent): Promise<Event.APIGatewayProxyResult> {
  logger("%O", event);

  const context = event.requestContext;
  const connectionId = context.connectionId!;
  const routeKey = context.routeKey as "$connect" | "$disconnect" | "$default";

  if (!apiGateway) {
    // Echo
    apiGateway = new AWS.ApiGatewayManagementApi({ endpoint: `https://${context.domainName}/${context.stage}` });
  }

  switch (routeKey) {
    case "$connect": {
      // Create Session.
      const session = new Session();
      session.sessionId = connectionId;
      session.metadata = {
        createdAt: Date.now(),
      };
      await session.save();

      return {
        statusCode: 200,
        body: "Connected",
      };
    }
    case "$disconnect": {
      const session = await Session.primaryKey.get(connectionId);
      if (session) {
        await session.delete();
      }
      return {
        statusCode: 200,
        body: "Disconneted",
      };
    }
    case "$default": {
      try {
        const payload = JSON.parse(event.body!) as {
          action: string,
          data: string,
        };

        // Send Data
        await apiGateway.postToConnection({
          ConnectionId: connectionId, // connectionId of the receiving ws-client
          Data: JSON.stringify({
            connectionId,
            body: event.body,
          }),
        }).promise();

        const session = await Session.primaryKey.get(connectionId);
        if (session) {
          session.metadata.messages = session.metadata.messages || [];
          session.metadata.messages.push(payload);
          await session.save();
        }

        return {
          statusCode: 200,
          body: "Success",
        };
      } catch (e) {
        return {
          statusCode: 500,
          body: `Malformed event body: ${event.body}`,
        };
      }
    }
  }
}

async function broadcast(payload: any) {
  const sessionScan = await Session.primaryKey.scan({});

  await Promise.all(sessionScan.records.map(async (record) => {
    await apiGateway.postToConnection({
      ConnectionId: record.sessionId, // connectionId of the receiving ws-client
      Data: JSON.stringify(payload),
    }).promise();
  }));
}
