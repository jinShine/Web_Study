import useCartStore from '../hooks/useCartStore';

import Summary from './Summary';
import CartItem from './CartItem';
import OperationButtons from './OperationButtons';

export default function Cart() {
  const [{ menu }, store] = useCartStore();

  const handleClickRemove = (index: number) => {
    store.removeMenu(index);
  };

  const handleClickCancel = () => {
    store.clear();
  };

  const handleClickOrder = async () => {
    if (!menu.length) {
      return;
    }

    store.clear();
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
