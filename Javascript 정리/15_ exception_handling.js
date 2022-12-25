///////////////////////////////////////////// 예외 처리 /////////////////////////////////////////////

/* 
프로그램에서 문제가 발생하면 프로그램은 실행을 멈추므로 소스를 작성할 때부터 발생할만한 문제를 미리 고려하고 대비해야 합니다.
이런 작업을 '예외 처리'라고 합니다.

구문오류(Syntax Error)를 제외한 런타임 중에 발생한 오류(TypeError, ReferenceError, RangeError)등이 예외로 분류된다.

예외가 발생했을때 프로그램이 중단되지 않게 적절한 예외처리가 필요합니다.
*/

// 문법
// try {} catch {} finally {}

// 어떤 예외가 발생할지 예측하기 힘든경우 고급 예외처리로 처리해주는것이 좋다.
try {
  // 실행할 코드
} catch (error) {
  // try 블록에서 예외가 발생했을 때 실행할 코드
  // error의 객체 속성
  // name : 예외이름
  // message : 예외 메시지
} finally {
  // try 블록 이후에 실행할 코드
  // 예외와 상관없이 무조건 실행된다.
  // 생략가능
}

// consoloe.error() 오류 메시지 표현 방법
// 콘솔 창에서 오류 메시지를 표시할 때 빨간색으로 표시되는 console.error()를 사용한다.

// 예시
function test1() {
  try {
    willExcept.run();
    console.log("try ~~");
  } catch (error) {
    console.error(`오류 발생 : ${error}`);
    console.error(`오류 발생 : ${error.name}`);
    console.error(`오류 발생 : ${error.message}`);
  } finally {
    console.log("test1 무조건 실행됨");
  }
}
test1();

/* 
직접 예외를 발생하는 방법

// 1. 단순하게 예외를 발생시킨다.
throw 문자열

// 2. 조금 더 자세하게 예외를 발생시킨다.
throw new Error(문자열)
*/

function test2() {
  let json = '{"version": 2.0, "grade": 1, "age": 32}';

  try {
    let user = JSON.parse(json);

    if (user.version >= 1.0) {
      throw "버전 업데이트가 필요합니다.";
      updateVersion();
    }

    if (Object.keys(json).length !== 0) {
      throw "재 요청 필요";
      retryAPI();
    }
  } catch (error) {
    console.error(error);
  }
}
test2();

function updateVersion() {}
function retryAPI() {}

/*
예외를 강제로 발생시키는 이유는 뭘까?
의도 하지 않은 형태로 코드를 사용해 사용자에게 주의를 주거나 의도할 수 있다.

다른 언어였으면 a, b가 없어 예외가 발생했을 것인데,
자바스크립트에는 undefined, NaN이 존재하기 때문에 다른 언어에 비해 예외를 많이 발생하지 않는다.
그렇기 때문에 사용자에게 함수를 잘못 사용했다는것을 강제로라도 인지시켜줄 필요가 있다는 것.
 */

function test3(object) {
  if (object.a !== undefined) {
    console.log(object.a);
  } else {
    throw new Error("a 속성을 지정하지 않았습니다.");
  }
}
test3({});
