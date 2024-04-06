import FilterableRestaurantTable from './components/FilterableRestaurantTable';
import Cart from './components/Cart';

export default function App() {
  return (
    <div>
      <h1>메가테라 푸드코트 키오스크</h1>
      <FilterableRestaurantTable />
      <Cart />
    </div>
  );
}
