import { useState } from "react";
import "./App.css";

function App() {
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onPointerMove = (e) => {
    console.log(e.clientX, e.clientY);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="container" onPointerMove={onPointerMove}>
      <div
        className="pointer"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
    </div>
  );
}

export default App;
