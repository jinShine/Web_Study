import styled from 'styled-components';

import Restaurant from '../../types/Restaurant';

import Menu from './Menu';

const Row = styled.tr`
  display: flex;
  flex-direction: column;
  padding-block: 3em;
  border-bottom: 1px solid ${(props) => props.theme.colors.line};
  
  &:last-of-type {
    border-bottom: 0;    
  }
  
  td:first-of-type {
    font-size: 4.8rem;
    font-weight: bold;
    margin-bottom: .5em;
  }
  
  td:last-of-type {
    width: 100%;
  }
`;

type RestaurantProps = {
  restaurant: Restaurant;
};

export default function RestaurantRow({ restaurant }: RestaurantProps) {
  const { name, menu } = restaurant;

  return (
    <Row>
      <td>
        {name}
      </td>
      <td>
        <Menu menu={menu} />
      </td>
    </Row>
  );
}
