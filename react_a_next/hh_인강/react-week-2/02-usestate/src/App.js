import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <div>{number}</div>
      <button
        onClick={() => {
          // 3번을 업데이트해도 1번만 실행됨
          // batch로 처리되기 떄문에 명령들을 모아서 한번만 실행한다.
          // setNumber(number + 1)
          // setNumber(number + 1)
          // setNumber(number + 1)

          // 함수형으로 업데이트하면 명령들을 모아서 순차적으로 실행한다.
          // 함수형으로 처리하면 이전값을 가져올 수 있다.
          setNumber((prev) => prev + 1);
          setNumber((prev) => prev + 1);
          setNumber((prev) => prev + 1);
        }}
      >
        버튼
      </button>
    </div>
  );
}

export default App;
