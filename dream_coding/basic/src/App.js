import "./App.css";

function App() {
  const name = "버즈";
  const fruits = ["사과", "배", "바나나"];

  return (
    <>
      <h1 className="title">{name}</h1>
      <ul>
        {fruits.map((fruit) => (
          <li>{fruit}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
