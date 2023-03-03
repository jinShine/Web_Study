import { useRouter } from "next/router";
import { MouseEvent, useState, useEffect } from "react";
import AppSidebarPageUI from "./LayoutSideBar.presenter";
import { ISideBarInfo } from "./LayoutSidebar.types";

export enum SIDEBAR_BUTTON_INFO {
  Type_1 = "TYPE_1",
  Type_2 = "TYPE_2",
}

const BUTTON_INFOS: ISideBarInfo[] = [
  {
    id: SIDEBAR_BUTTON_INFO.Type_1,
    page: "/boards",
    selectedImg: "/icon/ic_list_fill.svg",
    deselectedImg: "/icon/ic_list.svg",
    title: "전체 글 보기",
    isActive: true,
  },
  {
    id: SIDEBAR_BUTTON_INFO.Type_2,
    page: "/boards/write",
    selectedImg: "/icon/ic_new_fill.svg",
    deselectedImg: "/icon/ic_new.svg",
    title: "새 글 작성",
    isActive: false,
  },
];

export default function AppSidebarPage() {
  const router = useRouter();

  const [infos, setInfos] = useState<ISideBarInfo[]>(BUTTON_INFOS);

  useEffect(() => {
    push();
  }, []);

  const onClickMenu = (event: MouseEvent<HTMLDivElement>) => {
    const newInfos = infos.map((info) => {
      if (info.id === event.currentTarget.id) {
        info.isActive = true;
      } else {
        info.isActive = false;
      }

      return info;
    });
    setInfos(newInfos);

    push();
  };

  // Helper
  const push = () => {
    const index = infos.findIndex((info) => info.isActive);

    void router.push(infos[index].page);
  };

  return <AppSidebarPageUI buttonInfos={infos} onClickMenu={onClickMenu} />;
}
