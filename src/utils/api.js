import axios from 'axios';

let baseURL = 'http://localhost:3001';

const api = axios.create({
  baseURL,
});

export default api;
