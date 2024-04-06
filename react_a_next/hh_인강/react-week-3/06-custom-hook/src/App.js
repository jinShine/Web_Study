// src/App.jsx

import React from "react";
import { useState } from "react";
import useInput from "./hooks/useInput";

const App = () => {
  // input의 갯수가 늘어날때마다 state와 handler가 같이 증가한다.
  // const [title, setTitle] = useState("");
  // const onChangeTitleHandler = (e) => {
  //   setTitle(e.target.value);
  // };

  // input의 갯수가 늘어날때마다 state와 handler가 같이 증가한다.
  // const [body, setBody] = useState("");
  // const onChangeBodyHandler = (e) => {
  //   setBody(e.target.value);
  // };

  const [title, onChangeTitleHandler] = useInput("");
  const [body, onChangeBodyHandler] = useInput("");

  return (
    <div>
      <input
        type="text"
        name="title"
        value={title}
        onChange={onChangeTitleHandler}
      />
      <input
        type="text"
        name="title"
        value={body}
        onChange={onChangeBodyHandler}
      />
    </div>
  );
};

export default App;
