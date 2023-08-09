// 매달 k일은 아파트 관리비를 내는날입니다.
// 만약 그 달의 k일이 주말(토요일, 일요일)이라면 관리비는 k일로부터 가장 가까운 평일에 냅니다.
// 한 해의 시작일인 1월 1일에 해당하는 요일 day와 매달 관리비를 내야하는 날짜 k가 매개변수로 주어질 떄,
// 그 해의 1월부터 12월까지 매달 k일이 평일이면 0을, 주말이면 1을 순서대로 배열에 담아 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// * 1월 1일에 해당하는 요일은 다음과 같이 숫자로 주어집니다.
//   * 월요일=0, 화요일=1, 수요일=2, 목요일=3, 금요일=4, 토요일=5, 일요일=6
// * 윤년과 공휴일은 고려하지 않는다.
// * 각 달의 날짜 수는 1월부터 순서대로 [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

// 입출력 예
// day는 6, k가 1일때 result는 [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0]
// day는 6, k가 25일때 result는 [0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0]

// 이 예시에서 1월 1일은 일요일이고, 매달 1일에 관리비를 내야 합니다.
// 1월 1일은 주말이므로 result 배열의 첫번째 요소는 1입니다.
// 2월부터 12월까지 매달 1일에 해당하는 요일은 다음과 같습니다.

// 2월 : 수요일
// 3월 : 수요일
// 4월 : 토요일
// 5월 : 월요일
// 6월 : 목요일
// 7월 : 토요일
// 8월 : 화요일
// 9월 : 금요일
// 10월 : 일요일
// 11월 : 수요일
// 12월 : 금요일

// function solution(day, k) {
//   const answer = [];
//   const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//   day = day + (k % 7) - 1;

//   for (let month = 0; month < 12; month++) {
//     const days = daysInMonth[month];

//     if (month === 0) {
//       if (day === 5 || day === 6) {
//         answer.push(1);
//       } else {
//         answer.push(0);
//       }

//       day += days % 7;

//       continue;
//     }

//     if (day < 7) day += 7;

//     let currentDay = day - 7;

//     if (currentDay === 5 || currentDay === 6) {
//       answer.push(1);
//     } else {
//       answer.push(0);
//     }

//     day = currentDay + (days % 7);
//   }

//   return answer;
// }

// // 예시 입력에 대한 출력
// console.log(solution(6, 1)); // [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0]
// console.log(solution(6, 25)); // [0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0]

// function solution(a, b, budget) {
//   var answer = 0;

//   for (let i = 0; i * a < budget; i++) {
//     for (let j = 0; j * b < budget; j++) {
//       if (budget - (i * a + j * b) === 0) {
//         answer += 1;
//       }
//     }
//   }

//   return answer;
// }

// console.log(solution(3000, 5000, 23000));

function solution(orders) {
  const answer = [];
  const user = {};

  orders.forEach((order) => {
    const arr = order.split(" ");
    if (user[arr[0]] == undefined) user[arr[0]] = [...arr];
    else user[arr[0]] = [...user[arr[0]], ...arr];
  });

  for (key in user) {
    user[key] = [...new Set(user[key])];
    answer.push(user[key]);
  }

  let max = Math.max.apply(
    Math,
    answer.map((el) => el.length)
  );

  return answer.filter((data) => data.length === max).map((data) => data[0]);

  // return answer;
}

console.log(
  solution([
    "alex pizza pasta",
    "alex pizza pizza",
    "alex noodle",
    "bob pasta",
    "bob noodle sandwich pasta",
    "bob steak noodle",
  ])
);
