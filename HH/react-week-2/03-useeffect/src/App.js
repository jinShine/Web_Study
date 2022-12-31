import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // useEffect는 DOM이 변경된 이후에 해당 effect함수를 실행하기 때문에 count라는 state에 접근할 수 있다.
    document.title = `${count}번 렌더링됨`;
  }, [count]);

  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      console.log(`KEYPRESS : ${e.code}`);
    });
    return () => {
      // clean up
      window.removeEventListener("keypress", () => console.log("언마운트"));
    };
  });

  return (
    <div className="App">
      <div>{count}</div>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        버튼
      </button>
    </div>
  );
}

export default App;
