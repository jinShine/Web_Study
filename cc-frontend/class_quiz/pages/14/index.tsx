import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Pagenation } from "../../src/components/commons/pagination";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

export default function Page() {
  const [startPage, setStartPage] = useState(1);

  const { data: dataBoard, refetch } = useQuery(FETCH_BOARDS);
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);

  return (
    <>
      {dataBoard?.fetchBoards.map((el) => {
        return (
          <div key={el._id}>
            <span>{el.writer}</span>
            <span>{el.title}</span>
            <span>{el.contents}</span>
          </div>
        );
      })}
      <Pagenation
        refetch={refetch}
        startPage={startPage}
        setStartPage={setStartPage}
        count={dataBoardsCount?.fetchBoardsCount}
      />
    </>
  );
}
