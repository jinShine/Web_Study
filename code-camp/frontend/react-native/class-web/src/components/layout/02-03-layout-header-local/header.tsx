"use client";

import { useParams, usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "./constants";

export default function HeaderGlobal() {
  const pathname = usePathname();
  const params = useParams();
  const options = HEADER_OPTIONS(params).GLOBAL[pathname];

  return (
    <div style={{ display: options ? "block" : "none" }}>
      <HeaderBase {...options} />
    </div>
  );
}

export function Header({ children, ...rest }) {
  const pathname = usePathname();
  const params = useParams();
  const options = HEADER_OPTIONS(params).LOCAL[pathname];

  return (
    <div style={{ display: options ? "block" : "none" }}>
      {/* <header
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
        {title && <div>{title}</div>}
      </header> */}
      <HeaderBase {...options} {...rest}>
        {children}
      </HeaderBase>
    </div>
  );
}

const HeaderBase = ({
  children,
  hasLogo,
  hasBack,
  title,
}: {
  children?: React.ReactNode;
  hasLogo: boolean;
  hasBack: boolean;
  title?: string;
}) => {
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
      {hasLogo && <div>로고</div>}
      {hasBack && <div>뒤로가기버튼</div>}
      {title && <div>{title}</div>}
      {children && children}
    </header>
  );
};
