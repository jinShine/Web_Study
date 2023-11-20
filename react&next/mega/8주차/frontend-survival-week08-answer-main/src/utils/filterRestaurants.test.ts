import fixtures from '../../fixtures';

import filterRestaurants from './filterRestaurants';

const context = describe;

describe('filterRestaurants', () => {
  const { restaurants } = fixtures;

  context('with “전체” category', () => {
    it('returns all restaurants', () => {
      const filteredRestaurants = filterRestaurants(
        restaurants,
        { filterText: '', filterCategory: '전체' },
      );

      expect(filteredRestaurants.length).toBe(restaurants.length);
    });
  });
});
