// src/App.js

import React from "react";
import { useSelector, useDispatch } from "react-redux"; // import 해주세요.
import { incrementCount, decrementCount } from "./redux/modules/counter";

const App = () => {
  const counterStore = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <div>{counterStore.number}</div>
      <button
        onClick={() => {
          dispatch(incrementCount(3));
        }}
      >
        PLUS
      </button>

      <button
        onClick={() => {
          dispatch(decrementCount(2));
        }}
      >
        MINUS
      </button>
    </div>
  );
};

export default App;
