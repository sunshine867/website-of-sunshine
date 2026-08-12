// apps/web/src/lib/data/api-wrapper.js

import { apiClient } from '@/lib/api/client';
import { dataSource } from './data-source';
import { demoData } from './demo-data';

class ApiWrapper {
  async call(endpoint, method = 'get', params = null, data = null) {
    if (dataSource.isDemo()) {
      return this.getDemoResponse(endpoint, method);
    }
    return this.getProductionResponse(endpoint, method, params, data);
  }

  async getDemoResponse(endpoint, method) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

    // Route to demo data based on endpoint
    const routes = {
      'GET /courses': () => demoData.getCourses(),
      'GET /courses/my/enrollments': () => demoData.getEnrollments(),
      'GET /users': () => demoData.getUsers(),
      'GET /erp/leads': () => demoData.getLeads(),
      // ... more routes
    };

    const key = `${method.toUpperCase()} ${endpoint.split('?')[0]}`;
    const handler = routes[key];

    if (handler) {
      return { data: handler() };
    }

    // Return empty success for unmatched routes
    return { data: { success: true, data: [] } };
  }

  async getProductionResponse(endpoint, method, params, data) {
    try {
      const response = await apiClient({
        method,
        url: endpoint,
        params,
        data,
      });
      return response;
    } catch (error) {
      // Fallback to demo data on error
      console.warn(`API call failed for ${endpoint}, using demo data:`, error.message);
      return this.getDemoResponse(endpoint, method);
    }
  }
}

export const apiWrapper = new ApiWrapper();