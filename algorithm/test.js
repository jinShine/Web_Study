const employee1 = { firstName: "Buzz1" };
const employee2 = { firstName: "Buzz2" };

function invite(greeting1) {
  console.log(greeting1 + " " + this.firstName + " ");
}

invite.call(employee1, "Hello~");
invite.call(employee2, "Hello!!!");

invite.apply(employee1, ["apply~~~1", "apply~~~2"]);

const inviteEmployee = invite.bind(employee1);
inviteEmployee("bindHello");

console.log(JSON.stringify(employee1));

const parsed = JSON.stringify(employee1);
console.log(JSON.parse(parsed));

let arrayInteger = [1, 2, 3, 4, 5, 6];
const ddd = arrayInteger.slice(0, 3); // 새로운 배열
const ddd1 = arrayInteger.slice(3);
console.log(ddd);
console.log(ddd1);

let arrayIntegersOriginal1 = [1, 2, 3, 4, 5];
let arrayIntegersOriginal2 = [1, 2, 3, 4, 5];
let arrayIntegersOriginal3 = [1, 2, 3, 4, 5];

let splicedArray1 = arrayIntegersOriginal1.splice(3, 1, "ㅋ", "222");
// let splicedArray1 = arrayIntegersOriginal1.splice(3);

console.log(splicedArray1);
console.log(arrayIntegersOriginal1);

{
  console.log("!@#!@#!@#");
}

let uri = "employeeDetails?name=john&occupation=manager";
let encoded_uri = encodeURIComponent(uri);
// encodeURI(uri);

console.log("!@#!@#!@#", encoded_uri);
let decoded_uri = decodeURIComponent(encoded_uri);
// let decoded_uri = decodeURI()
console.log("!@#!@#!@#", decoded_uri);

const memorized = () => {
  let cache = {};

  return (value) => {
    if (value in cache) {
      console.log("캐시에서 가져옴");
      return cache[value];
    } else {
      console.log("캐시에 저장 후 가져옴");
      let result = value + 20;
      cache[value] = result;
      return result;
    }
  };
};

const memo = memorized();
console.log(memo(20));
console.log(memo(20));
