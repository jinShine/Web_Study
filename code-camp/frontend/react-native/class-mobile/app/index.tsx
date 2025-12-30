// [Section01]
// import HelloWorldPage from "@/components/seciton01/01-01-hello-world";
// import ReactNativeTagsPage from "@/components/seciton01/01-02-react-native-tag";
import WebViewPage from "@/components/seciton01/01-03-webview";
import WebViewWithNextjsPage from "@/components/seciton01/01-04-webview-with-nextjs";
import WebViewInternetFailPage from "@/components/seciton01/01-05-webview-internet-fail";

// [Section02]
import LayoutHeaderGlobalPage from "@/components/section02/02-02-layout-header-global";
import LayoutHeaderLocalPage from "@/components/section02/02-03-layout-header-local";
import LayoutHeaderTransparentPage from "@/components/section02/02-04-layout-header-transparent";
import LayoutFooterPage from "@/components/section02/02-05-layout-footer";

// [Section03];
import WebviewLogPage from "@/components/section03/03-01-webview-log";
import PostMessageWebToAppPage from "@/components/section03/03-02-post-message-web-to-app";
import PostMessageAppToWebPage from "@/components/section03/03-03-post-message-app-to-web";
import PostMessageDeviceApiPage from "@/components/section03/03-04-post-message-device-api";
import PostMessageDeviceApiPromisePage from "@/components/section03/03-05-post-message-device-api-promise";
import PostMessageDeviceApiPromiseRefactoringPage from "@/components/section03/03-06-post-message-device-api-promise-refactoring";

import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexPage() {
  return (
    <SafeAreaView style={{ flex: 1, top: 0, bottom: 0, left: 0, right: 0 }}>
      {/* <HelloWorldPage /> */}
      {/* <ReactNativeTagsPage /> */}
      {/* <WebViewPage /> */}
      {/* <WebViewWithNextjsPage /> */}
      {/* <WebViewInternetFailPage /> */}
      {/* <LayoutHeaderGlobalPage /> */}
      {/* <LayoutHeaderLocalPage /> */}
      {/* <LayoutHeaderTransparentPage /> */}
      {/* <LayoutFooterPage /> */}
      {/* <WebviewLogPage /> */}
      {/* <PostMessageWebToAppPage /> */}
      {/* <PostMessageAppToWebPage /> */}
      {/* <PostMessageDeviceApiPage /> */}
      {/* <PostMessageDeviceApiPromisePage /> */}
      <PostMessageDeviceApiPromiseRefactoringPage />
    </SafeAreaView>
  );
}
