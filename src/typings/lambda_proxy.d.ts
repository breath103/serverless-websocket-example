
interface LambdaProxyEvent {
  resource?: string;
  path?: string;
  httpMethod?: string;
  headers: {
    "Accept"?: string;
    "Accept-Encoding"?: string;
    "Accept-Language"?: string;
    "CloudFront-Forwarded-Proto"?: string;
    "CloudFront-Is-Desktop-Viewer"?: string;
    "CloudFront-Is-Mobile-Viewer"?: string;
    "CloudFront-Is-SmartTV-Viewer"?: string;
    "CloudFront-Is-Tablet-Viewer"?: string;
    "CloudFront-Viewer-Country"?: string;
    "Host"?: string;
    "Upgrade-Insecure-Requests"?: string;
    "User-Agent"?: string;
    "Via"?: string;
    "X-Amz-Cf-Id"?: string;
    "X-Forwarded-For"?: string;
    "X-Forwarded-Port"?: string;
    "X-Forwarded-Proto"?: string;
    "original-uri"?: string;
  };
  queryStringParameters: {
    [key: string]: string
  };
  pathParameters?: any;
  stageVariables?: {
    current_mingle_version: string;
    current_dingle_version: string;
  };
  requestContext?: {
    "accountId": string;
    "resourceId": string;
    "stage": string;
    "requestId": string;
    "identity": {
      "cognitoIdentityPoolId": any;
      "accountId": any;
      "cognitoIdentityId": any;
      "caller": any;
      "apiKey": any;
      "sourceIp": string,
      "accessKey": any;
      "cognitoAuthenticationType": any;
      "cognitoAuthenticationProvider": any;
      "userArn": any;
      "userAgent": string;
      "user": any;
    }
    "resourcePath": string;
    "httpMethod": string;
    "apiId": string;
  };
  body?: string;
}
