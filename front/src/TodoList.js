import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
    if (inputText.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: inputText, completed: false, isEditing: false }]);
    setInputText('');
  };

  const moveTodo = (dragIndex, hoverIndex) => {
    const dragTodo = todos[dragIndex];
    setTodos(
      update(todos, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragTodo],
        ],
      }),
    );
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const startEditing = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    ));
  };

  const saveTodo = (id, newText) => {
    if (newText.trim() === '') return;
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
    ));
  };

  const deleteCheckedItems = () => {
    const checkedItems = todos.filter(todo => todo.completed);
    if (checkedItems.length > 0) {
      const confirmDelete = window.confirm("정말 체크 항목을 모두 삭제하시겠습니까?");
      if (confirmDelete) {
        setTodos(todos.filter(todo => !todo.completed));
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='todolist-container'>
        <div className='header'>
          <h1>Todo List</h1>
          <form onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
            <input 
              type="text" 
              placeholder="Write your Todo." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" disabled={!inputText.trim()}>Add</button>
          </form>
        </div>
        <ul className='todo-scroll'>
          {todos
            .sort((a, b) => a.completed - b.completed)
            .map((todo, index) => (
              <TodoItem
                key={todo.id}
                index={index}
                todo={todo}
                moveTodo={moveTodo}
                toggleComplete={toggleComplete}
                startEditing={startEditing}
                saveTodo={saveTodo}
              />
          ))}
        </ul>
        {todos.some(todo => todo.completed) && (
          <button className="fixed-buttons" onClick={deleteCheckedItems}>Delete Checked Items</button>
        )}
      </div>
    </DndProvider>
  );
};

export default TodoList;
