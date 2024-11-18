// axiosClient.ts
import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_BASE_URL_PRODUCTION
    : process.env.REACT_APP_API_BASE_URL_DEVELOPMENT;

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Request interceptor to add authorization token
// axiosClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }else{
//       config.headers.Authorization = 'Bearer NoToken'
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosClient;
