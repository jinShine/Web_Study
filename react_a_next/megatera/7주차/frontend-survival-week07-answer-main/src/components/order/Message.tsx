import _ from 'lodash';

import Order from '../../types/Order';

type MessageProps = {
  order: Order;
};

export default function Message({ order }: MessageProps) {
  return (
    <div>
      {!_.isEmpty(order) ? (
        <>
          <h2>주문이 완료되었습니다!</h2>
          <p>
            주문번호
            {' '}
            {order.id}
          </p>
        </>
      ) : (
        <h2>주문을 진행해주세요!</h2>
      )}
    </div>
  );
}
