import { useId, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Child() {
  const id = useId();
  return <div>{` Child id : ${id}`}</div>;
}

function SubChild() {
  const id = useId();
  return <div>{` SubChild id : ${id}`}</div>;
}

function App() {
  const id = useId();

  return (
    <>
      return <div>{` App id : ${id}`}</div>;
      <Child />
      <Child />
      <SubChild />
      <SubChild />
    </>
  );
}

export default App;
