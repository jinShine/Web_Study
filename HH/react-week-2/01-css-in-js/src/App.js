import "./App.css";
import styled from "styled-components";

// styled-components를 이용하면 조건부 스타일링이 가능해짐
const StBox = styled.div`
  width: 100px;
  height: 100px;
  border: ${(props) => props.width}px solid ${(props) => props.borderColor};
  margin: 20px;
`;

const boxList = ["red", "green", "blue"];
const getBoxName = (color) => {
  switch (color) {
    case "red":
      return "빨간박스";
    case "green":
      return "초록박스";
    case "blue":
      return "파란박스";
    default:
      return "검정박스";
  }
};

function App() {
  return (
    <>
      {boxList.map((color, index) => {
        return (
          <StBox width={index} borderColor={color}>
            {getBoxName(color)}
          </StBox>
        );
      })}
    </>
  );
}

export default App;
