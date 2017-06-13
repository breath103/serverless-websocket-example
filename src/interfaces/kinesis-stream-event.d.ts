import * as Base from "./base";

// Event
export interface Event extends Base.Event {
  Records?: KinesisRecord[];
}

export interface KinesisRecord {
  kinesis: {
    partitionKey: string;
    kinesisSchemaVersion: string;
    data: string;
    sequenceNumber: string;
  };
  eventSource: string;
  eventID: string;
  invokeIdentityArn: string;
  eventVersion: string;
  eventName: string;
  eventSourceARN: string;
  awsRegion: string;
}

// Response
export interface Response extends Base.Response {
  [key: string]: any;
}

// Context
export type Context = Base.Context<Response>;
