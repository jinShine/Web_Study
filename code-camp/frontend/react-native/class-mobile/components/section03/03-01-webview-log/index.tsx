import { Button } from "react-native";
import WebView from "react-native-webview";

const URL = "http://192.168.220.120:3001";

export default function WebviewLogPage() {
  const onPress = () => {
    console.log("로그 출력");
  };

  return (
    <>
      <WebView
        source={{
          uri: `${URL}/section03/03-01-webview-log`,
        }}
      />

      <Button title="로그 출력" onPress={onPress} />
    </>
  );
}
