import { fireEvent, render, screen } from '@testing-library/react';

import FilterTextField from './FilterTextField';

describe('FilterTextField', () => {
  const text = '메가반점';

  const setText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderFilterTextField() {
    render((
      <FilterTextField
        text={text}
        setText={setText}
      />
    ));
  }

  it('renders elements', () => {
    renderFilterTextField();

    screen.getByLabelText(/검색/);
    screen.getByPlaceholderText(/식당 이름을 입력해주세요/);
    screen.getByDisplayValue(text);
  });

  it('listens for text change event', () => {
    renderFilterTextField();

    fireEvent.change(screen.getByLabelText(/검색/), {
      target: { value: 'New Brand' },
    });

    expect(setText)
      .toBeCalledWith('New Brand');
  });
});
