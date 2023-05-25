import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import Register from './components/register';
import Login from './components/login';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if a token is stored in local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks', {
          headers: { Authorization: token },
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const handleCreateTask = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/tasks',
        { title },
        { headers: { Authorization: token } }
      );
      setTasks([...tasks, response.data.task]);
      setTitle('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
        headers: { Authorization: token },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTaskCompletion = async (taskId, completed, title) => {
    try {
      await axios.put(
        `http://localhost:5000/tasks/${taskId}`,
        { completed: !completed, title },
        { headers: { Authorization: token } }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !completed } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Store the token in local storage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <div className='app-main'>
      <h1>To-Do App</h1>
      {token ? (
        <div className='app-tasks'>
          <div className='new-task'>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleCreateTask}>Create Task</button>
          </div>
          <ul className='current-tasks'>
            {tasks.map((task) => (
              <li
                key={task.id}
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
                className='task-item'
              >
                {task.title}
                <div>
                  <button onClick={() => handleToggleTaskCompletion(task.id, task.completed, task.title)} className='button-complete'>
                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className='app-auth'>
          <Login setToken={setToken} />
          <div className='auth-divider'>
            <hr />
            <span>or</span>
            <hr />
          </div>
          <Register setToken={setToken} />
        </div>
      )}
    </div>
  );
};

export default App;
