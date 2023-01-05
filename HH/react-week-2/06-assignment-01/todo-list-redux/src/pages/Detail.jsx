import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Wrapper from "../components/ui/Wrapper";
import { getTodoByID } from "../redux/modules/todoReducer";

const Detail = () => {
  let navigate = useNavigate();
  let todo = useSelector((state) => state.todoReducer.todo);
  let dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispatch(getTodoByID(params.id));
  }, [dispatch, params]);

  /* Handler */

  const onClickedMoveHome = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      <StContainer>
        <StBox>
          <StHeader>
            <p>id: {todo.id ?? 0}</p>
            <button onClick={onClickedMoveHome}>이전으로</button>
          </StHeader>
          <StBody>
            <h2>{todo.title ?? "제목"}</h2>
            <p>{todo.content ?? "내용"}</p>
          </StBody>
        </StBox>
      </StContainer>
    </Wrapper>
  );
};

export default Detail;

/* Style */

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
`;

const StBox = styled.div`
  border: 1px solid lightgray;
  border-radius: 20px;
  height: 300px;
  width: 500px;
`;

const StHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 10px 24px;
`;

const StBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 30px 24px;
`;
