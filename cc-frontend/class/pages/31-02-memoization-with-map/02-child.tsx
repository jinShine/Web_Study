import React from "react";

function Word(props) {
  console.log("자식이 렌더링 됩니다.");

  return <span>{props.el}</span>;
}

// 컴포넌트 단위의 메모이제이션 방법
// 변경된 Props가 넘어오면 리렌더링 된다!
export default React.memo(Word);
// export default Word;
