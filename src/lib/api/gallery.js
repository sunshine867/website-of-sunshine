import { apiClient } from './client';

export const galleryApi = {
  getPhotos: () => apiClient.get('/gallery/photos'),
  getPhotoGallery: (id) => apiClient.get(`/gallery/photos/${id}`),
  createPhotoGallery: (data) => apiClient.post('/gallery/photos', data),
  updatePhotoGallery: (id, data) => apiClient.put(`/gallery/photos/${id}`, data),
  deletePhotoGallery: (id) => apiClient.delete(`/gallery/photos/${id}`),
  uploadPhotos: (id, formData) => apiClient.post(`/gallery/photos/${id}/images`, formData),
  deletePhoto: (id) => apiClient.delete(`/gallery/photos/images/${id}`),
  
  getVideos: () => apiClient.get('/gallery/videos'),
  createVideo: (data) => apiClient.post('/gallery/videos', data),
  deleteVideo: (id) => apiClient.delete(`/gallery/videos/${id}`),
  
  getSuccessStories: () => apiClient.get('/gallery/success-stories'),
  createSuccessStory: (data) => apiClient.post('/gallery/success-stories', data),
  approveStory: (id) => apiClient.patch(`/gallery/success-stories/${id}/approve`),
  
  getEvents: (params) => apiClient.get('/gallery/events', { params }),
  getFAQs: (params) => apiClient.get('/gallery/faqs', { params }),
  getCareers: () => apiClient.get('/gallery/careers'),
  submitInquiry: (data) => apiClient.post('/gallery/inquiries', data),
  subscribeNewsletter: (email, name) => apiClient.post('/gallery/newsletter/subscribe', { email, name }),
};