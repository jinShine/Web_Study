import { ChangeEvent, useRef } from "react";

type TextFieldProps = {
  label: string;
  placeholder: string;
  text: string;
  setText: (value: string) => void;
};

export default function TextField({
  label,
  placeholder,
  text,
  setText,
}: TextFieldProps) {
  const id = useRef(`input-${Math.random()}`);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setText(value);
  };

  return (
    <div>
      <label htmlFor={id.current}>{label}</label>
      <input
        id={id.current}
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}
