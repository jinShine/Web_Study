let numberValue: number;
let stringValue: string;
let booleanValue: boolean;
let undefinedValue: undefined;
let nullValue: null;
let objValue: object;
let symbolValue: symbol;

let names: string[];
names = ["1", "2"];
names.push("3");

let user1: { name: string; score: number };
user1.name = "buzz";
user1.score = 100;

// 안에 들어가야할 항목의 갯수와 타입들을 미리 정의해서 넣을 수 있다.
let tuple: [string, number, string];
tuple = ["1", 2, "3"];
// let tuple2: [string, number] = [1, "2", ""]
