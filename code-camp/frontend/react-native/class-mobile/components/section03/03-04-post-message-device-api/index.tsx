import { useRef } from "react";
import { Button } from "react-native";
import WebView from "react-native-webview";

const URL = "http://192.168.220.120:3001";

export default function PostMessageDeviceApiPage() {
  const webviewRef = useRef<WebView>(null);

  return (
    <WebView
      ref={webviewRef}
      source={{
        uri: `${URL}/section03/03-04-post-message-device-api`,
      }}
      onMessage={(event) => {
        if (!event.nativeEvent.data) return;
        const response = JSON.parse(event.nativeEvent.data);
        console.log("@@@@@", response);

        switch (response.query) {
          case "fetchDeviceSystemForAppSet": {
            webviewRef.current?.postMessage(
              JSON.stringify({
                fetchDeviceSystemForAppSet: {
                  modelName: "v1.0",
                },
              })
            );
            break;
          }

          case "fetchDeviceSystemForPlatformSet": {
            webviewRef.current?.postMessage(
              JSON.stringify({
                fetchDeviceSystemForPlatformSet: {
                  modelName: "iPhone 7 Plus",
                },
              })
            );
            break;
          }

          case "fetchDeviceLocationInfoForLatLngSet": {
            webviewRef.current?.postMessage(
              JSON.stringify({
                fetchDeviceLocationInfoForLatLngSet: {
                  latitude: 37.498095,
                  longitude: 126.854614,
                },
              })
            );
            break;
          }
        }

        // console.log(event.nativeEvent.data);

        // webviewRef.current?.postMessage("1");
      }}
    />
  );
}
