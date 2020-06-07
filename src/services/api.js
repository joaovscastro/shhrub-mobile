import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app.supercrush.com.br/wp-json',
});

export default api;
