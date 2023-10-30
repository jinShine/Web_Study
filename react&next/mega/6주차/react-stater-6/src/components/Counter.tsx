import useCounterStore from "../hooks/useCounterStore";

// Business Logic

// const state = {
//   count: 0,
// };

// function increase() {
//   state.count += 1;
// }

// UI

export default function Counter() {
  const store = useCounterStore();

  return <p>Count: {store.count}</p>;
}
