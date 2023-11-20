type CategoryProps = {
  category: string;
  setFilterCategory: (text: string) => void;
}

export default function Category({
  category, setFilterCategory,
}: CategoryProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => setFilterCategory(category)}
      >
        {category}
      </button>
    </li>
  );
}
