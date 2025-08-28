"use client";

import { usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "./constants";

export default function HeaderGlobal() {
  const pathname = usePathname();
  const headerOptions =
    HEADER_OPTIONS.GLOBAL[pathname as keyof typeof HEADER_OPTIONS.GLOBAL];

  return (
    <header
      style={{
        display: "flex",
        width: "100vw",
        height: "3.125rem",
        backgroundColor: "yellow",
        gap: "0.3125rem",
      }}
    >
      {headerOptions.hasLogo && <div>로고</div>}
      {headerOptions.hasBack && <div>뒤로가기버튼</div>}
      {headerOptions.title && <div>{headerOptions.title}</div>}
    </header>
  );
}
