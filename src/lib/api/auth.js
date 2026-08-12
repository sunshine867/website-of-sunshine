import { apiClient } from './client';

export const authApi = {
  login: (data) => apiClient.post('/auth/login', data),
  register: (data) => apiClient.post('/auth/register', data),
  logout: () => apiClient.post('/auth/logout'),
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.put('/users/profile', data),
  verifyEmail: (token) => apiClient.post('/auth/verify-email', { token }),
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (data) => apiClient.post('/auth/reset-password', data),
  changePassword: (data) => apiClient.post('/auth/change-password', data),
  refreshToken: (refreshToken) => apiClient.post('/auth/refresh-token', { refreshToken }),
  sendPhoneOTP: (phone) => apiClient.post('/auth/phone/send-otp', { phone }),
  verifyPhoneOTP: (data) => apiClient.post('/auth/phone/verify-otp', data),
  googleAuth: (token) => apiClient.post('/auth/social/google', { token }),
  facebookAuth: (token) => apiClient.post('/auth/social/facebook', { token }),
};