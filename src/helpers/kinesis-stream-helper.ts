import * as KinesisStreamEvent from '../interfaces/kinesis-stream-event';

export default class KinesisStreamHelper {
  static parseRecordData(record: KinesisStreamEvent.KinesisRecord) {
    const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
    const payloadJson = JSON.parse(payload);
    return payloadJson;
  }
}