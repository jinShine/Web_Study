import React from 'react'
import {MdCheckBoxOutlineBlank, MdCheckBox, MdRemoveCircleOutline} from 'react-icons/md'
import cn from 'classnames'
import './TodoListItem.scss'

const TodoListItem = ({todo, onRemove, onToggle}) => {
  const {id, text, checked} = todo

  console.log('ITEM')

  return (
    <div className="TodoListItem">
      <div className="checkbox" onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  )
}

export default React.memo(TodoListItem)
