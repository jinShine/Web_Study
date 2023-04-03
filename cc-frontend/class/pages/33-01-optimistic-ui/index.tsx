import { gql, useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationLikeBoardArgs,
  IQuery,
} from "../../src/commons/types/generated/types";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      likeCount
    }
  }
`;

const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export default function OptimisticUIPage() {
  const { data } = useQuery<Pick<IQuery, "fetchBoard">>(FETCH_BOARD, {
    variables: { boardId: "64223db51182750028ee8569" },
  });

  const [likeBoard] = useMutation<
    Pick<IMutation, "likeBoard">,
    IMutationLikeBoardArgs
  >(LIKE_BOARD);

  // test board id = 64223db51182750028ee8569
  const onClickLike = () => {
    void likeBoard({
      variables: { boardId: "64223db51182750028ee8569" },
      //   refetchQueries: [
      //     { query: FETCH_BOARD, variables: { boardId: "하드코딩하기" } },
      //   ],
      optimisticResponse: {
        likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
      },
      update(cache, { data }) {
        cache.writeQuery({
          query: FETCH_BOARD,
          variables: { boardId: "64223db51182750028ee8569" },
          data: {
            fetchBoard: {
              _id: "64223db51182750028ee8569",
              __typename: "Board",
              likeCount: data?.likeBoard,
            },
          },
        });
      },
    });
  };

  return (
    <>
      <div>현재 카운트(좋아요): {data?.fetchBoard.likeCount}</div>
      <button onClick={onClickLike}>좋아요 올리기</button>
    </>
  );
}
