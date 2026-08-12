import { apiClient } from './client';

export const analyticsApi = {
  getDashboardAnalytics: () => apiClient.get('/analytics/dashboard'),
  getRevenueAnalytics: (params) => apiClient.get('/analytics/revenue', { params }),
  getStudentAnalytics: () => apiClient.get('/analytics/students'),
  getCourseAnalytics: () => apiClient.get('/analytics/courses'),
  getExamAnalytics: () => apiClient.get('/analytics/exams'),
  generateReport: (params) => apiClient.get('/analytics/reports/generate', { params }),
  exportReport: (params) => apiClient.get('/analytics/reports/export', { params, responseType: 'blob' }),
  getActivityLog: (params) => apiClient.get('/analytics/activity-log', { params }),
  getAuditLogs: (params) => apiClient.get('/analytics/audit-logs', { params }),
};