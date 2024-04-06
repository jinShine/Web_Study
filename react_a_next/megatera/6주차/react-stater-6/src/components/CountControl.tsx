import { container } from "tsyringe";
import CounterStore from "../stores/CounterStore";

export default function CountControl() {
  const store = container.resolve(CounterStore);

  const handleIncrease = () => {
    store.increase();
  };

  const handleDecrease = () => {
    store.decrease();
  };

  return (
    <>
      <button type="button" onClick={handleIncrease}>
        Increase
      </button>
      <button type="button" onClick={handleDecrease}>
        Decrease
      </button>
    </>
  );
}
