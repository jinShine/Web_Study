///////////////////////////////////////////// 생성자 함수 /////////////////////////////////////////////

/*
클래스가 나오기전 자바스크립트는 생성자 함수가 클래스를 대신했다.

<관례>
1. 함수 이름의 첫 글자는 대문자로 시작
2. 반드시 new 연산자를 붙여서 사용한다.
 */

function Book(title, pages, done = false) {
  this.title = title;
  this.pages = pages;
  this.done = done;
  this.finish = function () {
    let str = "";
    this.done === false ? (str = "읽는 중") : (str = "완독");
    return str;
  };
}

// 프로토타입을 이용해서 정의할 수도 있다.
Book.prototype.desc = function () {
  console.log(`제목 : ${this.title}, 페이지 : ${this.pages}`);
};

const book1 = new Book("모던 자바스크립트", "700", true);
const book2 = new Book("리액트", "600", false);
console.log(book1);
console.log(book2.finish());
book1.desc();
