import React from "react";
import styled from "styled-components";

const Wrapper = ({ children }) => {
  return <StWrapper>{children}</StWrapper>;
};

export default Wrapper;

const StWrapper = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;
