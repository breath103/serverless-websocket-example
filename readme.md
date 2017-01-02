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