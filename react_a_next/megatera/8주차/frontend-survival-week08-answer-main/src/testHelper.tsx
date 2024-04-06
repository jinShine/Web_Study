// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

import { ReactNode } from 'react';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import defaultTheme from './styles/defaultTheme';

type Option = {
  path?: string;
}

export function renderWithProviders(
  node: ReactNode,
  { path = '/' }: Option = {},
) {
  return render((
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider theme={defaultTheme}>
        {node}
      </ThemeProvider>
    </MemoryRouter>
  ));
}

// TODO: delete this!
export default {};
