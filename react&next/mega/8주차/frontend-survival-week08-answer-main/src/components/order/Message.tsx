import _ from 'lodash';

import styled from 'styled-components';

import Order from '../../types/Order';

const Container = styled.div`
  font-size: 8rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-block: 1em;
  border-bottom: 1px solid ${(props) => props.theme.colors.boldLine};
  
  img {
    margin-bottom: .5em;
    width: 1.5em;
  }
  
  h2 {
    width: 60%;
    text-align: center;
  }
  
  p {
    font-size: 4.8rem;
    font-weight: normal;
    margin-top: .5em;
    color: #6A6A6A;
  }
`;

type MessageProps = {
  order: Order;
};

export default function Message({ order }: MessageProps) {
  return (
    <Container>
      {!_.isEmpty(order) ? (
        <>
          <img src="/images/complete.png" alt="" />
          <h2>주문이 완료되었습니다!</h2>
          <p>
            주문번호
            {' '}
            {order.id}
          </p>
        </>
      ) : (
        <h2>주문을 진행해주세요!</h2>
      )}
    </Container>
  );
}
