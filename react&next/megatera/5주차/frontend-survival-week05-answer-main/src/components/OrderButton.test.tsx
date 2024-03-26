import { render, screen, fireEvent } from '@testing-library/react';

import OrderButton from './OrderButton';

describe('OrderButton', () => {
  const foods = [
    {
      id: 'FOOD_01',
      name: '짜장면',
      price: 8_000,
    },
    {
      id: 'FOOD_02',
      name: '짬뽕',
      price: 5_000,
    },
  ];

  const handleClickOrder = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderOrderButton() {
    render((
      <OrderButton
        foods={foods}
        onClick={handleClickOrder}
      />
    ));
  }

  it('renders order total price', () => {
    renderOrderButton();

    screen.getByText(/합계: 13,000원 주문/);
  });

  it('listens for order click event', () => {
    renderOrderButton();

    fireEvent.click(screen.getByText(/합계: 13,000원 주문/));

    expect(handleClickOrder).toBeCalled();
  });
});
