import styled from "@emotion/styled";
import { useState } from "react";
import { IBoard } from "../../../commons/types/generated/types";

interface IProps {
  el: IBoard;
}

export default function BoardCommentItem(props: IProps) {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    setIsEdit(true);
  };

  return (
    <div>
      {!isEdit && (
        <Row>
          <Column>
            <input type="checkbox" />
          </Column>
          <Column>{props.el.writer}</Column>
          <Column>{props.el.title}</Column>
          <button onClick={onClickEdit}>수정하기</button>
        </Row>
      )}
      {isEdit && (
        <div>
          {" "}
          수정할 내용: <input type="text" />
        </div>
      )}
    </div>
  );
}

const Row = styled.div`
  display: flex;
  height: 30px;
`;

const Column = styled.div`
  width: 25%;
`;
