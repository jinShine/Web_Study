import styled from 'styled-components';

import Food from '../../types/Food';

import MenuItem from './MenuItem';
import useCartStore from '../../hooks/useCartStore';

const Container = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
`;

type MenuProps = {
  menu: Food[];
};

export default function Menu({ menu }: MenuProps) {
  const [, store] = useCartStore();

  if (!menu.length) {
    return (
      <p>메뉴가 존재하지 않습니다</p>
    );
  }

  const handleClickSelect = (food: Food) => {
    store.addMenu(food);
  };

  return (
    <Container>
      {menu.map((food, index) => {
        const key = `${food.id}-${index}`;

        return (
          <MenuItem
            key={key}
            food={food}
            onClickItem={handleClickSelect}
          />
        );
      })}
    </Container>
  );
}
