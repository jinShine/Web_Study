import Food from '../types/Food';

type MenuItemProps = {
  food: Food;
  onClickItem: (food: Food) => void;
};

export default function MenuItem({ food, onClickItem }: MenuItemProps) {
  const { name, price } = food;

  return (
    <li>
      <button
        type="button"
        onClick={() => onClickItem(food)}
      >
        <span>{name}</span>
        <span>
          {price.toLocaleString()}
          원
        </span>
      </button>
    </li>
  );
}
