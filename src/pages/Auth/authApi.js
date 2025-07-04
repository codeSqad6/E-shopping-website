import axios from 'axios';

const API_BASE = 'http://test.smartsto0re.shop/api'; // غيّرها حسب رابطك

export const loginUser = (data) => axios.post(`${API_BASE}/Auth/Login`, data);
export const registerUser = (data) => axios.post(`${API_BASE}/Auth/register`, data);
export const sendVerificationCode = (data) => axios.post(`${API_BASE}/Auth/verifyEmail`, data);
export const forgotPassword = (email) =>
  axios.post(`${API_BASE}/Auth/resendEmailCode`, 
    { email }, 
    { headers: { "Content-Type": "application/json" } }
  );
export const resetPassword = (data) => axios.post(`${API_BASE}/Auth/ResetPassword`, data);
