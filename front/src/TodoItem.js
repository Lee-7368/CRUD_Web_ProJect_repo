

import React, { useRef, useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  TODO: 'todo',
};

const TodoItem = ({ todo, index, moveTodo, toggleComplete, startEditing, saveTodo }) => {
  const ref = useRef(null);
  const [editText, setEditText] = useState(todo.title || '');

  useEffect(() => {
    if (todo.isEditing) {
      setEditText(todo.title || '');
    }
  }, [todo.isEditing, todo.title]);

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
    if (editText.trim() !== '') {
      saveTodo(todo.id, editText);
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
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveClick();
              }
            }}
            autoFocus
          />
        ) : (
          <span>{todo.title}</span>
        )}
      </div>
      <div className="todo-actions">
        <button onClick={() => {
          if (todo.isEditing) {
            handleSaveClick();
          } else {
            setEditText(todo.title);
            startEditing(todo.id);
          }
        }}>
          {todo.isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
