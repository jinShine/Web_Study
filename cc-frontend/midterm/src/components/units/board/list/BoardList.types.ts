import { IQuery } from "@/commons/types/generated/types";

export interface IBoardListUIProps {
  pageStart: number;
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  data?: Pick<IQuery, "fetchBoards">;
}
