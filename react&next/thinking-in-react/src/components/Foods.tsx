import Food from '../types/Food';

type FoodsProps = {
  menu: Food[];
};

export default function Foods({ menu }: FoodsProps) {
  return (
    <ul>
      {menu.map((food) => {
        const { name, price } = food;

        return (
          <li key={name}>
            {name}
            (
            {price.toLocaleString()}
            원)
          </li>
        );
      })}
    </ul>
  );
}
