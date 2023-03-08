import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { ChangeEvent, MouseEvent, useState } from "react";
import { IQuery, IQueryFetchBoardsArgs } from "../../src/commons/types/generated/types";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");

  const { data, refetch } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const getDebounce = _.debounce((value) => {
    refetch({ page: 1, search: value });
  }, 500);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setKeyword(value);
    getDebounce(value);
  };

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  return (
    <>
      <>
        <Label>검색</Label>
        <Input type="text" onChange={onChangeInput} />
      </>
      <BodyWrapper>
        {data?.fetchBoards.map((el) => (
          <Row key={el._id}>
            <Column>{el.writer}</Column>
            <Column>
              {el.title
                .replaceAll(keyword, `#${keyword}#`)
                .split("#")
                .map((el) => (
                  <Keyword key={uuidv4} isKeyword={el === keyword}>
                    {el}
                  </Keyword>
                ))}
            </Column>
          </Row>
        ))}
      </BodyWrapper>
      {new Array(10).fill(0).map((_, index) => {
        return (
          <PageNum key={index + 1} id={String(index + 1)} onClick={onClickPage}>
            {index + 1}
          </PageNum>
        );
      })}
    </>
  );
}

/////////////////////////////////////////
// Query

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
    }
  }
`;

/////////////////////////////////////////
// Style

const Label = styled.p`
  font-weight: 800;
  font-size: 20px;
`;
const Input = styled.input`
  height: 40px;
  width: 200px;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 25%;
  border: 1px solid lightgray;
`;

const Keyword = styled.span`
  color: ${(props) => (props.isKeyword ? "red" : "black")};
`;

const PageNum = styled.span`
  padding: 3px;
  font-weight: 700;
  cursor: pointer;
`;
