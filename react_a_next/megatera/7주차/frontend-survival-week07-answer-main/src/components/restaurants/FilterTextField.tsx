import TextField from '../TextField';

type FilterTextFieldProps = {
  text: string;
  setText: (value: string) => void;
};

export default function FilterTextField({
  text, setText,
}: FilterTextFieldProps) {
  return (
    <TextField
      label="검색"
      placeholder="식당 이름을 입력해주세요"
      text={text}
      setText={setText}
    />
  );
}
