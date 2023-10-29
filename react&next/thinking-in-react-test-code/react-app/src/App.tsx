import { useInterval, useLocalStorage } from 'usehooks-ts';

import Cart from './components/Cart';
import FilterableRestaurantTable from './components/FilterableRestaurantTable';
import ReceiptPrinter from './components/ReceiptPrinter';

import useFetchRestaurants from './hooks/useFetchRestaurants';

import Receipt from './types/Receipt';

const emptyReceipt = {} as Receipt;

export default function App() {
  const [receipt, setReceipt] = useLocalStorage('receipt', emptyReceipt);

  const restaurants = useFetchRestaurants();

  useInterval(() => {
    if (receipt.id) {
      setReceipt(emptyReceipt);
    }
  }, receipt.id ? 5000 : null);

  return (
    <div>
      <h1>푸드코트 키오스크</h1>
      <Cart setReceipt={setReceipt} />
      <FilterableRestaurantTable restaurants={restaurants} />
      <ReceiptPrinter receipt={receipt} />
    </div>
  );
}
