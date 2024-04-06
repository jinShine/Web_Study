import React from "react";

function Child(props) {
  console.log("자식이 렌더링 됩니다.");

  return <span>자식</span>;
}

export default React.memo(Child);
