import styled from "@emotion/styled";

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 640px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Navigation
export const NaviWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: calc(100% - 96px);
  height: 32px;
  margin-top: 79px;
`;
export const Navi_Item = styled.img`
  width: 32px;
  height: 32px;
`;

// Header Title
export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 96px);
  height: 64px;
  margin-top: 32px;
`;
export const Header_Title = styled.p`
  font-weight: 700;
  font-size: 40px;
  color: black;
`;
export const Header_User_Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;
export const Header_User_Profile = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 19px;
`;
export const Header_User_Name = styled.p`
  font-weight: 700;
  font-size: 24px;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  &:after {
    display: block;
    content: "";
    background-image: url("/img-right-arrow.png");
    width: 30px;
    height: 30px;
    margin-left: 2px;
  }
`;

// Menu
export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 96px);
  height: 43px;
  margin-top: 39px;
`;
export const Menu_Title = styled.p`
  font-weight: 700;
  font-size: 30px;
  color: #cacaca;
  margin-right: 52px;
`;

// Contents
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 96px);
  margin-top: 25px;
`;
export const Content_Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const Content_Item_Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const Content_Item_Container_Title = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #adadad;
`;
export const Content_Item_Container_Qestion = styled.p`
  margin-top: 0;
  font-size: 24px;
  font-weight: 400;
  color: black;
`;
export const Content_Item_Indicator = styled.div`
  width: 60px;
  height: 60px;
  background-image: url("/img-70-bottom-arrow.png");
`;

// Tabbar
export const TabbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
export const Tabbar_Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 14px;
`;
export const Tabbar_Item_Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;
export const Tabbar_Item_Title = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #adadad;
`;

// Line
export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 40px;
  background-color: #cacaca;
`;
