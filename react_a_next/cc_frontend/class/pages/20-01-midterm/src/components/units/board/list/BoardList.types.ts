import { IQuery } from "@/commons/types/generated/types";
import { MouseEvent } from "react";

export interface IBoardListUIProps {
  pageStart: number;
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  data?: Pick<IQuery, "fetchBoards">;
  onClickMoveToBoardDetail: (event: MouseEvent<HTMLDivElement>) => void;
}
