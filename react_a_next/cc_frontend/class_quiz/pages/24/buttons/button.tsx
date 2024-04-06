import { FormState } from "react-hook-form";
import { IFormData } from "..";

interface IInputProps {
  title: string;
  formState: FormState<IFormData>;
}

export function Button(props: IInputProps) {
  return (
    <button style={{ backgroundColor: props.formState.isValid ? "yellow" : "" }}>
      {props.title}
    </button>
  );
}
