import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';

const ItemTypes = {
  TODO: 'todo',
};

const TodoItem = ({ todo, index, moveTodo, toggleComplete, startEditing, saveTodo }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.TODO,
    hover(item) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveTodo(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TODO,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleSaveClick = () => {
    if (ref.current) {
      const inputValue = ref.current.value;
      saveTodo(todo.id, inputValue);
    }
  };

  return (
    <li ref={ref} className={todo.completed ? 'completed' : ''} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="round">
        <input 
          type="checkbox" 
          id={`todo-${todo.id}`} 
          checked={todo.completed} 
          onChange={() => toggleComplete(todo.id)}
        />
        <label htmlFor={`todo-${todo.id}`}></label>
      </div>
      <div className="todo-content">
        {todo.isEditing ? (
          <input
            type="text"
            defaultValue={todo.text}
            ref={ref}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveClick();
              }
            }}
            autoFocus
          />
        ) : (
          <span>{todo.text}</span>
        )}
        <div>
          <button onClick={() => {
            if (todo.isEditing) {
              handleSaveClick();
            } else {
              startEditing(todo.id);
            }
          }}>
            {todo.isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
