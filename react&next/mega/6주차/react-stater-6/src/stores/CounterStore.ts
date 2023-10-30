import { singleton } from "tsyringe";

type Listener = () => void;

@singleton()
export default class CounterStore {
  count = 0;

  listners = new Set<Listener>();

  increase() {
    this.count += 1;
    this.publish();
  }

  decrease() {
    this.count -= 1;
    this.publish();
  }

  publish() {
    this.listners.forEach((listner) => {
      listner();
    });
  }

  addListener(listner: Listener) {
    this.listners.add(listner);
  }

  removeListener(listener: Listener) {
    this.listners.delete(listener);
  }
}
