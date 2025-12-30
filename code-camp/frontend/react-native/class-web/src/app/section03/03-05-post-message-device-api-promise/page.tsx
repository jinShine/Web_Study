"use client";

import { Resolver } from "dns";
import { useEffect } from "react";

const MESSAGE_API_PROMISE = {};

export declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

export default function PostMessageDeviceApiPromisePage() {
  const onClickSystemVersionInfo = () => {
    const result = new Promise((resolve) => {
      MESSAGE_API_PROMISE.fetchDeviceSystemForAppSet = resolve;

      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          query: "fetchDeviceSystemForAppSet",
        })
      );
    });

    alert(result.data.fetchDeviceSystemForAppSet.appVersion);
  };
  const onClickDeviceInfo = () => {
    const result = new Promise((resover) => {
      MESSAGE_API_PROMISE.fetchDeviceSystemForPlatformSet = resover;

      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          query: "fetchDeviceSystemForPlatformSet",
        })
      );
    });

    alert(result.data.fetchDeviceSystemForPlatformSet.modelName);
  };
  const onClickLocationInfo = () => {
    const result = new Promise((resover) => {
      MESSAGE_API_PROMISE.fetchDeviceLocationInfoForLatLngSet = resover;

      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          query: "fetchDeviceLocationInfoForLatLngSet",
        })
      );
    });

    alert(result.data.fetchDeviceLocationInfoForLatLngSet.latitude);
  };

  useEffect(async () => {
    document.addEventListener("message", (message) => {
      const response = JSON.parse(message.data);
      const query = Object.keys(response)[0];
      const resolve = MESSAGE_API_PROMISE[query];
      resolve({ data: response });
      delete MESSAGE_API_PROMISE[query];
    });

    window.addEventListener("message", (message) => {
      const response = JSON.parse(message.data);
      const query = Object.keys(response)[0];
      const resolve = MESSAGE_API_PROMISE[query];
      resolve({ data: response });
      delete MESSAGE_API_PROMISE[query];
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
