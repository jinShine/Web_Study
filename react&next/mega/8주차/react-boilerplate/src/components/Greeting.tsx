import styled from "styled-components";

const Paragraph = styled.p`
  color: #00f;
`;
const BigParagraph = styled(Paragraph)`
  font-size: 2rem;
`;

export default function Greeting() {
  return (
    <Paragraph>
      Greeting
      <BigParagraph>BIG</BigParagraph>
    </Paragraph>
  );
}
