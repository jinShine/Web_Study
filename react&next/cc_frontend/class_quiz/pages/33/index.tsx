import { gql, useMutation, useQuery } from "@apollo/client";
import { IMutation, IMutationLikeBoardArgs, IQuery } from "../../src/commons/types/generated/types";

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
  const boardId = "64223db51182750028ee8569";

  const { data } = useQuery<Pick<IQuery, "fetchBoard">>(FETCH_BOARD, {
    variables: { boardId: "64223db51182750028ee8569" },
  });

  const [likeBoard] = useMutation<Pick<IMutation, "likeBoard">, IMutationLikeBoardArgs>(LIKE_BOARD);

  const onClickLike = () => {
    /////////////////////////////////
    // 1. refetchQueries 방법
    // void likeBoard({
    //   variables: { boardId },
    //   refetchQueries: [{ query: FETCH_BOARD, variables: { boardId } }],
    // });

    /////////////////////////////////
    // 2. optimistic-ui 방법
    void likeBoard({
      variables: { boardId },
      optimisticResponse: { likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1 },
      update(cache, { data }) {
        console.log("#1", cache);
        console.log("#2", data);
        cache.writeQuery({
          query: FETCH_BOARD,
          variables: { boardId },
          data: {
            fetchBoard: {
              _id: boardId,
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
