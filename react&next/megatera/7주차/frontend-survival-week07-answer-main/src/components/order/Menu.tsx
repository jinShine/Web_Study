import Order from '../../types/Order';

type MenuProps = {
  order: Order;
}

export default function Menu({ order }: MenuProps) {
  const { menu } = order;

  return (
    <div>
      <h2>주문목록</h2>
      <ul>
        {menu.map((food, index) => {
          const key = `${index}-${food.name}`;

          return (
            <li key={key}>
              <span>{food.name}</span>
              <span>
                {food.price.toLocaleString()}
                원
              </span>
            </li>
          );
        })}
      </ul>
      <div>
        <span>
          총가격
          {' '}
          {order.totalPrice.toLocaleString()}
          원
        </span>
      </div>
    </div>
  );
}
