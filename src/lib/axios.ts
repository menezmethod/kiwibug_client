import axios from 'axios';

import { API_URL } from '@/config';

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    return Promise.reject(error);
  }
);
