import { render, screen } from '@testing-library/react';

import MenuItem from './MenuItem';

describe('MenuItem', () => {
  const food = {
    id: 'FOOD_ID',
    name: '짜장면',
    price: 8_000,
  };

  it('renders food information', () => {
    render(<MenuItem food={food} />);

    screen.getByText('짜장면(8,000원)');
  });

  it('renders children', () => {
    render((
      <MenuItem food={food}>
        <p>맛있어요!</p>
      </MenuItem>
    ));

    screen.getByText(/맛있어요!/);
  });
});
