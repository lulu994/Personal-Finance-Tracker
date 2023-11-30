import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const history = useHistory();

  // State for form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Send registration data to the backend
      const response = await axios.post('YOUR_BACKEND_API_ENDPOINT/register', formData);

      // Handle success (you may want to handle errors differently)
      console.log('Registration successful:', response.data);

      // Redirect to login page after successful registration
      history.push('/auth/login');
    } catch (error) {
      console.error('Registration error:', error.message);
      // Handle registration errors here (display error messages, etc.)
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
