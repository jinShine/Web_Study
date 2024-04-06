import { UploadControl } from "@/src/components/commons/UploadButton";
import BoardInput from "../../../commons/BoardInput";
import {
  ActionButton,
  ActionWrapper,
  Container,
  ContentsWrapper,
  Divider,
  ImagesContainer,
  ImagesWrapper,
  Label,
  Title,
  TitleWrapper,
  Wrapper,
  WriterWrapper,
} from "./BoardWrite.styles";
import { IBoardWriteUIPageProps } from "./BoardWrite.types";

export default function BoardWriteUI(props: IBoardWriteUIPageProps) {
  return (
    <Wrapper>
      <Container>
        <Title>{props.isEdit ? "게시물 수정" : "새 글 작성"}</Title>
        <Divider />
        <TitleWrapper>
          <Label>제목</Label>
          <BoardInput
            type="input"
            name="title"
            width="calc(100% - 100px)"
            defaultValue={props.data?.fetchBoard.title}
            onChange={props.onChangeInput}
          />
        </TitleWrapper>
        <ContentsWrapper>
          <Label>내용</Label>
          <BoardInput
            type="textarea"
            name="contents"
            width="calc(100% - 100px)"
            height="240px"
            defaultValue={props.data?.fetchBoard.contents}
            onChange={props.onChangeInput}
          />
        </ContentsWrapper>
        <ImagesWrapper>
          <Label>이미지</Label>
          <ImagesContainer>
            <UploadControl
              accept="image/jpg, image/jpeg, image/png"
              onChange={props.onChangeInputImage}
            />
            <UploadControl
              accept="image/jpg, image/jpeg, image/png"
              onChange={props.onChangeInputImage}
            />
            <UploadControl
              accept="image/jpg, image/jpeg, image/png"
              onChange={props.onChangeInputImage}
            />
          </ImagesContainer>
        </ImagesWrapper>
        <WriterWrapper>
          <Label>작성자</Label>
          <BoardInput
            type="input"
            name="writer"
            width="calc(50% - 116px)"
            onChange={props.onChangeInput}
            defaultValue={props.data?.fetchBoard.writer}
            disabled={props.isEdit}
          />
          <Label>비밀번호</Label>
          <BoardInput
            type="password"
            name="password"
            width="calc(50% - 116px)"
            onChange={props.onChangeInput}
          />
        </WriterWrapper>
      </Container>
      <ActionWrapper>
        <ActionButton
          bgColor="#6400FF"
          onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
        >
          {props.isEdit ? "수정" : "등록"}
        </ActionButton>
        <ActionButton bgColor="#999999" onClick={props.onClickCancel}>
          취소
        </ActionButton>
      </ActionWrapper>
    </Wrapper>
  );
}
