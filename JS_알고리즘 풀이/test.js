// function solution(n, lost, reserve) {
//   let newLost = lost.filter((l) => !reserve.includes(l)).sort((a, b) => a - b);
//   let newReserve = reserve.filter((r) => !lost.includes(r)).sort((a, b) => a - b);

//   let answer = n - newLost.length;

//   console.log("@11", newLost);
//   console.log("@22", newReserve);

//   for (let i = 0; i < newLost.length; i++) {
//     for (let j = 0; j < newReserve.length; j++) {
//       if (newLost[i] === newReserve[j] - 1) {
//         answer++;
//       }
//     }
//   }

//   return answer;
// }

// // solution(5, [2, 4], [1, 3, 5]);
// // solution(5, [2, 4], [3]);
// // solution(3, [3], [1]);
// // solution(4, [2, 3], [3, 4]);
// console.log(solution(6, [3, 4, 5], [3, 4, 6]));

// // console.log(solution(4, [2, 3], [3, 4]));
// // console.log(solution(4, [1, 2, 3, 5], [3, 4]));

///////////////////

// function countDistinctPairs(numbers, k) {
//   let distinctPairs = new Set();
//   let numCount = {};

//   for (let i = 0; i < numbers.length; i++) {
//     const num = numbers[i];
//     const target1 = num - k;
//     const target2 = num + k;

//     if (numCount[target1]) {
//       distinctPairs.add([target1, num].sort().join("-"));
//     }
//     if (numCount[target2]) {
//       distinctPairs.add([num, target2].sort().join("-"));
//     }

//     numCount[num] = numCount[num] ? numCount[num] + 1 : 1;
//   }

//   return distinctPairs.size;
// }

// // Example usage:
// const n = 6;
// // const numbers = [1, 1, 2, 2, 3, 3];
// const numbers = [1, 2, 3, 4, 5, 6];
// const k = 2;

// const pairsCount = countDistinctPairs(numbers, k);
// console.log("결과", pairsCount);

// function findSubstring(text, prefixString, suffixString) {
//   let prefixScore = 0;
//   let suffixScore = 0;
//   let maxTextScore = 0;
//   let maxSubstring = "";

//   // Find the longest matching suffix from the beginning of the text
//   for (let i = 0; i < suffixString.length; i++) {
//     const suffix = suffixString.substring(0, i + 1);
//     if (text.startsWith(suffix) && suffix.length > suffixScore) {
//       suffixScore = suffix.length;
//     }
//   }

//   // Find the longest matching prefix from the end of the text
//   for (let i = 0; i < prefixString.length; i++) {
//     const prefix = prefixString.substring(prefixString.length - i - 1);
//     if (text.endsWith(prefix) && prefix.length > prefixScore) {
//       prefixScore = prefix.length;
//     }
//   }

//   console.log("@@ first", prefixScore);
//   console.log("@@ last", suffixScore);
//   const textScore = prefixScore + suffixScore;

//   // // Find all substrings with the maximum textScore
//   // for (let i = 0; i < text.length; i++) {
//   //   for (let j = i + 1; j <= text.length; j++) {
//   //     const substring = text.substring(i, j);
//   //     const substringScore = substring.length;

//   //     if (substringScore === textScore && substring < maxSubstring) {
//   //       maxSubstring = substring;
//   //     }
//   //   }
//   // }

//   // return maxSubstring;

//   return textScore;
// }

// // Example usage:
// const text = "engine";
// const prefixString = "raven";
// const suffixString = "ginkgo";

// const substring = findSubstring(text, prefixString, suffixString);
// console.log(substring);

function countKSubarrays(nums, k) {
  let count = 0;
  let sum = 0;

  const modCount = new Array(k).fill(0);
  modCount[0] = 1;

  for (let i = 0; i < nums.length; i++) {
    sum = (sum + nums[i]) % k;
    console.log("@@@", sum);
    if (sum < 0) {
      sum += k;
    }
    count += modCount[sum];
    modCount[sum]++;
  }

  return count;
}

// Example usage:
// const k = 5;
// const nums = [5, 10, 11, 9, 5];
const k = 3;
const nums = [1, 2, 3, 4, 1];

const subarrayCount = countKSubarrays(nums, k);
console.log(subarrayCount);
