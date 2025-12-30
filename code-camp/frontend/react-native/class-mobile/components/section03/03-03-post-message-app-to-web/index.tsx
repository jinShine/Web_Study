import { useRef } from "react";
import { Button } from "react-native";
import WebView from "react-native-webview";

const URL = "http://192.168.75.247:3001";

export default function PostMessageAppToWebPage() {
  const webviewRef = useRef<WebView>(null);

  const onPressButton = () => {
    webviewRef.current?.postMessage("apple");
  };

  return (
    <>
      <WebView
        ref={webviewRef}
        source={{
          uri: `${URL}/section03/03-03-post-message-web-to-app`,
        }}
        onMessage={(event) => {
          if (!event.nativeEvent.data) return;

          console.log(event.nativeEvent.data);
        }}
      />

      <Button onPress={onPressButton} title="Mobile to Web 데이터 전송" />
    </>
  );
}
