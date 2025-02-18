"use client";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

export default function PostMessageWebToAppPage() {
  const onClickButton = () => {
    window.ReactNativeWebView.postMessage("banana");
  };

  return <button onClick={onClickButton}>Web to Mobile 데이터 전송</button>;
}
