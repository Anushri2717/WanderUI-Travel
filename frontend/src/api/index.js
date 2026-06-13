import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('wandr_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register : (data) => api.post('/auth/register', data),
  login    : (data) => api.post('/auth/login',    data),
  me       : ()     => api.get('/auth/me'),
};

export const destinationsAPI = {
  getAll : (params) => api.get('/destinations',    { params }),
  getById: (id)     => api.get(`/destinations/${id}`),
};

export const bookingsAPI = {
  create : (data) => api.post('/bookings',           data),
  getMy  : ()     => api.get('/bookings/my'),
  cancel : (id)   => api.patch(`/bookings/${id}/cancel`),
};

export const reviewsAPI = {
  create: (data) => api.post('/reviews', data),
};

export default api;