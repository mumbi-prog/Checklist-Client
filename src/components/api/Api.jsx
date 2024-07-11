import axios from 'axios';

const api = axios.create({
  baseURL: 'https://checklist-api-uo6u.onrender.com', 
  withCredentials: true,
});

export default api;
