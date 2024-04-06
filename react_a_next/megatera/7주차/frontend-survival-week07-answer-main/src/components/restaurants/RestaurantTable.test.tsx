import { render, screen } from '@testing-library/react';

import RestaurantTable from './RestaurantTable';

import fixtures from '../../../fixtures';

describe('RestaurantTable', () => {
  const { restaurants } = fixtures;

  it('renders restaurants', () => {
    render(<RestaurantTable restaurants={restaurants} />);

    screen.getByText(/메가반점/);
    screen.getByText(/짜장면/);
    screen.getByText(/8,000원/);
  });
});
