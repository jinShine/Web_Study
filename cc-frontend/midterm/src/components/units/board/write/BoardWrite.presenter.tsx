import BoardInput from "../../../../components/commons/BoardInput";
import {
  ActionButton,
  ActionWrapper,
  Container,
  ContentsWrapper,
  Divider,
  Image,
  ImageItem,
  ImagesContainer,
  ImagesWrapper,
  Label,
  Title,
  TitleWrapper,
  Wrapper,
  WriterWrapper,
} from "./BoardWrite.styles";

export default function BoardWriteUI() {
  return (
    <Wrapper>
      <Container>
        <Title>새 글 작성</Title>
        <Divider />
        <TitleWrapper>
          <Label>제목</Label>
          <BoardInput type="input" width="calc(100% - 100px)" />
        </TitleWrapper>
        <ContentsWrapper>
          <Label>내용</Label>
          <BoardInput type="textarea" width="calc(100% - 100px)" height="240px" />
        </ContentsWrapper>
        <ImagesWrapper>
          <Label>이미지</Label>
          <ImagesContainer>
            <ImageItem>
              <Image src="/icon/ic_add.svg" />
            </ImageItem>
            <ImageItem>
              <Image src="/icon/ic_add.svg" />
            </ImageItem>
            <ImageItem>
              <Image src="/icon/ic_add.svg" />
            </ImageItem>
          </ImagesContainer>
        </ImagesWrapper>
        <WriterWrapper>
          <Label>작성자</Label>
          <BoardInput type="input" width="calc(50% - 116px)" />
          <Label>비밀번호</Label>
          <BoardInput type="input" width="calc(50% - 116px)" />
        </WriterWrapper>
      </Container>
      <ActionWrapper>
        <ActionButton bgColor="#6400FF">등록</ActionButton>
        <ActionButton bgColor="#999999">수정</ActionButton>
      </ActionWrapper>
    </Wrapper>
  );
}
