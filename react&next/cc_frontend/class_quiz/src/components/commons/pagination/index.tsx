import styled from "@emotion/styled";
import { useState } from "react";

export const Pagenation = (props) => {
  const [activedPage, setActivedPage] = useState(1);

  const lastPage = Math.ceil(Number(props.count) / 10);

  const onClickPage = (event) => {
    const activedPage = Number(event.target.id);
    setActivedPage(activedPage);
    props.refetch({ page: activedPage });
  };

  const onClickPrevPage = () => {
    if (props.startPage <= 1) return;

    setActivedPage(props.startPage - 10);
    props.setStartPage((prev) => prev - 10);
  };

  const onClickNextPage = () => {
    if (props.startPage + 10 > lastPage) return;

    setActivedPage(props.startPage + 10);
    props.setStartPage((prev) => prev + 10);
  };

  return (
    <Wrapper>
      <Indicator onClick={onClickPrevPage}>{`<`}</Indicator>
      {new Array(10)
        .fill(1)
        .filter((_, index) => {
          const currentPage = props.startPage + index;
          return currentPage <= lastPage;
        })
        .map((_, index) => (
          <Indicator
            key={props.startPage + index}
            id={String(props.startPage + index)}
            onClick={onClickPage}
            isActive={props.startPage + index === activedPage}
          >
            {props.startPage + index}
          </Indicator>
        ))}
      <Indicator onClick={onClickNextPage}>{`>`}</Indicator>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

interface IPageProps {
  isActive?: boolean;
}

const Indicator = styled.span`
  margin: 0px 10px;
  color: ${(props: IPageProps) => (props.isActive ? "#2d0beb" : "#000")};
`;
