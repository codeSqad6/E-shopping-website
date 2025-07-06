// api/products.js
import axios from 'axios';

const API_BASE = 'http://test.smartsto0re.shop/api';

export const getProducts = (pageNumber = 1, pageSize = 10) => {
  return axios.get(`${API_BASE}/Products`, {
    params: { pageNumber, pageSize }
  });
};
