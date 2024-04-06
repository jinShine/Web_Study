import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import BoardDetailUI from "./BoardDetail.presenter";
import { FETCH_PRODUCT } from "./BoardDetail.queries";

export default function BoardDetail() {
  const { query } = useRouter();
  const { data } = useQuery(FETCH_PRODUCT, {
    variables: {
      productId: query.boardId,
    },
  });

  return (
    <>
      <BoardDetailUI data={data} />
    </>
  );
}
