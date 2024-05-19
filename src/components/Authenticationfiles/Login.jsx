import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/Api';
import './login.css';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.status === 'logged_in') {
        setUser(response.data.user);
        navigate('/new-checklist');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className='form-container bg-button-color cover'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2>DTL ICT CHECKLIST</h2>
        <div className='d2 block'>
          <label className='auth-label block text-sm font-medium text-white-900'>Email:</label>
          <input className='mt-[10px] mb-[15px] p-2 w-[300px] rounded-md bg-white focus:outline-none text-sm text-black-900' placeholder='email@dakawou.com' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='d2'>
          <label className='auth-label block text-sm font-medium text-white-900'>Password:</label>
          <input className='mt-[10px] p-2 w-[300px] rounded-md bg-white focus:outline-none text-sm text-black-900' placeholder='Enter password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className='login-btn'>Login</button>
      </form>
    </div>
  );
};

export default Login;
