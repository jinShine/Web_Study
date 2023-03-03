import styled from "@emotion/styled";

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  margin-left: 20px;
`;

export const TitleWrapper_Img = styled.img`
  width: 20px;
  height: 20px;
`;

export const TitleWrapper_Title = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: black;
  margin-left: 6px;
`;

export const Divider = styled.div`
  width: calc(100% - 40px);
  height: 1px;
  margin: 30px auto;
  background-color: ${(props) => props.theme.color.border};
`;
