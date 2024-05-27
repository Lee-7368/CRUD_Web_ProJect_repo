import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todoApi';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const todos = await getTodos();
        setTodos(todos);
    };

    const handleCreateTodo = async () => {
        if (newTodo.trim() === '') return;
        const newTodoItem = { title: newTodo, completed: false };
        await createTodo(newTodoItem);
        setNewTodo('');
        fetchTodos();
    };

    const handleUpdateTodo = async (id, updatedTodo) => {
        await updateTodo(id, updatedTodo);
        fetchTodos();
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        fetchTodos();
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New Todo"
            />
            <button onClick={handleCreateTodo}>Add Todo</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span>{todo.title}</span>
                        <button onClick={() => handleUpdateTodo(todo.id, { ...todo, completed: !todo.completed })}>
                            {todo.completed ? 'Uncomplete' : 'Complete'}
                        </button>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;