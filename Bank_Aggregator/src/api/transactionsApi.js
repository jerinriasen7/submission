import api from './api';

export const getTransactions = async (accountId) => {
  const res = await api.get(`/transactions/${accountId}`);
  return res.data;
};

export const getTransactionsByDate = async (accountId, startDate, endDate) => {
  const res = await api.get(`/transactions/${accountId}?start=${startDate}&end=${endDate}`);
  return res.data;
};
