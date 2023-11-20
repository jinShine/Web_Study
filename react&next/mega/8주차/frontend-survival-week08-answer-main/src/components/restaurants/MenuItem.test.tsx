import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../testHelper';

import MenuItem from './MenuItem';

describe('MenuItem', () => {
  const food = {
    id: 'FOOD_ID',
    name: '짜장면',
    price: 8_000,
    image: 'IMAGE',
  };

  const handleClickItem = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders food information', () => {
    renderWithProviders((
      <MenuItem
        food={food}
        onClickItem={handleClickItem}
      />
    ));

    screen.getByText(/짜장면/);
    screen.getByText(/8,000원/);
  });

  it('listens for restaurant click event', () => {
    renderWithProviders((
      <MenuItem
        food={food}
        onClickItem={handleClickItem}
      />
    ));

    fireEvent.click(screen.getByText(/짜장면/));

    expect(handleClickItem).toBeCalledWith(food);
  });
});
