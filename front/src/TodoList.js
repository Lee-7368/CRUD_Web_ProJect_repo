import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
    if (inputText.trim() === '') return;

    setTodos([...todos, { id: Date.now(), text: inputText, completed: false, isEditing: false }]);
    setInputText('');
  };

  const deleteTodo = (id) => {
    const confirmDelete = window.confirm("정말로 삭제하나요?");
    if (confirmDelete) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const editTodo = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, isEditing: true } : todo)));
  };

  const saveTodo = (id, newText) => {
    if (newText.trim() === '') return;
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText, isEditing: false } : todo)));
  };

  const deleteCheckedItems = () => {
    const checkedItems = todos.filter(todo => todo.completed);
    if (checkedItems.length > 0) {
      const confirmDelete = window.confirm("정말로 체크된 항목을 모두 삭제하시겠습니까?");
      if (confirmDelete) {
        setTodos(todos.filter(todo => !todo.completed));
      }
    }
  };

  return (
    <div className='todolist-container'>
      <h1>TO DO - LIST</h1>

      <form onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
        <input 
          type="text" 
          placeholder="Write your Todo." 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" disabled={!inputText.trim()}>Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div className="round">
              <input 
                type="checkbox" 
                id={`todo-${todo.id}`} // 아이디 추가
                checked={todo.completed} 
                onChange={() => toggleComplete(todo.id)}
              />
              <label htmlFor={`todo-${todo.id}`}></label> {/* htmlFor 추가 */}
            </div>
            {todo.isEditing ? (
              <input 
                type="text"
                defaultValue={todo.text}
                onBlur={(e) => saveTodo(todo.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    saveTodo(todo.id, e.target.value);
                  }
                }}
                autoFocus
              />
            ) : (
              <span>{todo.text}</span>
            )}
            <div>
              <button onClick={() => editTodo(todo.id)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {todos.some(todo => todo.completed) && (
        <button onClick={deleteCheckedItems}>Delete Checked Items</button>
      )}
    </div>
  );
};

export default TodoList;
