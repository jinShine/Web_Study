import React from 'react'
import TodoListItem from './TodoListItem'
import './TodoList.scss'

const TodoList = ({todos, onRemove, onToggle}) => {
  console.log('LIST')
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoListItem key={todo.id} todo={todo} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  )
}

export default TodoList
