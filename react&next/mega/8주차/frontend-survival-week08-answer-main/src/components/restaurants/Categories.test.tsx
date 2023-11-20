import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../testHelper';

import Categories from './Categories';

describe('Categories', () => {
  const categories = ['한식, 중식, 일식'];

  const setFilterCategory = jest.fn();

  it('renders all categories', () => {
    renderWithProviders((
      <Categories
        categories={categories}
        setFilterCategory={setFilterCategory}
      />
    ));

    screen.getByText(/전체/);

    categories.forEach((category) => {
      screen.getByText(category);
    });
  });
});
