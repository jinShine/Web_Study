import { ChangeEvent } from "react";
import { IMutation } from "../../../../commons/types/generated/types";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<IMutation, "createBoard">;
}

export interface IBoardWriteUIProps {
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeContents: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickUpdate: () => void;
  onClickSubmit: () => void;
  isActiveSubmitColor: boolean;
  isEdit: boolean;
  data: Pick<IMutation, "createBoard">;
}

export interface IVariables {
  number: number;
  writer?: string;
  title?: string;
  contents?: string;
}

export interface IBlueButtonProps {
  isActive: boolean;
}
