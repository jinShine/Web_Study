import Link from "next/link";

export default function LayoutHeaderTransparentPage() {
  return (
    <div>
      <img src="https://picsum.photos/200" width={300} alt="img" />
      <Link href="/section02/02-04-layout-header-untransparent">
        비투명 헤더로 이동
      </Link>
    </div>
  );
}
