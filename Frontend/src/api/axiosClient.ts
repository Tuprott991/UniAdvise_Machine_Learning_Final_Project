import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://uniadvise-be-fastapi.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
