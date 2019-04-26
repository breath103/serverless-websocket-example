# Serverless Websocket Example

# Overview
이 Sample project는 API Gateway, Lambda, DynamoDB를 이용하여 Websocket을 이용한 실시간성 application을 만들어보는 예제입니다.

Lambda / API Gateway / DynamoDB 관리는 Cloudformation과 serverless framework를 사용하였습니다.


1. 배포 - **npm run deploy** 
    - 이 스크립트는 다음과 같은 일을 합니다.  
      - TSC compile 
      - npm install
      - node_modules와 js파일, html파일을 dst.zip으로 생성
      - serverless framework (sls deploy)를 이용해 dst.zip을 lambda에 배포
      - serverless.yml 의 cloudformation 부분 배포

2. 테스트 - **npm run test** 
    - 이 스크립트는 다음과 같은 일을 합니다.  
      - TSC compile 
      - mocha로 \*\*/__test__/\*_spec.js 파일들 실행

3. Log - **npm run log**
    - 이 스크립트는 다음과 같은 일을 합니다.  
      - sls logs --tail 명령어를 이용해, Lambda의 Log를 실시간으로 출력합니다.
      

https://fz5bsno29d.execute-api.ap-northeast-2.amazonaws.com/prod
여기서 테스트 해보실수 있습니다.


# HandsOn Guide
https://www.icloud.com/keynote/0fL0mibQtgTg4ABkkZz91Qi0g#Handson