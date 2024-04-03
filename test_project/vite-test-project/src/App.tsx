import { useEffect, useId, useState } from "react";
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

interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "wooman",
  age: 20,
};

function name(person: Person) {
  return `${person.name}`;
}

class Developer {
  name: string;
  sleepingTime: number;

  constructor(name: string, sleepingTime: number) {
    this.name = name;
    this.sleepingTime = sleepingTime;
  }
}

const developer = new Developer("wooman", 10); // 값은 "function"
console.log("instanceof", developer instanceof Developer); // true

if (developer instanceof Developer) {
  developer.name;
  developer.sleepingTime;
}

function App() {
  const id = useId();

  useEffect(() => {
    typeof 2022; // "number"
    typeof "wooman"; // "string"
    typeof true; // "boolean"
    typeof {}; // "object"
    const v1 = typeof person; // "object"
    const v2 = typeof name; // "function"

    console.log("@@@@@@2", v1);
    console.log("@@@@@@2", v2);

    type T1 = typeof person; // 타입은 Person
    type T2 = typeof name; // 타입은 (person: Person) => void
  }, []);

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
