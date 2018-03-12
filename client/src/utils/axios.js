import axios from 'axios';
import host from './host';

const instance = axios.create({
  baseURL: host
});

instance.interceptors.request.use((config) => {
  config.headers['x-access-token'] = localStorage.getItem('authToken');
  return config;
});

export default instance;
