const myFunction1 = () => {
  return 123123123;
};

const myFunction2 = () => {
  return "Hello";
};

const useInfo = () => {
  return {
    name: "버즈",
    age: 34,
    hobby: "코딩",
  };
};

type MyFuncType1 = ReturnType<typeof myFunction1>;
type MyFuncType2 = ReturnType<typeof myFunction2>;
type UseInfoType = ReturnType<typeof useInfo>;

const query = (
  url: string,
  option?: { method: string; header: { [key: string]: string }; body?: string },
  searchParam: string
) => {};

type QueryParametersType = Parameters<typeof query>;
const params: QueryParametersType = [
  "http://localhost",
  { method: "GET", header: { "123": "123" } },
];
