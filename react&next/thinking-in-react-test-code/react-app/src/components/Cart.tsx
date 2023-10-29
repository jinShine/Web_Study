import { useLocalStorage } from 'usehooks-ts';

import useCreateOrder from '../hooks/useCreateOrder';

import Receipt from '../types/Receipt';
import Food from '../types/Food';

import CartItem from './CartItem';
import OrderButton from './OrderButton';

type CartProps = {
  setReceipt: (receipt: Receipt) => void;
}

export default function Cart({ setReceipt }: CartProps) {
  const [selectedFoods, setFoods] = useLocalStorage<Food[]>('cart', []);

  const { createOrder } = useCreateOrder();

  const handleClickCancel = (index: number) => {
    const foods = selectedFoods.filter((_, i) => i !== index);
    setFoods(foods);
  };

  const handleClickOrder = async () => {
    if (!selectedFoods.length) {
      return;
    }

    const receipt = await createOrder(selectedFoods);
    setReceipt(receipt);

    setFoods([]);
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      <h2>
        주문 바구니
      </h2>
      <ul style={{ width: '20%' }}>
        {selectedFoods.map((food, index) => {
          const key = `${food.id}-${index}`;

          return (
            <CartItem
              key={key}
              index={index}
              food={food}
              onClickCancel={handleClickCancel}
            />
          );
        })}
      </ul>
      <OrderButton
        foods={selectedFoods}
        onClick={handleClickOrder}
      />
    </div>
  );
}
