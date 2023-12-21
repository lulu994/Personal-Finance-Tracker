import React from 'react';
import axios from 'axios';

function LogoutButton() {
  const handleLogout = async () => {
    try {
      // Send logout request to the backend
      await axios.post('http://localhost:5000/logout');

      // Handle successful logout (e.g., redirect to login page)
      console.log('Logout successful');
    } catch (error) {
      // Handle errors and display an error message
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
