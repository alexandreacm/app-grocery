import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
});

api.defaults.timeout = 60 * 0.3 * 1000; // 30 sec

export default api;
