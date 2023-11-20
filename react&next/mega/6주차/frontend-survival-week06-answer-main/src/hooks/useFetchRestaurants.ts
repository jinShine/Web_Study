import { useFetch } from 'usehooks-ts';

import Restaurant from '../types/Restaurant';

const url = 'http://localhost:3000/restaurants';

interface Restaurants {
  [restaurants: string]: Restaurant[];
}

export default function useFetchRestaurants() {
  const { data } = useFetch<Restaurants>(url);

  if (!data) {
    return [];
  }

  return data.restaurants;
}
