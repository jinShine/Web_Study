import { useState } from "react";
import styled from "styled-components";

interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

const Container = styled.div<CircleProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 5px solid ${(props) => props.borderColor};
`;

function Circle({ bgColor, borderColor }: CircleProps) {
  const [counter, setCounter] = useState(0);
  const [value, setValue] = useState<string | number>(0);

  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? "red"}>
      {counter}
    </Container>
  );
}

export default Circle;
