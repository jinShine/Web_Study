// 1. 문자, 숫자, 불리언 타입 (Primitive 타입)
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

const result = getPrimitive("철수", 123, true);

//
//
// 2. any 타입
const getAny = (arg1: any, arg2: any, arg3: any): any => {
  const qqq = arg1 + 200;
  return [arg3, arg2, arg1];
};
const result2 = getAny("철수", 123, true);

//
//
// 3. unknown 타입
// any와 동일하지만,
// unknown은 사용할 때, 타입을 가정하여 사용해야 함
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): unknown => {
  if (typeof arg1 === "undefined") {
    console.log(arg2 + 1000);
  }

  return [arg3, arg2, arg1];
};

const result3 = getUnknown("철수", 123, true);

//
//
// 4. generic 타입 - 1
// 제네릭은 타입을 내가 만든다라는 뜻
function getGeneric<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType1, MyType2, MyType3] {
  return [arg3, arg2, arg1];
}

// 무슨 타입이든 상관없다. 하지만,
// 일단 한번 넣고 나면 처음 넣은 타입으로 유지된다.
const result4 = getGeneric("철수", 123, true); // 타입 추론
const result5 = getGeneric<string, number, boolean>("철수", 123, true); // 타입 명시

//
//
// 5. generic 타입 - 2
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T1, T2, T3] {
  return [arg3, arg2, arg1];
}

//
//
// 6. generic 타입 - 3
function getGeneric3<T, U, V>(arg1: T, arg2: U, arg3: V): [T, U, V] {
  return [arg3, arg2, arg1];
}
