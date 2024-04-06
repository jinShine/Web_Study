import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteTodo, updateTodoState } from "../redux/modules/todoReducer";

function Todo({ todo }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  /* Handler */

  const deleteTodoHandler = (event, id) => {
    event.stopPropagation();
    dispatch(deleteTodo(id));
  };

  const updateTodoStateHandler = (event, id) => {
    event.stopPropagation();
    dispatch(updateTodoState(id));
  };

  const moveTo = (url) => {
    navigate(url);
  };

  return (
    <StContainer onClick={() => moveTo(`/detail/${todo.id}`)}>
      <StTitle>{todo.title}</StTitle>
      <StContent>{todo.content}</StContent>
      <StButtonGroup>
        <StButton
          bgColor="red"
          onClick={(event) => deleteTodoHandler(event, todo.id)}
        >
          삭제
        </StButton>
        <StButton
          bgColor="green"
          onClick={(event) => updateTodoStateHandler(event, todo.id)}
        >
          {todo.isDone ? "취소" : "완료"}
        </StButton>
      </StButtonGroup>
    </StContainer>
  );
}

export default Todo;

/* Style */

const StContainer = styled.div`
  &:hover {
    background-color: rgba(240, 240, 240, 1);
    cursor: pointer;
  }
  border: 3px solid orange;
  border-radius: 12px;
  padding: 12px 24px;
  width: 300px;
  margin: 12px 12px 12px 0px;
`;

const StTitle = styled.p`
  font-size: 20px;
  font-weight: 800;
`;

const StContent = styled.p`
  font-size: 16px;
`;

const StButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 50px;
`;

const StButton = styled.button`
  border: none;
  height: 32px;
  border-radius: 10px;

  background-color: ${(props) => props.bgColor};
  color: white;
  font-size: 13px;
  font-weight: 600;
  height: 32px;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
`;
