import CheckBoxField from "./CheckBoxField";

export default function SearchBar() {
  return (
    <div>
      검색 입력폼 체크박스
      <div>
        <input type="text" placeholder="search" />
      </div>
      <CheckBoxField label="Only show products in stock" />
    </div>
  );
}
