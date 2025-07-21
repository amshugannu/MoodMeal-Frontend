import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api/users/register', // Adjust if your backend is hosted elsewhere
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
