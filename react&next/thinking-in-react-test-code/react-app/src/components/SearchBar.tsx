import TextField from './TextField';
import Categories from './Categories';

type SearchBarProps = {
  categories: string[];
  filterText: string;
  setFilterText: (text: string) => void;
  setFilterCategory: (text: string) => void;
}

export default function SearchBar({
  categories, filterText, setFilterText, setFilterCategory,
}: SearchBarProps) {
  return (
    <div>
      <TextField
        label="검색"
        placeholder="식당 이름"
        text={filterText}
        setText={setFilterText}
      />
      <Categories
        categories={categories}
        setFilterCategory={setFilterCategory}
      />
    </div>
  );
}
