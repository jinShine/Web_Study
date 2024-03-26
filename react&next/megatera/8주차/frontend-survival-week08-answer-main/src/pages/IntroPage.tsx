import styled from 'styled-components';
import { useNavigate } from 'react-router';

const Container = styled.div`
  padding-block: 10em 25em; 
  padding-inline: ${(props) => props.theme.sizes.contentPadding};
  background: ${(props) => props.theme.colors.layoutBackground};
`;

const Title = styled.h2`
  font-size: 11rem;
  font-weight: bold;
  display: block;
  margin-bottom: 1em;
  text-align: center;
  line-height: 120%;
  color: #FFFFFF;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  font-size: 4.8rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-block: 2.5em;
  width: 49%;
  border: 1px solid transparent;
  border-radius: 1em;
  background-color: ${(props) => props.theme.colors.secondary};
  cursor: pointer;
  
  &:hover {
    border-color: ${(props) => props.theme.colors.buttonHoverBorder};
    background: ${(props) => props.theme.colors.buttonHoverBackground};
  }
  
  img {
    display: block;
    margin-bottom: 1em;
    width: 40%;
  }
  
  span {
    display: block;
  }
`;

export default function IntroPage() {
  const navigate = useNavigate();

  const handleClickNext = () => {
    navigate('/order');
  };

  return (
    <Container>
      <Title>원하시는 주문을 터치해주세요</Title>
      <Wrapper>
        <Button type="button" onClick={handleClickNext}>
          <img src="/images/fastfood.png" alt="" />
          <span>매장 주문</span>
        </Button>
        <Button type="button" onClick={handleClickNext}>
          <img src="/images/bag.png" alt="" />
          <span>전체 포장</span>
        </Button>
      </Wrapper>
    </Container>
  );
}
