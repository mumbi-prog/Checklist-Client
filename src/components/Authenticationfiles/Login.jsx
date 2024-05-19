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

  return (
    <form onSubmit={handleSubmit} className='login-form bg-button-color cover'>
      <h2>DTL ICT CHECKLIST</h2>
      <label className='auth-label'>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label className='auth-label'>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit" className='auth-btn'>Login</button>
    </form>
  );
};

export default Login;
