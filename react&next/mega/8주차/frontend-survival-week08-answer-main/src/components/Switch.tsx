import styled, { css } from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

type ToggleButtonProps = {
  active: boolean;
}

const ToggleButton = styled.button<ToggleButtonProps>`
  padding-block: 1em;
  padding-inline: .3em;
  border: 0;
  border-radius: 2em;
  color: #FFFFFF;
  background-color: #FFA454;
  cursor: pointer;

  span:first-of-type {
    padding: .7em 1.5em;
    border-radius: 3em;
    color: #000000;
    background-color: #FFFFFF;
    transition: .1s;
  }

  span:last-of-type {
    padding: .7em 1.5em;
    border-radius: 3em;
    transition: .1s;
  }
  
  ${(props) => props.active && css`
    background-color: #3A3A3A;

    span:first-of-type {
      color: #FFFFFF;
      background-color: transparent;
    }

    span:last-of-type {
      background-color: #1E1E1E;
    }
  `}
`;

export default function Switch() {
  const [isDarkMode, setThemeMode] = useLocalStorage('darkMode', false);

  const toggleTheme = () => {
    setThemeMode(!isDarkMode);
  };

  return (
    <Container>
      <ToggleButton type="button" onClick={toggleTheme} active={isDarkMode}>
        <span>밝게 </span>
        <span>어둡게 </span>
      </ToggleButton>
    </Container>
  );
}
