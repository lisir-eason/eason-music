import axios from 'axios';

const baseUrl = 'https://musicapi-d6wlaf5h9-liqiangnd.vercel.app';

const api = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
});

export default api;
