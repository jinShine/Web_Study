import { render, screen } from '@testing-library/react';

import RestaurantRow from './RestaurantRow';

import fixtures from '../../../fixtures';

describe('RestaurantRow', () => {
  const restaurant = {
    id: 'RESTAURANT_01',
    category: '중식',
    name: '메가반점',
    menu: [...fixtures.foods],
  };

  it('renders restaurant information', () => {
    render((
      <table>
        <tbody>
          <RestaurantRow restaurant={restaurant} />
        </tbody>
      </table>
    ));

    screen.getByText(/메가반점/);
    screen.getByText(/짜장면/);
  });
});
