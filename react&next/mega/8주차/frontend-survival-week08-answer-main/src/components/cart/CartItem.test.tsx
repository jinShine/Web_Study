import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../testHelper';

import CartItem from './CartItem';

describe('CartItem', () => {
  const food = {
    id: 'FOOD_ID',
    name: '짜장면',
    price: 8_000,
    image: 'IMAGE',
  };
  const index = 1;

  const handleClickCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderCartItem() {
    renderWithProviders((
      <CartItem
        food={food}
        index={index}
        onClickCancel={handleClickCancel}
      />
    ));
  }

  it('renders item information', () => {
    renderCartItem();

    screen.getByText(/짜장면/);
    screen.getByText(/8,000원/);
  });

  it('listens for cancel button click event', () => {
    renderCartItem();

    fireEvent.click(screen.getByText('X'));

    expect(handleClickCancel).toBeCalledWith(index);
  });
});
