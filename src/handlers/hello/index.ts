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

  // Like this, you can serve image
  // const response = {
  //   statusCode: 200,
  //   headers: {
  //     'Content-Type': 'image/gif'
  //   },
  //   body: [71,73,70,56,57,97,1,0,1,0,128,255,0,192,192,192,0,0,0,33,249,4,1,0,0,0,0,44,0,0,0,0,1,0,1,0,0,2,2,68,1,0,59].map((x) => String.fromCharCode(x)).join("")
  // };

  context.done(null, response);
}
