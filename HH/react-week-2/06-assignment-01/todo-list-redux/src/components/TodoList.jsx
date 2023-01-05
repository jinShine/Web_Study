import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Todo from "./Todo";

function TodoList() {
  const todos = useSelector((state) => state.todoReducer.todos);

  return (
    <StContainer>
      <div>
        <StTitle>Working..🚀</StTitle>
        <StTodoListGroup>
          {todos
            .filter((todo) => !todo.isDone)
            .map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
        </StTodoListGroup>
      </div>
      <div>
        <StTitle>Done! 👍🏻</StTitle>
        <StTodoListGroup>
          {todos
            .filter((todo) => todo.isDone)
            .map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
        </StTodoListGroup>
      </div>
    </StContainer>
  );
}

export default TodoList;

/* Style */

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 30px 0;
  width: 100%;
`;

const StTodoListGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StTitle = styled.p`
  font-weight: 800;
  font-size: 30px;
`;
