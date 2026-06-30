/**
 * Axios HTTP client configuration for interacting with the UniAdvise backend API.
 *
 * This client is pre-configured with a base URL pointing to the FastAPI server
 * and includes default headers for JSON content.
 *
 * @module axiosClient
 */

import axios from 'axios';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? 'https://uniadvise-be-fastapi.onrender.com/api'
    : 'http://127.0.0.1:8000/api');

/**
 * A pre-configured instance of Axios for making HTTP requests to the UniAdvise API.
 *
 * @remarks
 * This instance sets the `baseURL` to `https://uniadvise-be-fastapi.onrender.com/api`
 * and uses `application/json` as the default `Content-Type` for all requests.
 */
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
