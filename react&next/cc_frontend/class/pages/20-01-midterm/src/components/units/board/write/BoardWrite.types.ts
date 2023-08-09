import { IQuery } from "@/src/commons/types/generated/types";
import { ChangeEvent } from "react";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, "fetchBoard">;
}

export interface IBoardWriteUIPageProps {
  isEdit: boolean;
  onChangeInput: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  onClickSubmit: () => void;
  onClickUpdate: () => void;
  onClickCancel: () => void;
  onChangeInputImage: (event: ChangeEvent<HTMLInputElement>) => void;
  data?: Pick<IQuery, "fetchBoard">;
}

export interface IUpdateBoardInput {
  title?: string;
  contents?: string;
}
