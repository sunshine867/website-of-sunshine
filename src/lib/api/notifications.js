import { apiClient } from './client';

export const notificationApi = {
  getAll: (params) => apiClient.get('/notifications', { params }),
  getUnreadCount: () => apiClient.get('/notifications/unread-count'),
  markAsRead: (id) => apiClient.put(`/notifications/${id}/read`),
  markAllAsRead: () => apiClient.put('/notifications/read-all'),
  delete: (id) => apiClient.delete(`/notifications/${id}`),
  updatePreferences: (data) => apiClient.put('/notifications/preferences', data),
};