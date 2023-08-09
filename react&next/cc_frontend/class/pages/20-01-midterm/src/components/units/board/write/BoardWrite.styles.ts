import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.color.bg};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin-left: 40px;
  margin-top: 40px;
  color: black;
`;

export const Divider = styled.div`
  height: 1px;
  width: calc(100% - 80px);
  background-color: ${(props) => props.theme.color.main};
  margin: 0 auto;
  margin-top: 20px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px 0px 40px;
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 700;
  width: 60px;
  height: 20px;
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 40px 0px 40px;
`;

export const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 40px 0px 40px;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 34px;
`;

export const WriterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px 63px 40px;
`;

export const WriterInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

export const ActionButton = styled.button`
  background-color: ${(props) => props.bgColor};
  font-size: 12px;
  font-weight: 700;
  color: white;
  border-radius: 30px;
  border: none;
  height: 30px;
  width: 80px;
  margin: 0 10px;
  cursor: pointer;
`;
