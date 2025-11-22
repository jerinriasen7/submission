import axios from 'axios';
const API_URL = 'https://localhost:5001/api/banks';

export const getBanks = async () => {
    const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return res.data;
};
