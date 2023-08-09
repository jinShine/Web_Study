import React, { useState } from "react";
import { useDispatch } from "react-redux";
import nextId from "react-id-generator";
import styled from "styled-components";
import { addTodo } from "../redux/modules/todoReducer";

let nextTodoId = 0;

const InputForm = () => {
  const id = nextId();
  const dispatch = useDispatch();
  const initData = () => {
    return { id: 0, title: "", content: "", isDone: false };
  };

  const [todo, setTodo] = useState(initData);

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const onAddHandler = (e) => {
    if (todo.title === "" || todo.content === "") {
      return;
    }

    dispatch(addTodo({ ...todo, id: nextTodoId++ }));
    setTodo(initData);
  };

  return (
    <StContainer>
      <div>
        <StLabel>제목</StLabel>
        <StInput
          type="text"
          name="title"
          value={todo.title}
          onChange={onChangeInputHandler}
        ></StInput>
        <StLabel>내용</StLabel>
        <StInput
          type="text"
          name="content"
          value={todo.content}
          onChange={onChangeInputHandler}
        ></StInput>
      </div>
      <StButton onClick={onAddHandler}>추가하기</StButton>
    </StContainer>
  );
};

export default InputForm;

/* Style */

const StContainer = styled.div`
  background-color: beige;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
`;

const StLabel = styled.label`
  font-weight: 800;
  margin: 0 20px;
`;

const StInput = styled.input`
  border-style: none;
  width: 200px;
  height: 32px;
  border-radius: 10px;
`;

const StButton = styled.button`
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 32px;
  background-color: orange;
  color: white;
  font-weight: 800;
  margin: 0 20px;
`;
