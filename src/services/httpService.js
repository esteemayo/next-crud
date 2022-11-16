import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';

const devEnv = process.env.NODE_ENV !== 'production';

const NEXT_PUBLIC_API_DEV_URL = process.env.NEXT_PUBLIC_API_DEV_URL;
const NEXT_PUBLIC_API_PROD_URL = process.env.NEXT_PUBLIC_API_PROD_URL;

const authFetch = axios.create({
  baseURL: devEnv ? NEXT_PUBLIC_API_DEV_URL : NEXT_PUBLIC_API_PROD_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

authFetch.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurred');
  }

  return Promise.reject(error);
});

const http = {
  get: authFetch.get,
  post: authFetch.post,
  patch: authFetch.patch,
  delete: authFetch.delete,
};

export default http;
