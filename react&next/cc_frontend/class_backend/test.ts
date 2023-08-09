import { Entity } from "typeorm";

function bbb(qqq: any) {
  console.log("============================");
  console.log(qqq);
  console.log("============================");
}

// 함수다
@bbb // class가 함수 인자로 들어간다!
class Test {}
