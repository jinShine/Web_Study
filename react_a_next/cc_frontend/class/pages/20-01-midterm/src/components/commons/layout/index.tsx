import { useRouter } from "next/router";
import styled from "@emotion/styled";
import AppBannerPageUI from "./banner/LayoutBanner.presenter";
import AppSidebarPage from "./sidebar/LayoutSideBar.container";

interface ILayoutProps {
  children: JSX.Element | JSX.Element[];
}

export default function Layout(props: ILayoutProps) {
  const router = useRouter();

  const HIDDEN_BANNER = ["/boards/write", `/boards/${router.query.boardId}/edit`];

  const isHiddenBanner = HIDDEN_BANNER.includes(router.asPath);

  return (
    <Wrapper>
      <InnerSidebarWrapper>
        <AppSidebarPage />
      </InnerSidebarWrapper>
      <InnerContentWrapper>
        {!isHiddenBanner && <AppBannerPageUI />}
        <Body>{props.children}</Body>
      </InnerContentWrapper>
    </Wrapper>
  );
}

// Styles

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 708px;
`;

const InnerSidebarWrapper = styled.div`
  width: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
`;

const InnerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 240px);
  height: 708px;
  margin-left: 20px;
`;

const Body = styled.div`
  overflow: auto;
`;
