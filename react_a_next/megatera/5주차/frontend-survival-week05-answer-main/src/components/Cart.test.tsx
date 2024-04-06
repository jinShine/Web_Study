import { render, screen } from '@testing-library/react';

import Cart from './Cart';

import fixtures from '../../fixtures';

const setFoods = jest.fn();

jest.mock('usehooks-ts', () => ({
  useLocalStorage: () => [
    fixtures.foods,
    setFoods,
  ],
}));

describe('Cart', () => {
  const setReceipt = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title', () => {
    render(<Cart setReceipt={setReceipt} />);

    screen.getByText(/주문 바구니/);
  });

  it('renders order food list', () => {
    render(<Cart setReceipt={setReceipt} />);

    screen.getByText(/짜장면/);
    screen.getByText(/짬뽕/);
  });
});
