import { render, screen } from '@testing-library/react';

import Food from '../../types/Food';

import Menu from './Menu';

import fixtures from '../../../fixtures';

const context = describe;

describe('Menu', () => {
  context('with menu', () => {
    const menu = fixtures.foods;

    it('renders foods list', () => {
      render(<Menu menu={menu} />);

      screen.getByText(/짜장면/);
      screen.getByText(/짬뽕/);
    });
  });

  context('without menu', () => {
    const menu: Food[] = [];

    it('renders no foods message', () => {
      render(<Menu menu={menu} />);

      screen.getByText(/메뉴가 존재하지 않습니다/);
    });
  });
});
