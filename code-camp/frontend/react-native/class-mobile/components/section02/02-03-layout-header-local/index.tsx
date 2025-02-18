import WebView from "react-native-webview";

const URL = "http://192.168.75.247:3000";

export default function LayoutHeaderLocalPage() {
  return (
    <WebView
      source={{
        uri: `${URL}/section02/02-03-layout-header-local`,
      }}
    />
  );
}
``;
