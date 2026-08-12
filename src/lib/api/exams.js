import { apiClient } from './client';

export const examsApi = {
  getAll: (params) => apiClient.get('/exams', { params }),
  getAvailable: () => apiClient.get('/exams/available'),
  start: (id) => apiClient.get(`/exams/${id}/start`),
  submit: (id, data) => apiClient.post(`/exams/${id}/submit`, data),
  saveProgress: (id, data) => apiClient.post(`/exams/${id}/save-progress`, data),
  pause: (id) => apiClient.post(`/exams/${id}/pause`),
  resume: (id) => apiClient.post(`/exams/${id}/resume`),
  getResult: (attemptId) => apiClient.get(`/exams/results/${attemptId}`),
  getMyResults: () => apiClient.get('/exams/my-results'),
  getLeaderboard: (id) => apiClient.get(`/exams/leaderboard/${id}`),
  create: (data) => apiClient.post('/exams', data),
  update: (id, data) => apiClient.put(`/exams/${id}`, data),
  delete: (id) => apiClient.delete(`/exams/${id}`),
  addQuestions: (id, questions) => apiClient.post(`/exams/${id}/questions`, { questions }),
  getAnalytics: (id) => apiClient.get(`/exams/${id}/analytics`),
  getQuestionBank: (params) => apiClient.get('/exams/questions/bank', { params }),
  createQuestion: (data) => apiClient.post('/exams/questions', data),
  updateQuestion: (id, data) => apiClient.put(`/exams/questions/${id}`, data),
};