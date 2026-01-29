package org.example.intermediate.g01_28;

import java.util.ArrayList;
import java.util.List;

public class Assignment2 {
  public static void main(String[] args) {
    TodoList todoList = new TodoList();
    todoList.addTodo(new Todo("장보기"));
    todoList.addTodo(new Todo("책 읽기"));
    todoList.addTodo(new Todo("운동하기"));

    todoList.complete(1);
    todoList.complete(2);
    todoList.remove(0);

    System.out.println(todoList.getTodos());
  }
}

class Todo {
  private String task;
  private boolean isDone;

  Todo(String task) {
    this.task = task;
    isDone = false;
  }

  public void complete() {
    this.isDone = true;
  }

  public boolean isCompleted() {
    return this.isDone;
  }

  public String getTask() {
    return this.task;
  }

  @Override
  public String toString() {
    return this.task + " : " + (this.isDone ? "완료" : "미완료");
  }
}

class TodoList {
  private List<Todo> todos = new ArrayList<>();

  public void addTodo(Todo todo) {
    this.todos.add(todo);
  }

  public void removeTodo(Todo todo) {
    todos.forEach(t -> {
      if (t.getTask().equals(todo.getTask())) {
        todos.remove(t);
        System.out.println(todo.getTask() + " 작업을 삭제했습니다.");
        return;
      }
    });

    System.out.println(todo.getTask() + " 작업을 찾을 수 없습니다.");
  }

  public void complete(int index) {
    if (index >= 0 && index < todos.size()) {
      todos.get(index).complete();
    }
  }

  public void remove(int index) {
    if (index >= 0 && index < todos.size()) {
      todos.remove(index);
    }
  }

  public List<Todo> getTodos() {
    return this.todos;
  }
}