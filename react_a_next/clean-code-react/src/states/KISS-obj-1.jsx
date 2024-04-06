// Keep Is Simple Stupid

import { useState } from "react";

// 연관 되어 있는 상태 단순화 하기
const PROMISE_STATE = {
  INIT: "init",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

function KISS() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [isFinished, setIsFinished] = useState(false);

  const [promiseState, setPromiseState] = useState(PROMISE_STATE.INIT);

  const fetchData = () => {
    setPromiseState(PROMISE_STATE.LOADING);

    fetch(url)
      .then(() => {
        setPromiseState(PROMISE_STATE.SUCCESS);
      })
      .catch(() => {
        setPromiseState(PROMISE_STATE.ERROR);
      });
  };

  if (promiseState === PROMISE_STATE.LOADING) {
  }
  if (promiseState === PROMISE_STATE.SUCCESS) {
  }
  if (promiseState === PROMISE_STATE.ERROR) {
  }

  return <></>;
}
