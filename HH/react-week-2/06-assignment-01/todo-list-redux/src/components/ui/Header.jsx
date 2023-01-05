import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <StContainer>
      <StTitle>My Todo List</StTitle>
      <StTitle>React</StTitle>
    </StContainer>
  );
};

export default Header;

/* Style */

const StContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  background-color: orange;
`;

const StTitle = styled.div`
  padding: 0px 24px;
  color: white;
  font-weight: 900;
  font-size: 26px;
`;
