import styled from 'styled-components';

import FilterTextField from './FilterTextField';
import Categories from './Categories';

const Container = styled.div`
  padding-inline: ${(props) => props.theme.sizes.contentPadding};
`;

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
    <Container>
      <FilterTextField
        text={filterText}
        setText={setFilterText}
      />
      <Categories
        categories={categories}
        setFilterCategory={setFilterCategory}
      />
    </Container>
  );
}
