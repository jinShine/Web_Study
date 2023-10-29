// type CounterProps = {};

import useForceUpdate from "../hooks/useForceUpdate";

// Business Logic

const state = {
  count: 0,
};

function increase() {
  state.count += 1;
}

// UI

export default function Counter() {
  const forceUpdate = useForceUpdate();

  // const [ignored, forceUpdate] = useReducer(reducer, 0);

  const handleClick = () => {
    // setCount(count + 1);
    increase();
    forceUpdate();
  };

  return (
    <>
      <p>{state.count}</p>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </>
  );
}
