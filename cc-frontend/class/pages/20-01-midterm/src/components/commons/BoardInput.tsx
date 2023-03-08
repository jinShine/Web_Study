import styled from "@emotion/styled";
import { ChangeEvent } from "react";

// Enum

enum InputType {
  Input = "input",
  Textarea = "textarea",
  Password = "password",
}

// Interface

interface IProps {
  type: string;
  name?: string;
  disabled?: boolean;
  width?: string;
  height?: string;
  defaultValue?: string | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function BoardInput(props: IProps) {
  if (props.type === InputType.Input) {
    return (
      <Input
        name={props.name}
        disabled={props.disabled ?? false}
        width={props.width}
        height={props.height}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
    );
  } else if (props.type === InputType.Textarea) {
    return (
      <Textarea
        name={props.name}
        disabled={props.disabled ?? false}
        width={props.width}
        height={props.height}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
    );
  } else {
    return (
      <Input
        type={props.name}
        name={props.name}
        disabled={props.disabled ?? false}
        width={props.width}
        height={props.height}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
    );
  }
}

// Styles

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.border};
  height: ${(props) => props.height ?? "40px"};
  width: ${(props) => props.width};
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  font-weight: 400;

  &:focus {
    outline-color: 1px solid ${(props) => props.theme.color.main};
  }
  &:disabled {
    border: 1px solid ${(props) => props.theme.color.border};
    background-color: rgba(229, 229, 229, 0.5);
    color: #999999;
  }
`;

const Textarea = styled.textarea`
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.border};
  height: ${(props) => props.height ?? "40px"};
  width: ${(props) => props.width};
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  font-weight: 400;
  resize: none;

  &:focus {
    outline-color: 1px solid ${(props) => props.theme.color.main};
  }
  &:disabled {
    border: 1px solid ${(props) => props.theme.color.border};
    background-color: rgba(229, 229, 229, 0.5);
    color: #999999;
  }
`;
