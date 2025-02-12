import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const FETCH_BOARD = gql`
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      writer
      title
      contents
    }
  }
`;
export default function dynamicRoutedBoardPage() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      number: Number(router.query.number),
    },
  });

  console.log(data);

  const onClickBack = () => {
    router.back();
  };

  return (
    <>
      <div>1번 페이지 이동이 완료되었습니다.</div>
      {/* 
        조건부 렌더링

        1. data ? data.fetchBoard.writer : "로딩중 ... "
        2. data && data.fetchBoard.writer 
        1. data?.fetchBoard.writer  ***** 가장 많이 사용
      */}
      <div>작성자: {data?.fetchBoard.writer}</div>
      <div>제목: {data && data.fetchBoard.title}</div>
      <div>내용: {data && data.fetchBoard.contents}</div>
      <button onClick={onClickBack}>이전 화면으로</button>
    </>
  );
}
