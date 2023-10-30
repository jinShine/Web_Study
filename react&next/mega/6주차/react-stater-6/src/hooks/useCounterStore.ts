import { useEffect } from "react";
import { container } from "tsyringe";
import CounterStore from "../stores/CounterStore";
import useForceUpdate from "./useForceUpdate";

export default function useCounterStore() {
  const store = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    store.addListener(forceUpdate);

    return () => {
      store.removeListener(forceUpdate);
    };
  }, [store, forceUpdate]);

  return store;
}
