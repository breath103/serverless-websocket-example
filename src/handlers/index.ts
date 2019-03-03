import * as Event from "aws-lambda";
import * as AWS from "aws-sdk";
import * as debug from "debug";

import { Session } from "../models";

const logger = debug("Websocket");

export async function websocket(event: Event.APIGatewayProxyEvent): Promise<Event.APIGatewayProxyResult> {
  logger("%O", event);

  const requestContext = event.requestContext;
  const connectionId = requestContext.connectionId!;
  const routeKey = requestContext.routeKey as "$connect" | "$disconnect" | "$default";

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

        // Echo
        const apiGateway = new AWS.ApiGatewayManagementApi({
          endpoint: `https://${requestContext.domainName}/${requestContext.stage}`
        });

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
