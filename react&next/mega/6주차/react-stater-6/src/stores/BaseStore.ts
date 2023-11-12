import { Reducer } from "react";

type Action = {
  type: string;
};

type Reducer<State> = (state: State, action: Action) => State;

type Listener = () => void;

export default class BaseStore<State> {
  state: State;

  reducer: Reducer<State>;

  constructor(initialState: State, reducer: Reducer<State>) {
    this.state = initialState;
    this.reducer = reducer;
  }

  listners = new Set<Listener>();

  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
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
