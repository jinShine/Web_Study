import { useState } from 'react';

import styled from 'styled-components';

import Category from './Category';

const Container = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0;
  list-style: none;
`;

type CategoriesProps = {
  categories: string[];
  setFilterCategory: (text: string) => void;
}

export default function Categories({
  categories, setFilterCategory,
}: CategoriesProps) {
  const [selectedCategory, setCategory] = useState('전체');

  const handleSetFilterCategory = (category: string) => {
    setFilterCategory(category);

    setCategory(category);
  };
  return (
    <Container>
      {['전체', ...categories].map((category: string) => (
        <Category
          key={category}
          active={category === selectedCategory}
          category={category}
          setFilterCategory={handleSetFilterCategory}
        />
      ))}
    </Container>
  );
}
