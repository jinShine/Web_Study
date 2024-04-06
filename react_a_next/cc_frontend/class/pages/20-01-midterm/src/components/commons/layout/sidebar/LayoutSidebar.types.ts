import { MouseEvent } from "react";

export interface ISideBarInfo {
  id: string;
  page: string;
  selectedImg: string;
  deselectedImg: string;
  title: string;
  isActive: boolean;
}

export interface ILayoutSidebarProps {
  buttonInfos: ISideBarInfo[];
  onClickMenu: (event: MouseEvent<HTMLDivElement>) => void;
}
