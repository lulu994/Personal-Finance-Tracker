// components/Auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Send a login request to your backend
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      // Assuming your backend returns a token upon successful login
      const token = response.data.token;

      // Now, you can handle the token
      // For example, store it in localStorage
      localStorage.setItem('token', token);

      // You might also want to update the state or trigger a redirect
      // depending on your application's navigation flow
      // updateStateWithToken(token);

      console.log('Login successful! Token:', token);
    } catch (error) {
      // Handle login error, e.g., show an error message
      console.error('Login failed:', error.message);
      // Optionally, reset the password field or show an error message to the user
      setPassword('');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;

