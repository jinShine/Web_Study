import React from "react";
import { GridLoader } from "react-spinners";

const ErrorMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <GridLoader color="red" />
      <div>Oops!</div>
      <div>잠시 후 다시 확인해주세요...</div>
    </div>
  );
};

export default ErrorMessage;
