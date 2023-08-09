import styled from "@emotion/styled";

export const BoardInput = styled.input`
  height: 24px;
`;

export const BoardButton = styled.button`
  height: 24px;
  border-style: none;
  background-color: ${(props) => (props.isActive ? "purple" : "light")};
  color: ${(props) => (props.isActive ? "white" : "lightGray")};
`;
