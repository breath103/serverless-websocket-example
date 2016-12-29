export default async function handler(event: LambdaProxyEvent) {
  const response = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
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
      });
    }, 1);
  });

  return response;
}
