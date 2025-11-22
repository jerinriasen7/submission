import api from './api';

export const login = async (email, password) => {
  const res = await api.post('/users/login', { email, password });
  return res.data;
};
