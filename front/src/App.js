// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';
// import DateTime from './DateTime';

// function App() {
//     const [tasks, setTasks] = useState([]);
//     const [title, setTitle] = useState('');

//     useEffect(() => {
//         fetchTasks();
//     }, []);

//     const fetchTasks = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/todos');
//             setTasks(response.data);
//         } catch (error) {
//             console.error('Error fetching tasks:', error);
//         }
//     };

//     const addTask = async () => {
//         if (title) {
//             try {
//                 const response = await axios.post('http://localhost:8080/api/todos', {
//                     title,
//                     completed: false,
//                 });
//                 setTasks([...tasks, response.data]);
//                 setTitle('');
//             } catch (error) {
//                 console.error('Error adding task:', error);
//             }
//         }
//     };

//     const updateTask = async (id, updatedTask) => {
//         try {
//             const response = await axios.put(`http://localhost:8080/api/todos/${id}`, updatedTask);
//             setTasks(tasks.map(task => (task.id === id ? response.data : task)));
//         } catch (error) {
//             console.error('Error updating task:', error);
//         }
//     };

//     const deleteTask = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8080/api/todos/${id}`);
//             setTasks(tasks.filter(task => task.id !== id));
//         } catch (error) {
//             console.error('Error deleting task:', error);
//         }
//     };

//     const handleComplete = async (task) => {
//         const updatedTask = { ...task, completed: !task.completed };
//         await updateTask(task.id, updatedTask);
//     };

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <h1>Todo List</h1>
//                 <div className="form">
//                     <input
//                         type="text"
//                         placeholder="Title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                     <button onClick={addTask}>Add Task</button>
//                 </div>
//                 <ul>
//                     {tasks.map(task => (
//                         <li key={task.id} className={task.completed ? 'completed' : ''}>
//                             <span>{task.title}</span>
//                             <button onClick={() => handleComplete(task)}>
//                                 {task.completed ? 'Undo' : 'Complete'}
//                             </button>
//                             <button onClick={() => deleteTask(task.id)}>Delete</button>
//                         </li>
//                     ))}
//                 </ul>
//             </header>
//         </div>
//     );
// }

// export default App;

import React from 'react';
import TodoList from './TodoList';
import DateTime from './DateTime';


const App = () => {
  return (
    <div className="App">
        <DateTime/>
      <TodoList />
     
    </div>
  );
}

export default App;

