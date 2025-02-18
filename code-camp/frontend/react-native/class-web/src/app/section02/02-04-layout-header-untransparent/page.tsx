import Link from "next/link";

export default function LayoutHeaderUnTransparentPage() {
  return (
    <div>
      <div>내용입니다!</div>
      <div>내용입니다!</div>
      <div>내용입니다!</div>
      <div>내용입니다!</div>
      <div>내용입니다!</div>
      <Link href="/section02/02-04-layout-header-transparent">
        투명 헤더로 이동
      </Link>
    </div>
  );
}
