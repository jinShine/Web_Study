# frontend-survival-week05-answer

프론트엔드 생존코스 5주차 과제 풀이

## 🛎 참고사항

> 과제에서 상위 컴포넌트로 갈수록 E2E 테스트에 가까워 집니다.
> 그렇기 때문에 실무에서는 상위 컴포넌트 테스트는 오히려 간단하게 하고 중요한 내용은
> E2E 테스트에 맡기는 경우도 많습니다.
> 
> 과제에서는 실제 실무 환경과는 다르게 제약사항들이 존재하고
> 이렇게도 테스트를 작성할 수 있다 혹은 이렇게도 Mocking 할 수 있다를
> 보여주기 위해 다양하게 작성되었다는 점을 참고해서 봐주시면 좋을 것 같습니다.

## 서버 실행하기

```shell
cd express-app

npm install

npx nodemon app.ts
```

## 실행하기

```shell
npm install

npm start
```

## 테스트

```shell
npm test
```

## E2E 테스트

```shell
npm start

npm run codeceptjs
```
