import { IQuery } from "./../../../../../../class/src/commons/types/generated/types";
import { ChangeEvent } from "react";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, "fetchBoard">;
}

export interface IBoardWriteInfo {
  writer: string;
  password: string;
  title: string;
  contents: string;
}

export interface IBoardWriteUIProps {
  isEdit: boolean;
  isActive: boolean;
  errorInfo: IBoardWriteInfo;
  onChangeInfo: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: () => void;
  onClickUpdate: () => void;
  data?: Pick<IQuery, "fetchBoard">;
}

export interface IBoardWriteButtonProps {
  isActive: boolean;
}
