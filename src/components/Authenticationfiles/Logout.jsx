import React from 'react';
import api from '../api/Api';

const Logout = ({ setUser }) => {
  const handleLogout = async () => {
    try {
      await api.delete('/logout');
      setUser(null);
      alert('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
