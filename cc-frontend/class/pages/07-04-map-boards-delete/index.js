import { useQuery, gql, useMutation } from "@apollo/client";
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

const DELETE_BOARD = gql`
  mutation deleteBoard($number: Int) {
    deleteBoard(number: $number) {
      message
    }
  }
`;

const Row = styled.div`
  display: flex;
  height: 30px;
`;

const Column = styled.div`
  width: 25%;
`;

export default function staticRoutedPage() {
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = (e) => {
    deleteBoard({
      variables: {
        number: Number(e.target.id),
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  return (
    <>
      {data?.fetchBoards.map((el) => {
        return (
          <Row key={el.number}>
            <Column>
              <input type="checkbox" />
            </Column>
            <Column>{el.number}</Column>
            <Column>{el.title}</Column>
            <Column>
              <button id={el.number} onClick={onClickDelete}>
                삭제
              </button>
            </Column>
          </Row>
        );
      })}
    </>
  );
}
