"use client";

import { Header } from "@/components/layout/02-03-layout-header-local/header";
import { useEffect, useState } from "react";

export default function LayoutHeaderLocalPage() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const result = "디테일 페이지";
      setTitle(result);
    }, 3000);
  }, []);
  return (
    <div>
      <Header title={title}>
        검색하기: <input />
      </Header>
      <div>내용 1</div>
      <div>내용 2</div>
      <div>내용 3</div>
      <div>내용 4</div>
      <div>내용 5</div>
    </div>
  );
}
