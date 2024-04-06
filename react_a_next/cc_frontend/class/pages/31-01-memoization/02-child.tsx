import React from "react";

function MemoizationChildPage(props) {
  console.log("자식이 렌더링 됩니다.");

  return (
    <>
      <div>=====================</div>
      <h1>자식 컴포넌트 입니다.</h1>
      <div>=====================</div>
    </>
  );
}

// 컴포넌트 단위의 메모이제이션 방법
// 변경된 Props가 넘어오면 리렌더링 된다!
export default React.memo(MemoizationChildPage);
