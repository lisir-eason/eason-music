import axios from 'axios';

//vercel
const baseUrl = 'https://musicapi-d6wlaf5h9-liqiangnd.vercel.app';
//nd
// const baseUrl = 'http://192.168.214.50:3000';

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
