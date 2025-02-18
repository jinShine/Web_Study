"use client";

import { webviewlog } from "@/components/libraries/03-01-webview-log";

export default function WebviewLogPage() {
  const onClickButton = () => {
    webviewlog("웹뷰 버튼 클릭");
  };

  return <button onClick={onClickButton}>웹뷰 버튼</button>;
}
