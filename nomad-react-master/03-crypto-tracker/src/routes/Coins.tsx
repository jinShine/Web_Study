import React from "react";
import styled from "styled-components";

function Coins() {
  return <Title>코인</Title>;
}

export default Coins;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;
