import WebView from "react-native-webview";

export default function WebViewWithNextjsPage() {
  return (
    <WebView
      source={{
        uri: "http://192.168.75.247:3000/section01/01-04-webview-with-nextjs",
      }}
    />
  );
}
