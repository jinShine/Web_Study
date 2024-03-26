import { useState } from 'react';

import selectCategories from '../../utils/selectCategories';
import filterRestaurants from '../../utils/filterRestaurants';

import SearchBar from './SearchBar';
import RestaurantTable from './RestaurantTable';

import useFetchRestaurants from '../../hooks/useFetchRestaurants';

export default function FilterableRestaurantTable() {
  const restaurants = useFetchRestaurants();

  const [filterText, setFilterText] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('전체');

  const categories = selectCategories(restaurants);

  const filteredRestaurants = filterRestaurants(restaurants, {
    filterText, filterCategory,
  });

  return (
    <div>
      <SearchBar
        categories={categories}
        filterText={filterText}
        setFilterText={setFilterText}
        setFilterCategory={setFilterCategory}
      />
      <RestaurantTable restaurants={filteredRestaurants} />
    </div>
  );
}
