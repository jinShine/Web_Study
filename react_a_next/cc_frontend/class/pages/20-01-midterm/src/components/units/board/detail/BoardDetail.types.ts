import { IQuery } from "../../../../commons/types/generated/types";

export interface IBoardDetailUIProps {
  data?: Pick<IQuery, "fetchBoard">;
  onClickMoveToBoardList: () => void;
  onClickMoveToBoardEdit: () => void;
  onClickBoardDelete: () => void;
}
