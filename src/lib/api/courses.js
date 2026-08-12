import { apiClient } from './client';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

// Create a simple function that includes the auth token
const getAuthHeaders = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  return {};
};


export const coursesApi = {
  getAll: (params) => apiClient.get('/courses', { params }),
  getFeatured: () => apiClient.get('/courses/featured'),
  getBySlug: (slug) => apiClient.get(`/courses/slug/${slug}`),
  getById: (id) => apiClient.get(`/courses/${id}`),
  create: (data) => apiClient.post('/courses', data),
  update: (id, data) => apiClient.put(`/courses/${id}`, data),
  delete: (id) => apiClient.delete(`/courses/${id}`),
  enroll: (id, data) => apiClient.post(`/courses/${id}/enroll`, data),
  addReview: (id, data) => apiClient.post(`/courses/${id}/review`, data),
  getReviews: (id) => apiClient.get(`/courses/${id}/reviews`),
  getMyEnrollments: () => apiClient.get('/courses/my/enrollments'),
  getProgress: (id) => apiClient.get(`/courses/${id}/progress`),
  addLesson: (id, data) => apiClient.post(`/courses/${id}/lessons`, data),
  updateLesson: (lessonId, data) => apiClient.put(`/courses/lessons/${lessonId}`, data),
  deleteLesson: (lessonId) => apiClient.delete(`/courses/lessons/${lessonId}`),
  publishCourse: (id) => apiClient.patch(`/courses/${id}/publish`),
  featureCourse: (id) => apiClient.patch(`/courses/${id}/feature`),
  getLessons: (id) => apiClient.get(`/courses/${id}/lessons`),
};