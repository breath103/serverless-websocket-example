import * as LambdaProxy from '../../interfaces/lambda-proxy';

import { LambdaProxyRaven } from '../../helpers/lambda_proxy_raven';

export default async function handler(event: LambdaProxy.Event) {
  const raven = new LambdaProxyRaven(event);

  try {
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
  } catch (e) {
    await raven.capture(e);
    return null;
  }
}
