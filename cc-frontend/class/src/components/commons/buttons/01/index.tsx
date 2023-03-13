import { FormState } from "react-hook-form";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
  password: string;
}

interface IProps {
  title: string;
  formState: FormState<IFormData>;
}

export default function Button01(props: IProps) {
  return (
    <button
      style={{ backgroundColor: props.formState.isValid ? "yellow" : "" }}
    >
      {props.title}
    </button>
  );
}
