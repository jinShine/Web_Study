// src/components/List.jsx

import React, { memo } from "react";

const List = ({ data }) => {
  console.log("List : 리렌더링되고 있어요.");
  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
};

export default memo(List);
