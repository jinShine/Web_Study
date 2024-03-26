import { useNavigate } from 'react-router';

import useCartStore from '../../hooks/useCartStore';
import useCreateOrder from '../../hooks/useCreateOrder';

import Summary from './Summary';
import CartItem from './CartItem';
import OperationButtons from './OperationButtons';

export default function Cart() {
  const navigate = useNavigate();

  const [{ menu }, store] = useCartStore();

  const { createOrder } = useCreateOrder();

  const handleClickRemove = (index: number) => {
    store.removeMenu(index);
  };

  const handleClickCancel = () => {
    store.clear();

    navigate('/');
  };

  const handleClickOrder = async () => {
    if (!menu.length) {
      return;
    }

    const id = await createOrder(menu);

    store.clear();

    navigate(`/order/complete?orderId=${id}`);
  };

  return (
    <div>
      <Summary selectedMenu={menu} />
      <ul>
        {menu.map((food, index) => {
          const key = `${food.id}-${index}`;

          return (
            <CartItem
              key={key}
              index={index}
              food={food}
              onClickCancel={handleClickRemove}
            />
          );
        })}
      </ul>
      <OperationButtons
        onClickCancel={handleClickCancel}
        onClickOrder={handleClickOrder}
      />
    </div>
  );
}
