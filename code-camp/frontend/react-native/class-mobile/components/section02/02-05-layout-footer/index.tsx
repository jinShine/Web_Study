import WebView from "react-native-webview";

const URL = "http://192.168.75.247:3000";

export default function LayoutFooterPage() {
  return (
    <WebView
      source={{
        uri: `${URL}/section02/02-05-layout-footer`,
      }}
    />
  );
}
``;
