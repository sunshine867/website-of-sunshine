import { apiClient } from './client';

export const userApi = {
  getAll: (params) => apiClient.get('/users', { params }),
  getById: (id) => apiClient.get(`/users/${id}`),
  create: (data) => apiClient.post('/users', data),
  update: (id, data) => apiClient.put(`/users/${id}`, data),
  delete: (id) => apiClient.delete(`/users/${id}`),
  updateStatus: (id, status) => apiClient.patch(`/users/${id}/status`, { status }),
  updateRole: (id, role) => apiClient.patch(`/users/${id}/role`, { role }),
  exportCSV: () => apiClient.get('/users/export/csv', { responseType: 'blob' }),
  importBulk: (data) => apiClient.post('/users/import/bulk', data),
  getStats: () => apiClient.get('/users/stats/summary'),
};