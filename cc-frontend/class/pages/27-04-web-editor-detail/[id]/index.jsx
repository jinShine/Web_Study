import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
// import * as DOMPurify from "dompurify";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
    }
  }
`;

const Dompurify = dynamic(async () => await import("dompurify"), {
  ssr: false,
});

export default function dynamicRoutedBoardPage() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: router.query.id,
    },
  });

  console.log(data);

  return (
    <>
      <div>작성자: {data?.fetchBoard.writer}</div>
      <div>제목: {data && data.fetchBoard.title}</div>
      {/* <div>내용: {data && data.fetchBoard.contents}</div> */}

      {/** HTML코드 자체로 넣을 수 있다!! */}
      {/* <div
        dangerouslySetInnerHTML={{ __html: data?.fetchBoard.contents }}
      ></div> */}
      {typeof window !== "undefined" && (
        <div
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(data?.fetchBoard.contents),
          }}
        ></div>
      )}

      {/* <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data?.fetchBoard.contents),
        }}
      ></div> */}
    </>
  );
}

// playground XSS 공격
// <img src='#' onerror='console.log(localStorage.getItem(\"accessToken\"))' />
