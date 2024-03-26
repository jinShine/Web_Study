import Restaurant from '../../types/Restaurant';

import Menu from './Menu';

type RestaurantProps = {
  restaurant: Restaurant;
};

export default function RestaurantRow({ restaurant }: RestaurantProps) {
  const { name, menu } = restaurant;

  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        <Menu menu={menu} />
      </td>
    </tr>
  );
}
