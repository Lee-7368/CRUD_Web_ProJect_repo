import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import TodoItem from './TodoItem';
import Modal from './Modal';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (inputText.trim() === '') return;
    try {
      const response = await axios.post('http://localhost:8080/api/todos', {
        title: inputText,
        completed: false
      });
      setTodos([...todos, response.data]);
      setInputText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
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

  const toggleComplete = async (id) => {
    try {
      const todo = todos.find(todo => todo.id === id);
      const response = await axios.put(`http://localhost:8080/api/todos/${id}`, {
        ...todo,
        completed: !todo.completed
      });
      setTodos(todos.map(todo =>
        todo.id === id ? response.data : todo
      ));
    } catch (error) {
      console.error('Error toggling complete:', error);
    }
  };

  const startEditing = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    ));
  };

  const saveTodo = async (id, newText) => {
    if (!newText || newText.trim() === '') return;
    try {
      const response = await axios.put(`http://localhost:8080/api/todos/${id}`, {
        ...todos.find(todo => todo.id === id),
        title: newText,
        isEditing: false
      });
      setTodos(todos.map(todo =>
        todo.id === id ? response.data : todo
      ));
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const deleteCheckedItems = async () => {
    const checkedItems = todos.filter(todo => todo.completed);
    if (checkedItems.length > 0) {
      setShowModal(true);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const deletePromises = todos.filter(todo => todo.completed).map(todo => axios.delete(`http://localhost:8080/api/todos/${todo.id}`));
      await Promise.all(deletePromises);
      setTodos(todos.filter(todo => !todo.completed));
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting todos:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        <Modal show={showModal} handleClose={handleCloseModal} handleConfirm={handleConfirmDelete} />
      </div>
    </DndProvider>
  );
};

export default TodoList;
