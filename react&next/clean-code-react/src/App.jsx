import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [list, setList] = useState([]);

  useEffect(function onInit() {
    setList([1, 2, 3, 4, 5, 6, 7]);
  }, []);

  // useEffect(() => {
  //   document.addEventListener();

  //   return () => {
  //     document.removeEventListener();
  //   };
  // }, []);

  useEffect(function addEvent() {
    document.addEventListener();

    return function removeEvent() {
      document.removeEventListener();
    };
  }, []);
  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}

        {/* ❌ */}
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}

        {/* ✅ */}
        {list.map((item, index) => (
          <li key={"item-" + index}>{item}</li>
        ))}

        {/* ✅ */}
        {list.map((item) => (
          <li key={item.id}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default App;

/**
 *
 * 1. 렌더링될 데이터
 * 2. 수정 할 수 있는 모드일데 데이터가 위험하다
 *
 * XSS공격이란?
 *  - XSS는 Cross-Site Scripting의 약자로, 웹 애플리케이션에서 발생하는 보안 취약점 중 하나입니다.
 *    공격자는 사용자가 입력한 데이터를 악의적인 스크립트로 대체하여 다른 사용자들에게 실행되도록 함으로써 공격을 수행할 수 있습니다.
 *    이는 사용자의 정보를 탈취하거나 세션을 탈취하여 악용될 수 있습니다.
 * DOMPurify 라이브러리를 많이 사용한다.
 */

function LoginPage() {
  // useEffect(() => {
  //   redirect(newPath);

  //   const userInfo = setLogin(token);
  //   // ...로그인 로직
  // }, [token, newPath]);

  {/* ❌ */}
  useEffect(() => {
    redirect(newPath);
  }, [newPath]);

  
  useEffect(() => {
    const userInfo = setLogin(token);
    // ...로그인 로직
  }, [token]);

  {/* ❌ */}
  useEffect(async () => {
    // await is only allowed within async functions
    const result = await fetchData();
  }, []);

  {/* ✅ */}
  useEffect(() => {
    const fetchData = async () => {
      const result = await someFetch();
    };

    fetchData();
  }, []);
}
