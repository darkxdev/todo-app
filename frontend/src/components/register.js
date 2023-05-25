import React, { useState } from 'react';
import axios from 'axios';

// This component represents a registration form
const Register = ({ setToken, setNotice }) => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the registration process
  const handleRegister = async () => {
    if (!username || !password) {
      setNotice('Please fill in all fields before registering');
      return;
    }

    if (username.length < 4 || password.length < 4) {
      setNotice('Username and password should be at least 4 characters long');
      return;
    }

    try {
      // Send a POST request to the server to register the user
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/auth/register`, {
        username,
        password,
      });

      // If the registration is successful, set the token received from the server
      setToken(response.data.token);
      setNotice('Successfully registered.')

      // Clear the input fields
      setUsername('');
      setPassword('');
    } catch (error) {
      setNotice('Something went wrong, please try again')
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
