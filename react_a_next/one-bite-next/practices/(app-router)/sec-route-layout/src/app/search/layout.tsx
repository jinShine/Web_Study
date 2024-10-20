import { useState } from "react";
import SearchBar from "../searchbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const secretKey = "123123";

  console.log("@@@@@ search layout", secretKey); //서버 컴포넌트에서만 찍히게 된다.

  return (
    <div>
      <SearchBar />
      <div>{children}</div>
    </div>
  );
}
