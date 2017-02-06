# What's this for?
this is for all the developers who building microservice (usually http) based on
AWS Gateway / AWS Lambda, Plus sweet typescript / serverless framework

# Examples

1. `hello`
    - Basic example showing how to build HTTP based microservice (with API Gateway)
2. `hello-async`
    - example showing how to build service with async handler
3. `hello-kinesis-stream`
    - example showing how to build kinesis-stream worker. [AWS Document](http://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html)

# How to start?
There are few things you need to customize to starts.

1) serverless.yml
  - name service

    ```service: lambda-microservice-template # NOTE: update this with your service name```

## How to invoke function on lambda

serverless invoke -f #{functionName} -e #{mock_event.json path}
for mockevent format, check lambda_proxy.d.ts

## How to invoke function locally

npm run invoke -- -f hello

## Test

this project use mocha + typescript for unit test. place test files as src/**/__test__/*.ts
then run ```npm run test```


## Typescript coding rules
1. Ambient declaration is not "Global" declaration.
    Ambient declaration is really handy, but be mind that it's reason-of-being is to
    ```
      A major design goal of TypeScript was to make it possible for you
      to safely and easily use existing JavaScript libraries in TypeScript.
      TypeScript does this by means of declaration
    ```
    [reference](https://basarat.gitbooks.io/typescript/content/docs/types/ambient/intro.html)
    in other words, it's not for sharing declaration globally. don't make Ambient declaration just to share certain interface or types.
    use it only for providing Typescript definition to already existing Javascript libraries


# Sentry Plugin

this project includes serverless-sentry-plugin, at local.
--org means Sentry Organization slug,
--team means Sentry Team slug,
for further usage check sls sentry --help

1. Create Sentry project from serverless.yml setting
    ```
        $(npm bin)/sls sentry create --org vingle --team vingle -s stage
    ```
2. Get created sentry project info, and put it into serverless environment
    ```
        $(npm bin)/sls sentry info --org vingle --team vingle -s stage
    ```
    this gonna show
    ```
        PROJECT_URL : https://sentry.io/vingle/${project_slug}/
        RAVEN_KEY : https://xxxx:xxxx@sentry.io/135184
    ```
    Then, put RAVEN_KEY: https://xxxx:xxxx@sentry.io/135184 serverless.yml

    and then you can use raven like
    ```
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
    ```

    Currently, Sentry support is specialized for Lambda-Proxy event