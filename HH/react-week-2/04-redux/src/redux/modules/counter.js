// src/modules/counter.js

const INCREMENT_COUNT = "INCREMENT_COUNT";
const DECREMENT_COUNT = "DECREMENT_COUNT";

// Action Creator
export const incrementCount = (value = 1) => {
  return {
    type: INCREMENT_COUNT,
    payload: { incrementValue: value },
  };
};

export const decrementCount = (value = 1) => {
  return {
    type: DECREMENT_COUNT,
    payload: { incrementValue: value },
  };
};

// 초기 상태값
const initialState = { number: 0 };

// 리듀서
const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return { ...state, number: state.number + action.payload.incrementValue };
    case DECREMENT_COUNT:
      return { ...state, number: state.number - action.payload.incrementValue };
    default:
      return state;
  }
};

// 모듈파일에서는 리듀서를 export default 한다.
export default counter;
