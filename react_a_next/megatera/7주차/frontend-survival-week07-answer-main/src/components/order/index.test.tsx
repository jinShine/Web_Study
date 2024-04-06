import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import Order from './index';

describe('Order', () => {
  const orderId = 'ORDER_ID';

  const handleClickBack = jest.fn();

  it('renders result message', async () => {
    render((
      <Order
        orderId={orderId}
        onClickBack={handleClickBack}
      />
    ));

    await waitFor(() => {
      screen.getByText(/주문이 완료되었습니다!/);
    });
  });

  it('renders order menu', async () => {
    render((
      <Order
        orderId={orderId}
        onClickBack={handleClickBack}
      />
    ));

    await waitFor(() => {
      screen.getByText(/짜장면/);
      screen.getByText(/짬뽕/);
    });
  });

  it('listens for back button click event', () => {
    render((
      <Order
        orderId={orderId}
        onClickBack={handleClickBack}
      />
    ));

    fireEvent.click(screen.getByText('메인화면으로 돌아가기'));

    expect(handleClickBack).toBeCalled();
  });
});
