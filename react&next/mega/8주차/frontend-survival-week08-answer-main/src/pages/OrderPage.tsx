import styled from 'styled-components';

import FilterableRestaurantTable from '../components/restaurants/FilterableRestaurantTable';
import Cart from '../components/cart';

const Container = styled.div`
  position: relative;
`;

export default function OrderPage() {
  return (
    <Container>
      <FilterableRestaurantTable />
      <Cart />
    </Container>
  );
}
