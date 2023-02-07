import "./App.css";
import styled, { keyframes } from "styled-components";

/////////////////////////////////
// 1. How to use styled-components
/////////////////////////////////
const Father = styled.div`
  display: flex;
`;

/////////////////////////////////
// 2. Props 사용
/////////////////////////////////
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

/////////////////////////////////
// 3. 확장
/////////////////////////////////
const Circle = styled(Box)`
  border-radius: 50px;
`;

const Btn = styled.button`
  color: tomato;
`;

/////////////////////////////////
// 5. Attrs
/////////////////////////////////
const Input = styled.input.attrs({ requrie: true, maxLength: 10 })`
  background-color: tomato;
`;

const anim = keyframes`
  from {
    color: tomato;
  } 
  to {
    color: aqua;
  }
`;

/////////////////////////////////
// 6. Keyframes
/////////////////////////////////
const animButton = styled.button`
  animation: ${anim} 0.5s infinite;
`;

const Container = styled.div`
  /////////////////////////////////
  // 7. Pseudo selector & State selector
  /////////////////////////////////
  h1 {
  }

  /////////////////////////////////
  // 8. Styled component selector
  /////////////////////////////////
  ${Input} {
    color: tomato;
    &:hover {
      background-color: ${(props) => props.theme.textColor};
      height: 100px;
    }
  }
`;

function App() {
  return (
    <Container>
      <Btn></Btn>
      {/* 4. as */}
      <Btn as="a">Go home</Btn>
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Container>
  );
}

export default App;
