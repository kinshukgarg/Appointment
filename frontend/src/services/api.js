import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const login = async (email, password) => {
  const response = await api.post('/api/login', { email, password });
  return response.data.token;
};

export const register = async (name, email, phone, role, password) => {
  const response = await api.post('/api/register', { name, email, phone, role, password });
  return response.data.token;
};

export const createAppointment = async (appointmentData, token) => {
  await api.post('/api/appointments', appointmentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTeachers = async (token) => {
  return await api.get('/api/teachers', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};
