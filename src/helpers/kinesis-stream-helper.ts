import * as KinesisStreamEvent from "../interfaces/kinesis-stream-event";

export default class KinesisStreamHelper {
  public static parseRecordData(record: KinesisStreamEvent.KinesisRecord) {
    const payload = new Buffer(record.kinesis.data, "base64").toString("utf8");
    const payloadJson = JSON.parse(payload);
    return payloadJson;
  }
}
