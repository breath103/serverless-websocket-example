import * as KinesisStreamEvent from '../../interfaces/kinesis-stream-event';
import KinesisStreamHelper from '../../helpers/kinesis-stream-helper';

export default async function handler(event: KinesisStreamEvent.Event) {
  const payloads = (event.Records || []).map((record) => {
    return KinesisStreamHelper.parseRecordData(record);
  })

  return {
    count: payloads.length,
    payloads: payloads,
  };
}
