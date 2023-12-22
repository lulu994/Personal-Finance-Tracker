import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
	    const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

	     const token = response.data.token;

	     localStorage.setItem('token', token);
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
