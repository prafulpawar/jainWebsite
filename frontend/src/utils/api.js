import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:5000/api'
     baseURL: import.meta.env.VITE_API_BASE_URL || 'https://jsot-api.cloudgenz.com/api'
});

// Add a request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;