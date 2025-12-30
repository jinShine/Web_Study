"use client";

import { useEffect } from "react";

export declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

export default function PostMessageDeviceApiPage() {
  const onClickSystemVersionInfo = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        query: "fetchDeviceSystemForAppSet",
      })
    );
  };
  const onClickDeviceInfo = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        query: "fetchDeviceSystemForPlatformSet",
      })
    );
  };
  const onClickLocationInfo = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        query: "fetchDeviceLocationInfoForLatLngSet",
      })
    );
  };

  useEffect(() => {
    document.addEventListener("message", (message) => {
      console.log(message.data);
    });

    window.addEventListener("message", (message) => {
      console.log(message.data);
    });
  }, []);

  return (
    <>
      <button onClick={onClickSystemVersionInfo}>
        핸드폰 버전 정보 권한 요청
      </button>
      <button onClick={onClickDeviceInfo}>핸드폰 기종 정보 권한 요청</button>
      <button onClick={onClickLocationInfo}>핸드폰 위치 정보 권한 요청</button>
    </>
  );
}
