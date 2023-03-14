import { useRouter } from "next/router";
import { useEffect } from "react";

// 1. HOF - 일반 타입
function first1(arg1: string) {
  return function second1(arg2: number): [string, number] {
    return [arg1, arg2];
  };
}

const result = first1("영희")(8);

//
// 2. HOF - any 타입
function first2(arg1: any) {
  return function second2(arg2: any): [any, any] {
    return [arg1, arg2];
  };
}

const result1 = first2("영희")(8);

//
// 3. HOF - generic 타입
function first3<T>(arg1: T) {
  return function second2<U>(arg2: U): [T, U] {
    return [arg1, arg2];
  };
}

const result2 = first3<string>("버즈")<boolean>(true);

//
// 4. HOF - generic 타입(화살표)
const first4 =
  <T>(arg1: T) =>
  <U>(arg2: U): [T, U] => {
    return [arg1, arg2];
  };

const result3 = first4("버즈")(true);


//
// 5. HOC - generic 타입(컴포넌트의 응용)
const withAuth = <T>(Component: T) => <U>(props: U): T => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      alert("로그인 후 이용가능합니다.");
      router.back();
    }
  }, []);

  return <Component {...props} />;
}
const result3 = first4("버즈")(true);
