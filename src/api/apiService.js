import axios from 'axios'
import { getTokenCookie } from './cookie';

const URI = 'http://127.0.0.1:8091/api'

export const apiService = axios.create({
  baseURL: URI
})

export const apiHeaderService = axios.create({
    baseURL: URI,
    headers: {
      'X-API-TOKEN': getTokenCookie()
    }
});

const createApiHeaderService = () => {
  const token = getTokenCookie();
  
  return axios.create({
    baseURL: URI,
    headers: {
      'X-API-TOKEN': token,
    },
  });
};

export const getApiHeaderService = () => {
  return createApiHeaderService();
};

