import { useEffect, useState } from "react";
import WebView from "react-native-webview";

import NetInfo from "@react-native-community/netinfo";
import { Text, View } from "react-native";

export default function WebViewInternetFailPage() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      console.log(state);
      setIsConnected(state.isConnected || false);
    });
  }, []);

  if (!isConnected) {
    return (
      <View>
        <Text>인터넷 연결을 해주세요!</Text>
      </View>
    );
  }

  return (
    <WebView
      source={{
        uri: "http://192.168.75.247:3000/section01/01-05-webview-internet-fail",
      }}
    />
  );
}
