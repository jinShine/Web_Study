import WebView from "react-native-webview";

const URL = "http://192.168.75.247:3000";

export default function LayoutHeaderTransparentPage() {
  return (
    <WebView
      source={{
        uri: `${URL}/section02/02-04-layout-header-transparent`,
      }}
    />
  );
}
``;
