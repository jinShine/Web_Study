import { useApis } from "@/apis/section03/03-06-post-message-device-api-promise-refactoring";
import { useRef } from "react";
import WebView from "react-native-webview";

const URL = "http://192.168.75.247:3001";

export default function PostMessageDeviceApiPromiseRefactoringPage() {
  const webviewRef = useRef<WebView>(null);

  const { onRequest } = useApis(webviewRef);

  return (
    <WebView
      ref={webviewRef}
      source={{
        uri: `${URL}/section03/03-06-post-message-device-api-promise-refactoring`,
      }}
      onMessage={(event) => {
        if (!event.nativeEvent.data) return;
        const request = JSON.parse(event.nativeEvent.data);

        onRequest(request.query);
      }}
    />
  );
}
