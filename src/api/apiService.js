import axios from 'axios'
import { getTokenCookie } from './cookie';

// const URI = 'http://127.0.0.1:8091/api'
const URI = 'https://tanya-app-production.up.railway.app/api/'

export const apiService = axios.create({
  baseURL: URI
})

export const apiHeaderService =  axios.create({
    baseURL: URI
});

apiHeaderService.interceptors.request.use(
  (config) => {
    const token = getTokenCookie();
    config.headers['X-API-TOKEN'] = token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
