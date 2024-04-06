import styled from 'styled-components';

import Food from '../../types/Food';

const Container = styled.li`
  position: relative;
  padding: 1em 2em;
  border-radius: 1em;
  background-color: ${(props) => props.theme.colors.secondary};
  
  span {
    font-size: 2.8rem;
    display: block;
    padding-block: 1em;
  }
  
  span:last-of-type {
    color: #FF8400;
  }
  
  button {
    position: absolute;
    top: 8%;
    right: 8%;
    padding: 1rem;
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`;

type CartItemProps = {
  food: Food;
  index: number;
  onClickCancel: (index: number) => void;
}

export default function CartItem({
  food, index, onClickCancel,
}: CartItemProps) {
  const { name, price } = food;
  return (
    <Container>
      <span>{name}</span>
      <span>
        {price.toLocaleString()}
        원
      </span>
      <button
        type="button"
        onClick={() => onClickCancel(index)}
      >
        X
      </button>
    </Container>
  );
}
