import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useEffect } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      number
      writer
      title
      contents
    }
  }
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 25%;
`;

export default function staticRoutedPage() {
  const { data } = useQuery(FETCH_BOARDS);

  return (
    <>
      {data?.fetchBoards.map((el) => {
        return (
          <Row>
            <Column>
              <input type="checkbox" />
            </Column>
            <Column>{el.number}</Column>
            <Column>{el.title}</Column>
          </Row>
        );
      })}
    </>
  );
}
