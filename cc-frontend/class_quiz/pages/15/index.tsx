import { gql, useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroller";

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

export default function Page() {
  const { data, fetchMore } = useQuery(FETCH_BOARDS);

  console.log("#######", data?.fetchBoards);

  const fetchLoadMore = async () => {
    if (data === undefined) return;

    void fetchMore({
      variables: { page: Math.ceil((data?.fetchBoards.length ?? 10) / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchBoards === undefined)
          return { fetchBoards: [...prev.fetchBoards] };
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  return (
    <div style={{ height: "500px", overflow: "auto", backgroundColor: "blue" }}>
      <InfiniteScroll pageStart={0} loadMore={fetchLoadMore} hasMore={true} useWindow={false}>
        {data?.fetchBoards.map((el) => (
          <div key={el._id}>
            <span>{el.title}</span>
            <span>{el.writer}</span>
          </div>
        )) ?? <div></div>}
      </InfiniteScroll>
    </div>
  );
}
