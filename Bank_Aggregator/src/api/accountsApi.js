import axios from "axios";

const API_URL = "http://localhost:5031/api/accounts";

// Get logged-in user's accounts
export const getAccounts = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/my-accounts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // array of account objects
  } catch (err) {
    console.error("Error fetching accounts:", err.response?.data || err.message);
    return null;
  }
};

// Deposit
export const deposit = async (accountId, amount, token) => {
  try {
    const res = await axios.post(
      `${API_URL}/${accountId}/deposit`,
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Deposit error:", err.response?.data || err.message);
    return null;
  }
};

// Withdraw
export const withdraw = async (accountId, amount, token) => {
  try {
    const res = await axios.post(
      `${API_URL}/${accountId}/withdraw`,
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Withdraw error:", err.response?.data || err.message);
    return null;
  }
};

// Transfer
export const transfer = async (fromAccountId, toAccountId, amount, token) => {
  try {
    const res = await axios.post(
      `${API_URL}/transfer`,
      { fromAccountId, toAccountId, amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Transfer error:", err.response?.data || err.message);
    return null;
  }
};
