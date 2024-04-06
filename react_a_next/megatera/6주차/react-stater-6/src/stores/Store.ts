import { singleton } from "tsyringe";
import BaseStore from "./BaseStore";

const initialState = {
  count: 0,
};

@singleton()
export default class Store extends BaseStore {
  construct() {
    super(initialState);

    this.state = {
      count: 0,
    };

    this.reducer = (state, action) => {
      switch (action.type) {
        case "increase":
          return {
            ...state,
            count: state.count + 1,
          };
        default:
          return state;
      }
    };
  }
}
