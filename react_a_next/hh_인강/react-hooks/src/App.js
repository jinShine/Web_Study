import logo from "./logo.svg";
import "./App.css";
import { Counter } from "./1_UseState";
import { Info } from "./2_UseEffect";
import { useState } from "react";
import { UseReducerPrac } from "./3_UseReducer";
import { UseMemoPrac } from "./4_UseMemo";
import { UseCallbackPrac } from "./5_UseCallback";
import { UseRefPrac } from "./6_UseRef";
import Info2 from "./7_CustomHook";

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{visible ? "숨기기" : "보이기"}</button>
      <hr></hr>
      {visible && (
        <div>
          <Counter />
          <Info />
          <UseReducerPrac />
          <UseMemoPrac />
          <UseCallbackPrac />
          <UseRefPrac />
          <Info2 />
        </div>
      )}
    </div>
  );
}

export default App;
