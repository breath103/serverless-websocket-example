import {
  APIGatewayProxyHandler,
} from "aws-lambda";
import * as debug from "debug";
import * as fs from "fs";
import * as path from "path";

import { Stroke } from "../models";

const logger = debug("Frontend");

export const handler: APIGatewayProxyHandler = async (event) => {
  //
  // https://fz5bsno29d.execute-api.ap-northeast-2.amazonaws.com/prod/api.json
  //
  if (event.path.endsWith("api.json")) {
    const strokes = (await Stroke.primaryKey.scan({})).records;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        strokes.map(stroke => {
          return {
            createdAt: stroke.createdAt,
            data: stroke.data,
          };
        })
      ),
    };
  } else {
    logger("%O", event);
    const html = fs.readFileSync(path.resolve(__dirname, "index.html"));
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: html.toString(),
    };
  }
};
