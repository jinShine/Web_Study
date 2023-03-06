import { Container, Date, Title, Wrapper } from "./BoardList.styles";
import { IBoardListUIProps } from "./BoardList.types";
import InfiniteScroll from "react-infinite-scroller";
import { getDate } from "../../../../commons/utils/date";

export default function BoardListUI(props: IBoardListUIProps) {
  return (
    <Wrapper>
      <>
        <InfiniteScroll
          pageStart={props.pageStart}
          loadMore={props.onLoadMore}
          hasMore={props.hasMore}
          useWindow={false}
        >
          {props.data ? (
            props.data?.fetchBoards.map((el) => {
              return (
                <Container key={el._id} id={el._id} onClick={props.onClickMoveToBoardDetail}>
                  <Title>{el.title}</Title>
                  <Date>{getDate(el.createdAt)}</Date>
                </Container>
              );
            })
          ) : (
            <></>
          )}
        </InfiniteScroll>
      </>
    </Wrapper>
  );
}
