// components/Button.js

import React from "react";
import { memo } from "react";

const Button = ({ onClick }) => {
  console.log("Button : 리렌더링되고 있어요.");
  return <button onClick={onClick}>버튼</button>;
};

export default memo(Button);
