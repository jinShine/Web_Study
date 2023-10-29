import { useState } from "react";
import Greeting from "./components/Greeting";

export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <Greeting name="버즈" />
      <img src="/images/profile_image.jpg" alt="" />
      <p>Hello, world! {count}</p>
      <button onClick={handleClick}>클릭</button>
    </div>
  );
}
