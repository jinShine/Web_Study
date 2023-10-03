import CheckBoxField from "./CheckBoxField";
import TextField from "./TextField";
type SearchBarProps = {
  filterText: string;
  setFilterText: (value: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
};

export default function SearchBar({
  filterText,
  setFilterText,
  inStockOnly,
  setInStockOnly,
}: SearchBarProps) {
  return (
    <div>
      <TextField
        placeholder="search"
        filterText={filterText}
        setFilterText={setFilterText}
      />
      <CheckBoxField
        label="Only show products in stock"
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
      />
    </div>
  );
}
