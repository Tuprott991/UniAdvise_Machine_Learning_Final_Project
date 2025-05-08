import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://uniadvise-be-fastapi.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;