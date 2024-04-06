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
  min-height: 378px;
  margin-top: 20px;
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin-left: 40px;
  margin-top: 20px;
  color: black;
`;

export const Divider = styled.div`
  height: 1px;
  width: calc(100% - 80px);
  background-color: ${(props) => props.theme.color.border};
  margin: 0 auto;
  margin-top: 20px;
`;

export const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: calc(100% - 80px);
  height: 125px;
  padding: 20px 40px 0 40px;
`;

export const ImageItem = styled.img`
  width: calc(100% / 3 - 24px);
  height: 125px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 32px 40px 0 40px;
`;
export const ProfileImg = styled.img`
  width: 17px;
  height: 17px;
`;

export const Writer = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-left: 10px;
  color: black;
  width: 50px;
  white-space: nowrap;
`;

export const Contents = styled.p`
  font-size: 15px;
  font-weight: 400;
  margin-left: 43px;
  color: #333333;
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
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
