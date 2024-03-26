import { render, screen } from '@testing-library/react';

import Summary from './Summary';

import fixtures from '../../../fixtures';

describe('Summary', () => {
  const selectedMenu = fixtures.foods;

  it('renders total selected menu count', () => {
    render(<Summary selectedMenu={selectedMenu} />);

    screen.getByText(/주문내역/);
  });
});
