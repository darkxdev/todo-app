import React, { useState } from 'react';
import axios from 'axios';

// This component represents a login form
const Login = ({ setToken, setNotice }) => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the login process
  const handleLogin = async () => {
    try {
      // Send a POST request to the server to authenticate the user
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/auth/login`, {
        username,
        password,
      });

      // If the login is successful, set the token received from the server
      setToken(response.data.token);
      setNotice('Successfully logged in.')

      // Clear the input fields
      setUsername('');
      setPassword('');
    } catch (error) {
      setNotice('Invalid Username or Password.')
    }
  };

  // Render the login form
  return (
    <div className='auth'>
      <h3>Login</h3>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
