`use strict`;
/* 
    Math 객체 

    Math 객체에는 PI, e, sin, cos, tan 등 수학 상수들이 존재한다.
    */

// 가장 많이 사용하는 random 함수
const randomNum = Math.random(); // 0보다는 크고 1보다는 작은 수가 랜덤으로 리턴
console.log(randomNum * 10); // 0보다는 크고 10보다는 작은 수

// round() - 반올림 처리
console.log(Math.round(4.9)); // 5
console.log(Math.round(4.4)); // 4

// ceil() - 무조건 올림 처리
console.log(Math.ceil(4.6)); // 5
console.log(Math.ceil(4.1)); // 5

// 페이징처리
// 게시판에 작성된 글이 51개 등록되었다라고 가정.
// 게시판 한 페이지에 10개의 글 목록을 보여주게 구성되어 있음.
let total = 51;
let countPerPage = 10;
let totalPage = Math.ceil(total / countPerPage);
console.log(totalPage);

// floor() - 무조건 내림 처리
console.log(Math.floor(4.7)); // 4
console.log(Math.floor(-4.2)); // -5

// trunc() - 소수점 이하는 무조건 버림 처리
console.log(Math.trunc(4.7)); // 4
console.log(Math.trunc(-4.2)); // -4

Math.random() * 10 + 1;
Math.max();
Math.min();
Math.round();
Math.ceil();
Math.floor();
Math.pow();
