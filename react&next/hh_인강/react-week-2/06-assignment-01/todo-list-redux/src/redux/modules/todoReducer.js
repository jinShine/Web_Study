/* Action Types */

export const ADD_TODO = "TODO/ADD_TODO";
export const DELETE_TODO = "TODO/DELETE_TODO";
export const UPDATE_STATE_TODO = "TODO/UPDATE_STATE_TODO";
export const GET_TODO_BY_ID = "TODO/GET_TODO_BY_ID";

/* Action Creator */

export const addTodo = (payload) => {
  return { type: ADD_TODO, payload };
};

export const deleteTodo = (payload) => {
  return { type: DELETE_TODO, payload };
};

export const updateTodoState = (payload) => {
  return { type: UPDATE_STATE_TODO, payload };
};

export const getTodoByID = (payload) => {
  return { type: GET_TODO_BY_ID, payload };
};

/* Reducer */

const initialState = {
  todo: { id: 0, title: "", content: "", isDone: false },
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case UPDATE_STATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, isDone: !todo.isDone };
          }

          return todo;
        }),
      };
    case GET_TODO_BY_ID:
      return {
        ...state,
        todo: state.todos.find((todo) => todo.id === parseInt(action.payload)),
      };
    default:
      return state;
  }
};

export default todoReducer;
