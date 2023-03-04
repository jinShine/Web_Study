import styled from "@emotion/styled";

// Enum

enum InputType {
  Input = "input",
  Textarea = "textarea",
}

// Interface

interface IProps {
  type: string;
  disabled?: boolean;
  width?: string;
  height?: string;
}

export default function BoardInput(props: IProps) {
  if (props.type === InputType.Input) {
    return <Input disabled={props.disabled ?? false} width={props.width} height={props.height} />;
  } else {
    return (
      <Textarea disabled={props.disabled ?? false} width={props.width} height={props.height} />
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
