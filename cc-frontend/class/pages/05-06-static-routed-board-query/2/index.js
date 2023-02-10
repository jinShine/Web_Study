import { useRouter } from "next/router";

export default function staticRoutedPage() {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  return (
    <>
      <div>2번 페이지 이동이 완료되었습니다.</div>
      <button onClick={onClickBack}>이전 화면으로</button>
    </>
  );
}
