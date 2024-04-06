import _ from 'lodash';

import useFetchOrder from '../../hooks/useFetchOrder';

import Message from './Message';
import Menu from './Menu';

type OrderProps = {
  orderId: string;
  onClickBack: () => void;
}

export default function Order({
  orderId, onClickBack,
}: OrderProps) {
  const order = useFetchOrder({ orderId });

  return (
    <div>
      <Message order={order} />
      {!_.isEmpty(order) ? (
        <Menu order={order} />
      ) : null}
      <button type="button" onClick={onClickBack}>
        메인화면으로 돌아가기
      </button>
    </div>
  );
}
