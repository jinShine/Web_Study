import WebView from "react-native-webview";

const URL = "http://192.168.220.120:3001";

export default function PostMessageWebToAppPage() {
  return (
    <WebView
      source={{
        uri: `${URL}/section03/03-02-post-message-web-to-app`,
      }}
      onMessage={(event) => {
        if (!event.nativeEvent.data) return;

        console.log(event.nativeEvent.data);
      }}
    />
  );
}
