import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Assuming your backend has an authentication endpoint like /api/auth/login
    axios.post('http://localhost:5000/api/auth/login', {
      username,
      password,
    })
      .then(response => {
        // Assuming the backend returns a JWT token upon successful login
        const token = response.data.token;

        // Save the token in local storage or a cookie for future requests
        localStorage.setItem('token', token);

        // Notify the parent component that the user has successfully logged in
        onLogin();
      })
      .catch(error => {
        console.error('Error during login:', error);
        // Handle login error (display error message, etc.)
      });
  };

  return (
    <div>
      <h2>Login</h2>
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
