import { HTMLAttributes } from 'react';

import Food from '../types/Food';

type MenuItemProps = {
  food: Food;
} & HTMLAttributes<Element>;

export default function MenuItem({ food, children }: MenuItemProps) {
  const { name, price } = food;

  return (
    <li
      style={{
        display: 'flex',
        paddingBlock: '.5rem',
      }}
    >
      <span style={{ margin: '0 auto' }}>
        {name}
        (
        {price.toLocaleString()}
        원)
      </span>
      {children}
    </li>
  );
}
