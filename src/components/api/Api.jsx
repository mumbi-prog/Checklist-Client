// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://checklist-api-uo6u.onrender.com', 
//   withCredentials: true,
// });

// export default api;

// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://checklist-api-uo6u.onrender.com',
  withCredentials: true,
});

// Retrieve the token from localStorage
const token = localStorage.getItem('token');

// Set the token in the axios instance if it exists
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;

