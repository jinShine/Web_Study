//App.jsx

import React, { useState, useCallback, useMemo } from "react";
import Button from "./components/Button";
import List from "./components/List";

const App = () => {
  const [value, setValue] = useState("");

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };
  const onClickHandler = useCallback(() => {
    console.log("Hello button");
  }, []);

  const data = useMemo(() => {
    return [
      {
        id: 1,
        title: "react",
      },
    ];
  }, []);

  return (
    <div>
      <input type="text" value={value} onChange={onChangeHandler} />
      <Button onClick={onClickHandler} />
      <List data={data} />
    </div>
  );
};

export default App;
