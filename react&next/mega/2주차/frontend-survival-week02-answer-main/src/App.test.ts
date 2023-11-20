import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

test('App', () => {
  render(React.createElement(App, null, null));

  screen.getByText(/Hello, wholeman!/);
});
