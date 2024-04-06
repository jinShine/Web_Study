import { fireEvent, render, screen } from '@testing-library/react';

import MenuItem from './MenuItem';

describe('MenuItem', () => {
  const food = {
    id: 'FOOD_ID',
    name: '짜장면',
    price: 8_000,
  };

  const handleClickItem = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders food information', () => {
    render((
      <MenuItem
        food={food}
        onClickItem={handleClickItem}
      />
    ));

    screen.getByText(/짜장면/);
    screen.getByText(/8,000원/);
  });

  it('listens for restaurant click event', () => {
    render((
      <MenuItem
        food={food}
        onClickItem={handleClickItem}
      />
    ));

    fireEvent.click(screen.getByText(/짜장면/));

    expect(handleClickItem).toBeCalledWith(food);
  });
});
