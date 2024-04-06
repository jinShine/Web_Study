import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import DOMPurify from "dompurify";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
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
      boardId: router.query.id,
    },
  });

  console.log(data);

  return (
    <>
      <div style={{ color: "red" }}>작성자: {data?.fetchBoard.writer}</div>
      <div style={{ color: "green" }}>
        제목: {data && data.fetchBoard.title}
      </div>
      {/* <div>내용: {data && data.fetchBoard.contents}</div> */}
      {/** HTML코드 자체로 넣을 수 있다!! */}
      {/* <div
        dangerouslySetInnerHTML={{ __html: data?.fetchBoard.contents }}
      ></div> */}
      {typeof window !== "undefined" ? (
        <div
          style={{ color: "blue " }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.fetchBoard.contents),
          }}
        ></div>
      ) : (
        <div style={{ color: "blue" }}></div>
      )}
      <div style={{ color: "yellow" }}>주소: 구로구</div>
    </>
  );
}

// 6412bc361182750028ee7c71

// playground XSS 공격
// <img src='#' onerror='console.log(localStorage.getItem(\"accessToken\"))' />
