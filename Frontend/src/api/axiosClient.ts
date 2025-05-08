/**
 * Axios HTTP client configuration for interacting with the UniAdvise backend API.
 *
 * This client is pre-configured with a base URL pointing to the FastAPI server
 * and includes default headers for JSON content.
 *
 * @module axiosClient
 */

import axios from 'axios';

/**
 * A pre-configured instance of Axios for making HTTP requests to the UniAdvise API.
 *
 * @remarks
 * This instance sets the `baseURL` to `https://uniadvise-be-fastapi.onrender.com/api`
 * and uses `application/json` as the default `Content-Type` for all requests.
 */
const axiosClient = axios.create({
  baseURL: 'https://uniadvise-be-fastapi.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
