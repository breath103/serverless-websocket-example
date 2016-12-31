export default function handler(event: LambdaProxyEvent, context: Context) {
  // Like this, you can serve html
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: `
      <html>
        <body>
          <h1> TITLE </h1>
        </body>
      </html>
    `
  };

  const [a, b] = [0, 1];
  console.log(a, b);

  context.done(null, response);
}
