import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../testHelper';

import Menu from './Menu';

import fixtures from '../../../fixtures';

describe('Menu', () => {
  const { order } = fixtures;

  it('renders title', () => {
    renderWithProviders(<Menu order={order} />);

    screen.getByText(/주문목록/);
  });

  it('renders food list', () => {
    renderWithProviders(<Menu order={order} />);

    const { menu } = order;

    menu.forEach((food) => screen.getByText(new RegExp(food.name)));
  });

  it('renders total price', () => {
    renderWithProviders(<Menu order={order} />);

    const { totalPrice } = order;

    screen.getByText(new RegExp(`${totalPrice.toLocaleString()}원`));
  });
});
