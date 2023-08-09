import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __addNumber, __minusNumber } from "./redux/modules/counterSlice";

const App = () => {
  const [number, setNumber] = useState(0);
  const globalNumber = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setNumber(value + 1);
  };
  const onClickAddNumberHandler = () => {
    dispatch(__addNumber(number));
  };
  const onClickMinusNumberHandler = () => {
    dispatch(__minusNumber(number));
  };

  return (
    <div>
      <div>{globalNumber}</div>
      <input type="number" onChange={onChangeHandler} />
      <button onClick={onClickAddNumberHandler}>PLUS</button>
      <button onClick={onClickMinusNumberHandler}>MINUS</button>
    </div>
  );
};

export default App;
