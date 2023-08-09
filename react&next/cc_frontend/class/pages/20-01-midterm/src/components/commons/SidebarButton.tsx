import styled from "@emotion/styled";
import { MouseEvent } from "react";

interface IProps {
  id: string;
  selectedImg: string;
  deselectedImg: string;
  title: string;
  isActive?: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function SidebarButton(props: IProps) {
  return (
    <Wrapper id={props.id} onClick={props.onClick}>
      <Img src={props.isActive ? props.selectedImg : props.deselectedImg} />
      <Title isActive={props.isActive}>{props.title}</Title>
    </Wrapper>
  );
}

// Styles

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  margin-left: 20px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 18px;
  height: 18px;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-left: 12px;
  color: ${(props) => (props.isActive ? "black" : "#999999")};
`;
