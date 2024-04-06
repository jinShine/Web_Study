import _ from 'lodash';

import styled from 'styled-components';

import useFetchOrder from '../../hooks/useFetchOrder';

import Message from './Message';
import Menu from './Menu';

const Container = styled.div`
  padding-block: 8em 3em;
  padding-inline: ${(props) => props.theme.sizes.contentPadding};
  border-top-right-radius: ${(props) => props.theme.sizes.contentBorderRadius};
  background: ${(props) => props.theme.colors.secondary};
`;

const Button = styled.button`
  font-size: 2.8rem;
  display: block;
  padding-block: 1.2em;
  width: 100%;
  border: 0;
  border-radius: 8em;
  background: #FF8400;
  color: #FFFFFF;
  cursor: pointer;
`;

type OrderProps = {
  orderId: string;
  onClickBack: () => void;
}

export default function Order({
  orderId, onClickBack,
}: OrderProps) {
  const order = useFetchOrder({ orderId });

  return (
    <Container>
      <Message order={order} />
      {!_.isEmpty(order) ? (
        <Menu order={order} />
      ) : null}
      <Button type="button" onClick={onClickBack}>
        메인화면으로 돌아가기
      </Button>
    </Container>
  );
}
