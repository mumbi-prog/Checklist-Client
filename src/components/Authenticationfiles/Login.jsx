import React, { useState } from 'react';
import api from '../api/Api';

function Login({ setUser }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.status === 'logged_in') {
        setUser(response.data.user);
        alert('Login successful');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid email or password');
    }
  };

  return
};

export default Login;
