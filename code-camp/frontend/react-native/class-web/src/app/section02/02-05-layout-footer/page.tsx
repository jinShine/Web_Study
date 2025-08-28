"use client";

import { Footer } from "@/commons/layout/02-05-layout-footer/footer";
import { useState } from "react";

export default function LayoutFooterPage() {
  const [isLongContent, setIsLongContent] = useState(false);

  const onClickToggle = () => {
    setIsLongContent((prev) => !prev);
  };

  return (
    <>
      <main>
        <button onClick={onClickToggle}>[숏컨텐츠]</button>
        <br />
        제목: <input type="text" />
        <br />
        내용: <input type="text" />
        <br />
        {isLongContent &&
          new Array(10)
            .fill(1)
            .map((_, index) => <div key={index}>{index}</div>)}
      </main>

      <Footer>
        <button>등록하기</button>
      </Footer>
    </>
  );
}
