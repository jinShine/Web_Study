import React from "react";
import Header from "../components/ui/Header";
import InputForm from "../components/InputForm";
import TodoList from "../components/TodoList";
import Wrapper from "../components/ui/Wrapper";

const Home = () => {
  return (
    <Wrapper>
      <Header />
      <InputForm />
      <TodoList />
    </Wrapper>
  );
};

export default Home;
