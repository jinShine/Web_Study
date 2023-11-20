import Food from '../../types/Food';

import useCartStore from '../../hooks/useCartStore';

import MenuItem from './MenuItem';

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
    <div style={{ paddingBlock: '1rem' }}>
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
    </div>
  );
}
