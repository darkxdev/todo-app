import React, { useState } from 'react';
import axios from 'axios';

// This component represents a registration form
const Register = ({ setToken }) => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the registration process
  const handleRegister = async () => {
    try {
      // Send a POST request to the server to register the user
      const response = await axios.post(`${process.env.API_HOST}/auth/register`, {
        username,
        password,
      });

      // If the registration is successful, set the token received from the server
      setToken(response.data.token);

      // Clear the input fields
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  // Render the registration form
  return (
    <div className='auth'>
      <h3>Register</h3>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
