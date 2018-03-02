import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1'
});

instance.interceptors.request.use((config) => {
  config.headers['x-access-token'] = localStorage.getItem('authToken');
  return config;
});

export default instance;
