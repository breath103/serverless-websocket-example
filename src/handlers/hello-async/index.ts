import * as LambdaProxy from "../../interfaces/lambda-proxy";

export default async function handler(event: LambdaProxy.Event) {
  const response = await new Promise<LambdaProxy.Response>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
        },
        body: `
          <html>
            <body>
              <h1> TITLE </h1>
            </body>
          </html>
        `,
      });
    }, 1);
  });

  return response;
}
