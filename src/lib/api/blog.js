import { apiClient } from './client';

export const blogApi = {
  getPosts: (params) => apiClient.get('/blog', { params }),
  getPostBySlug: (slug) => apiClient.get(`/blog/${slug}`),
  getCategories: () => apiClient.get('/blog/categories/list'),
  createPost: (data) => apiClient.post('/blog', data),
  updatePost: (id, data) => apiClient.put(`/blog/${id}`, data),
  deletePost: (id) => apiClient.delete(`/blog/${id}`),
};