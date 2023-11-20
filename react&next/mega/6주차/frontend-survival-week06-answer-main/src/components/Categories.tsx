import Category from './Category';

type CategoriesProps = {
  categories: string[];
  setFilterCategory: (text: string) => void;
}

export default function Categories({
  categories, setFilterCategory,
}: CategoriesProps) {
  const handleSetFilterCategory = (category: string) => {
    setFilterCategory(category);
  };
  return (
    <ul style={{ display: 'flex', padding: 0, listStyle: 'none' }}>
      {['전체', ...categories].map((category: string) => (
        <Category
          key={category}
          category={category}
          setFilterCategory={handleSetFilterCategory}
        />
      ))}
    </ul>
  );
}
