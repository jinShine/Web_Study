"use client";

import { useDeviceSetting } from "@/commons/settings/03-06-device-setting/hooks";

const MESSAGE_API_PROMISE = {};

export declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

export default function PostMessageDeviceApiPromiseRefactoringPage() {
  const { fetchApp } = useDeviceSetting();

  const onClickSystemVersionInfo = async () => {
    const result = await fetchApp({ query: "fetchDeviceSystemForAppSet" });

    alert(result.data.fetchDeviceSystemForAppSet.appVersion);
  };
  const onClickDeviceInfo = async () => {
    const result = await fetchApp({ query: "fetchDeviceSystemForPlatformSet" });

    alert(result.data.fetchDeviceSystemForPlatformSet.modelName);
  };
  const onClickLocationInfo = async () => {
    const result = await fetchApp({
      query: "fetchDeviceLocationInfoForLatLngSet",
    });

    alert(result.data.fetchDeviceLocationInfoForLatLngSet.latitude);
  };

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
