import {
  Wrapper,
  NaviWrapper,
  Navi_Item,
  HeaderWrapper,
  Header_Title,
  Header_User_Wrapper,
  Header_User_Profile,
  Header_User_Name,
  MenuWrapper,
  Menu_Title,
  Divider,
  ContentWrapper,
  Content_Item,
  Content_Item_Container,
  Content_Item_Container_Title,
  Content_Item_Container_Qestion,
  Content_Item_Indicator,
  TabbarWrapper,
  Tabbar_Item,
  Tabbar_Item_Image,
  Tabbar_Item_Title,
} from "../../styles/01/my";

export default function MyInfo() {
  return (
    <Wrapper>
      <NaviWrapper>
        <Navi_Item src="/img-main-search-black.svg" />
      </NaviWrapper>
      <HeaderWrapper>
        <Header_Title>마이</Header_Title>
        <Header_User_Wrapper>
          <Header_User_Profile src="img-profile-image.png" />
          <Header_User_Name>임정아</Header_User_Name>
        </Header_User_Wrapper>
      </HeaderWrapper>
      <MenuWrapper>
        <Menu_Title>공지사항</Menu_Title>
        <Menu_Title>이벤트</Menu_Title>
        <Menu_Title>FAQ</Menu_Title>
        <Menu_Title>Q&A</Menu_Title>
      </MenuWrapper>
      <Divider />
      <ContentWrapper>
        <Content_Item>
          <Content_Item_Container>
            <Content_Item_Container_Title>Q. 01</Content_Item_Container_Title>
            <Content_Item_Container_Qestion>
              리뷰 작성은 어떻게 하나요?
            </Content_Item_Container_Qestion>
          </Content_Item_Container>
          <Content_Item_Indicator />
        </Content_Item>
        <Content_Item>
          <Content_Item_Container>
            <Content_Item_Container_Title>Q. 02</Content_Item_Container_Title>
            <Content_Item_Container_Qestion>
              리뷰 수정/삭제는 어떻게 하나요?
            </Content_Item_Container_Qestion>
          </Content_Item_Container>
          <Content_Item_Indicator />
        </Content_Item>
        <Content_Item>
          <Content_Item_Container>
            <Content_Item_Container_Title>Q. 03</Content_Item_Container_Title>
            <Content_Item_Container_Qestion>
              아이디/비밀번호를 잊어버렸어요
            </Content_Item_Container_Qestion>
          </Content_Item_Container>
          <Content_Item_Indicator />
        </Content_Item>
        <Content_Item>
          <Content_Item_Container>
            <Content_Item_Container_Title>Q. 04</Content_Item_Container_Title>
            <Content_Item_Container_Qestion>회원탈퇴를 하고싶어요.</Content_Item_Container_Qestion>
          </Content_Item_Container>
          <Content_Item_Indicator />
        </Content_Item>
        <Content_Item>
          <Content_Item_Container>
            <Content_Item_Container_Title>Q. 05</Content_Item_Container_Title>
            <Content_Item_Container_Qestion>
              출발지 설정은 어떻게 하나요?
            </Content_Item_Container_Qestion>
          </Content_Item_Container>
          <Content_Item_Indicator />
        </Content_Item>
        <Content_Item>
          <Content_Item_Container>
            <Content_Item_Container_Title>Q. 06</Content_Item_Container_Title>
            <Content_Item_Container_Qestion>
              비밀번호를 변경하고 싶어요
            </Content_Item_Container_Qestion>
          </Content_Item_Container>
          <Content_Item_Indicator />
        </Content_Item>
      </ContentWrapper>
      <Divider />
      <TabbarWrapper>
        <Tabbar_Item>
          <Tabbar_Item_Image src="/img-home.png" />
          <Tabbar_Item_Title>홈</Tabbar_Item_Title>
        </Tabbar_Item>
        <Tabbar_Item>
          <Tabbar_Item_Image src="/img-location.png" />
          <Tabbar_Item_Title>잇츠로드</Tabbar_Item_Title>
        </Tabbar_Item>
        <Tabbar_Item>
          <Tabbar_Item_Image src="/img-favorite.png" />
          <Tabbar_Item_Title>마이찜</Tabbar_Item_Title>
        </Tabbar_Item>
        <Tabbar_Item>
          <Tabbar_Item_Image src="/img-profile.png" />
          <Tabbar_Item_Title>마이</Tabbar_Item_Title>
        </Tabbar_Item>
      </TabbarWrapper>
    </Wrapper>
  );
}
