import { apiClient } from './client';

export const paymentsApi = {
  initialize: (data) => apiClient.post('/payments/initialize', data),
  verify: (data) => apiClient.post('/payments/verify', data),
  getHistory: (params) => apiClient.get('/payments/history', { params }),
  getById: (id) => apiClient.get(`/payments/${id}`),
  uploadProof: (id, formData) => apiClient.post(`/payments/${id}/upload-proof`, formData),
  getInvoices: (params) => apiClient.get('/payments/invoices/list', { params }),
  getInvoice: (id) => apiClient.get(`/payments/invoices/${id}`),
  downloadInvoice: (id) => apiClient.get(`/payments/invoices/${id}/download`, { responseType: 'blob' }),
  getScholarships: () => apiClient.get('/payments/scholarships/available'),
  applyScholarship: (data) => apiClient.post('/payments/scholarships/apply', data),
  getMyScholarshipApplications: () => apiClient.get('/payments/scholarships/my-applications'),
};