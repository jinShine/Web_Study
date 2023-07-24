const languages = ["C", "SWIFT", "JAVA", "SWIFT", "JAVA", "JAVA", "R"];
const scores = [
  [65, 80, 90],
  [46, 100, 70],
  [91, 96, 59],
  [89, 90, 61],
  [0, 94, 75],
  [38, 95, 47],
  [50, 60, 90],
];

// const languages = ["A", "AAA", "AA"];
// const scores = [
//   [100, 50, 0, 30],
//   [100, 50, 0, 25],
//   [100, 50, 0, 30],
// ];

// function solution(languages, scores) {
//   const answer = [];

//   const datas = {};

//   for (let i = 0; i < languages.length; i++) {
//     const lan = languages[i];
//     const score = scores[i];

//     if (!datas[lan]) {
//       datas[lan] = { scores: score, count: 1 };
//     } else {
//       datas[lan].count += 1;
//       datas[lan].scores = datas[lan].scores.map(
//         (value, index) => value + score[index]
//       );
//     }
//   }

//   let keys = Object.keys(datas);

//   for (const lan of keys) {
//     datas[lan].scores = datas[lan].scores.map(
//       (value) => value / datas[lan].count
//     );
//   }

//   for (let i = 0; i < scores[0].length; i++) {
//     let maxAvg = 0;
//     let maxCount = 1;
//     let maxLan = "";

//     for (const lan of keys) {
//       const avg = datas[lan].scores[i];

//       if (avg > maxAvg) {
//         maxAvg = avg;
//         maxCount = datas[lan].count;
//         maxLan = lan;
//       } else if (avg === maxAvg) {
//         if (datas[lan].count > maxCount) {
//           maxLan = lan;
//         }

//         if (datas[lan].count == maxCount) {
//           maxLan = [maxLan, lan].sort()[1];
//         }
//       }
//     }

//     answer.push(maxLan);
//   }

//   return answer;
// }

////////
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////

function solution(languages, scores) {
  const answer = [];

  const datas = {};

  for (let i = 0; i < languages.length; i++) {
    const lan = languages[i];
    datas[lan] = { score: scores[i] };
  }

  console.log(datas);

  return answer;
}

const result = solution(languages, scores);
console.log(result); // 예시의 경우 ["SWIFT", "JAVA", "R"] 출력
