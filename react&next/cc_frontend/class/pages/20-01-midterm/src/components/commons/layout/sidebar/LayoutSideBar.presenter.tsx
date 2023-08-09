import SidebarButton from "../../SidebarButton";
import {
  Divider,
  TitleWrapper,
  TitleWrapper_Img,
  TitleWrapper_Title,
} from "./LayoutSideBar.styles";
import { ILayoutSidebarProps } from "./LayoutSidebar.types";

export default function AppSidebarPageUI(props: ILayoutSidebarProps) {
  return (
    <>
      <TitleWrapper>
        <TitleWrapper_Img src="/icon/ic_conversation.svg" />
        <TitleWrapper_Title>TALKR</TitleWrapper_Title>
      </TitleWrapper>
      <Divider />
      {props.buttonInfos.map((el) => {
        return (
          <SidebarButton
            key={el.id}
            id={el.id}
            selectedImg={el.selectedImg}
            deselectedImg={el.deselectedImg}
            title={el.title}
            isActive={el.isActive}
            onClick={props.onClickMenu}
          />
        );
      })}
    </>
  );
}
