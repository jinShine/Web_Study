import styled from "@emotion/styled";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNavigation from "./navigation";
import LayoutSidebar from "./sidebar";

interface ILayoutPage {
  children: JSX.Element;
}

export default function Layout(props: ILayoutPage) {
  return (
    <>
      <LayoutHeader />
      <LayoutBanner />
      <LayoutNavigation />
      <ContentWrapper>
        <LayoutSidebar />
        <BodyWrapper>{props.children}</BodyWrapper>
      </ContentWrapper>
      <LayoutFooter />
    </>
  );
}

const ContentWrapper = styled.div`
  height: 500px;
  display: flex;
`;

const BodyWrapper = styled.div`
  width: 70%;
`;
