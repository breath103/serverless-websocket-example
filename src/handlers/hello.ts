export default function handler(event: any, context: Context) {
  console.log(event, context);
  context.succeed({
    event,
    context
  });
}
