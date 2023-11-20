import FilterableRestaurantTable from '../components/restaurants/FilterableRestaurantTable';
import Cart from '../components/cart';

export default function OrderPage() {
  return (
    <div>
      <FilterableRestaurantTable />
      <Cart />
    </div>
  );
}
