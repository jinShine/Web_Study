// Keep Is Simple Stupid

import { useState } from "react";

// 연관 되어 있는 상태 단순화 하기
function KISS() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [isFinished, setIsFinished] = useState(false);

  const [fetchState, setFetchState] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const fetchData = () => {
    setFetchState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    fetch(url)
      .then(() => {
        setFetchState((prevState) => ({
          ...prevState,
          isSuccess: true,
        }));
      })
      .catch(() => {
        setFetchState((prevState) => ({
          ...prevState,
          isError: true,
        }));
      });
  };

  if (fetchState.isLoading) {
  }
  if (fetchState.isSuccess) {
  }
  if (fetchState.isError) {
  }

  return <></>;
}
