import { apiClient } from './client';

export const erpApi = {
  // Leads
  createLead: (data) => apiClient.post('/erp/leads', data),
  getLeads: (params) => apiClient.get('/erp/leads', { params }),
  updateLead: (id, data) => apiClient.put(`/erp/leads/${id}`, data),
  
  // Applications
  createApplication: (data) => apiClient.post('/erp/applications', data),
  getApplications: (params) => apiClient.get('/erp/applications', { params }),
  getApplication: (id) => apiClient.get(`/erp/applications/${id}`),
  updateApplication: (id, data) => apiClient.put(`/erp/applications/${id}`, data),
  uploadDocument: (id, formData) => apiClient.post(`/erp/applications/${id}/documents`, formData),
  
  // Universities
  getUniversities: (params) => apiClient.get('/erp/universities', { params }),
  getUniversity: (id) => apiClient.get(`/erp/universities/${id}`),
  
  // Countries
  getCountries: () => apiClient.get('/erp/countries'),
  
  // Visa
  createVisa: (data) => apiClient.post('/erp/visa', data),
  updateVisa: (id, data) => apiClient.put(`/erp/visa/${id}`, data),
  getVisaStatus: (id) => apiClient.get(`/erp/visa/${id}`),
  
  // Dashboard
  getDashboardStats: () => apiClient.get('/erp/dashboard/stats'),
};