import {
  ActionButton,
  ActionWrapper,
  Container,
  Contents,
  ContentWrapper,
  Divider,
  ImageItem,
  ImagesWrapper,
  ProfileImg,
  Title,
  Wrapper,
  Writer,
} from "./BoardDetail.styles";
import { IBoardDetailUIProps } from "./BoardDetail.types";

export default function BoardDetailUI(props: IBoardDetailUIProps) {
  const fetchBoard = props.data?.fetchBoard;

  return (
    <Wrapper>
      <Container>
        <Title>글 제목</Title>
        <Divider />
        {props.data?.fetchBoard.images.length !== 0 ? (
          <ImagesWrapper>
            {props.data?.fetchBoard.images?.map((el) => (
              <ImageItem src={el} />
            ))}
          </ImagesWrapper>
        ) : (
          <></>
        )}
        <ContentWrapper>
          <ProfileImg src="/icon/ic_account_circle.svg" />
          <Writer>{fetchBoard?.writer}</Writer>
          <Contents>{fetchBoard?.contents}</Contents>
        </ContentWrapper>
      </Container>
      <ActionWrapper>
        <ActionButton bgColor="#6400FF" onClick={props.onClickMoveToBoardList}>
          글목록
        </ActionButton>
        <ActionButton bgColor="#999999" onClick={props.onClickMoveToBoardEdit}>
          수정
        </ActionButton>
        <ActionButton bgColor="#999999" onClick={props.onClickBoardDelete}>
          삭제
        </ActionButton>
      </ActionWrapper>
    </Wrapper>
  );
}
