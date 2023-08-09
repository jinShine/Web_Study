import styled from "@emotion/styled";
import { IBlueButtonProps } from "./BoardWrite.types";

export const RedInput = styled.input`
  border-color: red;
`;

export const BlueButton = styled.button`
  background-color: ${(props: IBlueButtonProps) => (props.isActive ? "yellow" : "lightGray")};
`;
