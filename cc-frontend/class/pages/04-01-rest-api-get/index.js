import axios from "axios";
import { useState } from "react";

export default function restAPIGetPage() {
  const [title, setTitle] = useState("");

  const onClickAsync = () => {
    // 비동기기 때문에 결과값이 바로 보이지 않고 pending 상태
    const result = axios.get("https://koreanjson.com/posts/1");
    console.log("#비동기", result);
  };
  const onCliCkSync = async () => {
    // 자바스크립트는 기본으로 비동기이기 때문에 async await을 사용해서 동기적으로 표현한다.
    // 그렇기 때문에 결과값을 바로 가져온다
    const result = await axios.get("https://koreanjson.com/posts/1");
    console.log("#동기", result);

    setTitle(result.data.title);
  };

  return (
    <div>
      <button onClick={onClickAsync}>Rest-API 요청하기(비동기)</button>
      <button onClick={onCliCkSync}>Rest-API 요청하기(동기)</button>
      <div>{title}</div>
    </div>
  );
}
