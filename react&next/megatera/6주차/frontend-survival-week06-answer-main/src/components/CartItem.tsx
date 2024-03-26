import Food from '../types/Food';

type CartItemProps = {
  food: Food;
  index: number;
  onClickCancel: (index: number) => void;
}

export default function CartItem({
  food, index, onClickCancel,
}: CartItemProps) {
  const { name, price } = food;
  return (
    <div>
      <span>{name}</span>
      <span>
        {price.toLocaleString()}
        원
      </span>
      <button
        type="button"
        onClick={() => onClickCancel(index)}
      >
        X
      </button>
    </div>
  );
}
