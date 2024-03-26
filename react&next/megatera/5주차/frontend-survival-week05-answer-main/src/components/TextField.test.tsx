import { render, screen, fireEvent } from '@testing-library/react';

import TextField from './TextField';

const context = describe;

describe('TextField', () => {
  const label = 'Name';
  const text = 'Tester';

  const setText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderTextField() {
    render((
      <TextField
        label={label}
        placeholder="Input your name"
        text={text}
        setText={setText}
      />
    ));
  }

  it('renders elements', () => {
    renderTextField();

    screen.getByLabelText(label);
    screen.getByPlaceholderText(/Input/);
    screen.getByDisplayValue(text);
  });

  context('when user enters name', () => {
    it('calls “setText” handler', () => {
      renderTextField();

      fireEvent.change(screen.getByLabelText(label), {
        target: { value: 'New Name' },
      });

      expect(setText).toBeCalledWith('New Name');
    });
  });
});
