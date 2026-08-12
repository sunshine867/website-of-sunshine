import { apiClient } from './client';

export const searchApi = {
  globalSearch: (query, type) => apiClient.get('/search', { params: { q: query, type } }),
};