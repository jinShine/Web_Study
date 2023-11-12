import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

type Listener = () => void;

@singleton()
@Store()
export default class CounterStore {
  count = 0;

  listners = new Set<Listener>();

  @Action()
  increase() {
    this.count += 1;
  }

  @Action()
  decrease() {
    this.count -= 1;
  }
}
