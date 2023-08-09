import { useRef } from "react";
import { useCallback, useState } from "react";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
import "./App.css";

function createBulkTodos() {
  const array = [];
  for (let i = 0; i <= 6000; i++) {
    array.push({ id: i, text: `할일${i}`, checked: false });
  }

  return array;
}

function App() {
  const nextId = useRef(6001);
  const [todos, setTodos] = useState(createBulkTodos());

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };

    setTodos((todos) => todos.concat(todo));
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo))
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
