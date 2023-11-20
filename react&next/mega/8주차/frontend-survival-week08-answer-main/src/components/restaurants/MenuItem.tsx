import styled from 'styled-components';

import Food from '../../types/Food';

const Container = styled.li`
  width: 30%;
`;

const Item = styled.button`
  border: 1px solid ${(props) => props.theme.colors.tertiary};
  border-radius: 2em;
  margin: 0;
  padding: 1em;
  background-color: ${(props) => props.theme.colors.tertiary};
  text-align: start;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  
  &:hover {
    border-color: ${(props) => props.theme.colors.buttonHoverBorder};
    background: ${(props) => props.theme.colors.buttonHoverBackground};
  }
  
  img {
    display: block;
    margin: 0 auto;
    width: 75%;
  }

  span {
    font-size: 3.2rem;
    display: block;
    padding-block: .2em;
  }
`;

type MenuItemProps = {
  food: Food;
  onClickItem: (food: Food) => void;
};

export default function MenuItem({ food, onClickItem }: MenuItemProps) {
  const { name, price, image } = food;

  return (
    <Container>
      <Item
        type="button"
        onClick={() => onClickItem(food)}
      >
        <img src={image} alt="" />
        <span>{name}</span>
        <span>
          {price.toLocaleString()}
          원
        </span>
      </Item>
    </Container>
  );
}
