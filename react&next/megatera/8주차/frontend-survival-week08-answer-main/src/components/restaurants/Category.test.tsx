import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../testHelper';

import Category from './Category';

describe('Category', () => {
  const active = false;
  const category = '한식';

  const setFilterCategory = jest.fn();

  function renderCategory() {
    renderWithProviders((
      <Category
        active={active}
        category={category}
        setFilterCategory={setFilterCategory}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders category text', () => {
    renderCategory();

    screen.getByText('한식');
  });

  it('listens for category click event', () => {
    renderCategory();

    fireEvent.click(screen.getByText('한식'));

    expect(setFilterCategory).toBeCalledWith(category);
  });
});
