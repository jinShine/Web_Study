import styled from 'styled-components';

import Order from '../../types/Order';

const Container = styled.div`
  margin-bottom: 10em;
`;

const Title = styled.h3`
  font-size: 4.8rem;
  padding-block: 1em;
  border-bottom: 1px solid ${(props) => props.theme.colors.line};
`;

const Foods = styled.ul`
  font-size: 3.2rem;
  padding-block: 1em;
  border-bottom: 1px solid ${(props) => props.theme.colors.line};
  
  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
  }
  
  li:last-of-type {
    margin-bottom: 0;
  }
`;

const TotalPrice = styled.div`
  font-size: 3.2rem;
  display: flex;
  justify-content: space-between;
  padding-block: 1em;
  border-bottom: 1px solid ${(props) => props.theme.colors.line};
  
  span {
    display: flex;
    align-items: center;
  }
  
  span strong {
    font-size: 4.8rem;
    color: #FF8400;
  }
`;

type MenuProps = {
  order: Order;
}

export default function Menu({ order }: MenuProps) {
  const { menu } = order;

  return (
    <Container>
      <Title>주문목록</Title>
      <Foods>
        {menu.map((food, index) => {
          const key = `${index}-${food.name}`;

          return (
            <li key={key}>
              <span>{food.name}</span>
              <span>
                {food.price.toLocaleString()}
                원
              </span>
            </li>
          );
        })}
      </Foods>
      <TotalPrice>
        <span>
          총가격
        </span>
        <span>
          <strong>
            {order.totalPrice.toLocaleString()}
            원
          </strong>
        </span>
      </TotalPrice>
    </Container>
  );
}
