import styled from 'styled-components';

import Food from '../../types/Food';

import calculateTotalPrice from '../../utils/calculateTotalPrice';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Count = styled.h2`
  font-size: 3.2rem;
  display: flex;
  align-items: center;
  
  img {
    display: block;
    margin-right: .1em;
    width: 1.2em;
  }
  
  span:last-of-type {
    font-size: .75em;
    margin-left: .5em;
    padding: .5em 1em;
    border-radius: 1em;
    background-color: #FF8400;
    color: #FFFFFF;
  }
`;

const TotalPrice = styled.div`
  font-size: 3.2rem;
  
  strong {
    color: #FF8400;
  }
`;

type SummaryProps = {
  selectedMenu: Food[];
}

export default function Summary({ selectedMenu }: SummaryProps) {
  const totalPrice = calculateTotalPrice(selectedMenu);

  const count = selectedMenu.length;

  return (
    <Container>
      <Count>
        <img src="/images/shopping-cart.png" alt="" />
        <span>
          주문내역
        </span>
        <span>
          {count}
          개
        </span>
      </Count>
      <TotalPrice>
        총 결제 예상금액
        {' '}
        <strong>{totalPrice.toLocaleString()}</strong>
        원
      </TotalPrice>
    </Container>
  );
}
