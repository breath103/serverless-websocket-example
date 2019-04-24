import {
  APIGatewayProxyHandler,
} from "aws-lambda";
import * as debug from "debug";
import * as fs from "fs";
import * as path from "path";

const logger = debug("Frontend");

export const handler: APIGatewayProxyHandler = async (event) => {
  logger("%O", event);
  const html = fs.readFileSync(path.resolve(__dirname, "index.html"));
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: html.toString(),
  };
};
