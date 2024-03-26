import Food from '../../types/Food';

type MenuItemProps = {
  food: Food;
  onClickItem: (food: Food) => void;
};

export default function MenuItem({ food, onClickItem }: MenuItemProps) {
  const { name, price } = food;

  return (
    <div>
      <button
        type="button"
        onClick={() => onClickItem(food)}
      >
        <span>
          {name}
          {' '}
          {price.toLocaleString()}
          원
        </span>
      </button>
    </div>
  );
}
