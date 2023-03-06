import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 700px;
  overflow: auto;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 50px;
  margin-top: 16px;
  background-color: white;
  cursor: pointer;
`;

export const Title = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-left: 30px;
  color: black;
`;

export const Date = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-right: 32px;
  color: #999999;
`;
