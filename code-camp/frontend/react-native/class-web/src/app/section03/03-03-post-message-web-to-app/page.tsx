"use client";

import { useEffect, useState } from "react";

export default function PostMessageAppToWebPage() {
  const [message, setMessage] = useState();

  useEffect(() => {
    // 1. 안드로이드에서 수신 대기 방법
    document.addEventListener("message", (message) => {
      // alert(message.data);
      console.log(message.data);
      setMessage(message.data);
    });

    // 2. iOS에서 수신 대기 방법
    window.addEventListener("message", (message) => {
      // alert(message.data);
      console.log(message.data);
      setMessage(message.data);
    });
  }, []);

  return (
    <>
      <div>{message || "메시지가 없습니다."}</div>
    </>
  );
}
