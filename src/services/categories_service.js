import axios from 'axios';

const API_URL = 'http://test.smartsto0re.shop/api/Categories'; 
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};
