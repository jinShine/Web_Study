import styled from "styled-components";
import { useBoolean } from "usehooks-ts";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  active: boolean;
};

const Button = styled.button.attrs<ButtonProps>((props) => ({
  type: props.type ?? "button",
}))<ButtonProps>`
  background: ${(props) => (props.active ? "blue" : "green")};
  color: #000;
  border: 1px solid #888;
`;

export default function Switch() {
  const { value: active, toggle } = useBoolean();

  const handleClick = () => {
    toggle();
  };

  return (
    <Button onClick={handleClick} active={active}>
      On / Off
    </Button>
  );
}
