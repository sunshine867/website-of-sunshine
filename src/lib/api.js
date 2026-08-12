// apps/web/src/lib/api.js

import axios from 'axios';
import { toast } from 'sonner';

// Get API base URL from environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Check if we should use mock data
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || true; // Default to true for now

console.log(`🔧 API Client: ${USE_MOCK ? 'Using MOCK data' : `Connecting to ${API_BASE_URL}`}`);

// ============================================
// MOCK DATA
// ============================================
const MOCK_QUESTION_BANKS = {
  data: [
    {
      id: '1',
      name: 'JLPT N5 Vocabulary',
      code: 'JLPT_N5_VOCAB',
      description: 'Basic vocabulary for JLPT N5 level - 50 questions',
      language: { id: 'ja', name: 'Japanese', flag_emoji: '🇯🇵' },
      subject: { id: '1', name: 'JLPT' },
      difficulty: 'beginner',
      question_count: 50,
      status: 'published',
      visibility: 'public',
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      creator: { full_name: 'Admin User' },
    },
    {
      id: '2',
      name: 'JLPT N5 Grammar',
      code: 'JLPT_N5_GRAMMAR',
      description: 'Basic grammar for JLPT N5 level - 35 questions',
      language: { id: 'ja', name: 'Japanese', flag_emoji: '🇯🇵' },
      subject: { id: '1', name: 'JLPT' },
      difficulty: 'beginner',
      question_count: 35,
      status: 'draft',
      visibility: 'private',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      creator: { full_name: 'Admin User' },
    },
    {
      id: '3',
      name: 'IELTS Academic Reading',
      code: 'IELTS_READING',
      description: 'Reading comprehension for IELTS Academic - 40 questions',
      language: { id: 'en', name: 'English', flag_emoji: '🇬🇧' },
      subject: { id: '2', name: 'IELTS' },
      difficulty: 'intermediate',
      question_count: 40,
      status: 'published',
      visibility: 'shared',
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      creator: { full_name: 'Teacher 1' },
    },
    {
      id: '4',
      name: 'TOPIK Level 1 Vocabulary',
      code: 'TOPIK_1_VOCAB',
      description: 'Basic Korean vocabulary for TOPIK Level 1',
      language: { id: 'ko', name: 'Korean', flag_emoji: '🇰🇷' },
      subject: { id: '3', name: 'TOPIK' },
      difficulty: 'elementary',
      question_count: 60,
      status: 'published',
      visibility: 'public',
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      creator: { full_name: 'Teacher 2' },
    },
    {
      id: '5',
      name: 'JLPT N4 Kanji',
      code: 'JLPT_N4_KANJI',
      description: 'Kanji practice for JLPT N4 level - 100 questions',
      language: { id: 'ja', name: 'Japanese', flag_emoji: '🇯🇵' },
      subject: { id: '1', name: 'JLPT' },
      difficulty: 'elementary',
      question_count: 100,
      status: 'draft',
      visibility: 'private',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      creator: { full_name: 'Admin User' },
    },
  ],
  pagination: {
    total: 5,
    page: 1,
    limit: 20,
    pages: 1,
  },
};

const MOCK_STATS = {
  total: 5,
  published: 3,
  draft: 2,
  archived: 0,
  ai_generated: 15,
  total_questions: 285,
};

const MOCK_LANGUAGES = {
  data: [
    { id: 'en', name: 'English', code: 'en', flag_emoji: '🇬🇧' },
    { id: 'ja', name: 'Japanese', code: 'ja', flag_emoji: '🇯🇵' },
    { id: 'ko', name: 'Korean', code: 'ko', flag_emoji: '🇰🇷' },
    { id: 'ne', name: 'Nepali', code: 'ne', flag_emoji: '🇳🇵' },
    { id: 'zh', name: 'Chinese', code: 'zh', flag_emoji: '🇨🇳' },
  ]
};

const MOCK_SUBJECTS = {
  data: [
    { id: '1', name: 'JLPT', language_id: 'ja' },
    { id: '2', name: 'IELTS', language_id: 'en' },
    { id: '3', name: 'TOPIK', language_id: 'ko' },
    { id: '4', name: 'HSK', language_id: 'zh' },
    { id: '5', name: 'TOEFL', language_id: 'en' },
  ]
};

// ============================================
// MOCK HANDLERS
// ============================================
function mockGet(url) {
  console.log(`[MOCK] GET ${url}`);
  
  // Question banks
  if (url.includes('/question-banks')) {
    // Check if it's a specific bank
    const idMatch = url.match(/\/question-banks\/([^\/?]+)/);
    if (idMatch) {
      const bank = MOCK_QUESTION_BANKS.data.find(b => b.id === idMatch[1]);
      if (bank) {
        return { data: bank };
      }
      throw new Error('Question bank not found');
    }
    
    // Check if it's stats
    if (url.includes('/statistics')) {
      return { data: MOCK_STATS };
    }
    
    return MOCK_QUESTION_BANKS;
  }
  
  // Exams
  if (url.includes('/exams')) {
    return { data: [], pagination: { total: 0, page: 1, limit: 20, pages: 0 } };
  }
  
  // Languages
  if (url.includes('/languages')) {
    return MOCK_LANGUAGES;
  }
  
  // Subjects
  if (url.includes('/subjects')) {
    return MOCK_SUBJECTS;
  }
  
  // Default empty response
  return { data: [] };
}

function mockPost(url, data) {
  console.log(`[MOCK] POST ${url}`, data);
  return { success: true, data: { id: Date.now().toString(), ...data } };
}

function mockPut(url, data) {
  console.log(`[MOCK] PUT ${url}`, data);
  return { success: true, data };
}

function mockDelete(url) {
  console.log(`[MOCK] DELETE ${url}`);
  return { success: true };
}

// ============================================
// API CLIENT
// ============================================
export const api = {
  // GET request
  get: async (url, config = {}) => {
    try {
      if (USE_MOCK) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));
        return mockGet(url);
      }
      
      const response = await axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      if (USE_MOCK) {
        console.warn(`[MOCK] GET ${url} - using mock data due to error`);
        return mockGet(url);
      }
      throw error;
    }
  },

  // POST request
  post: async (url, data, config = {}) => {
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockPost(url, data);
      }
      const response = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      if (USE_MOCK) {
        console.warn(`[MOCK] POST ${url} - using mock response`);
        return { success: true, data: { id: Date.now().toString(), ...data } };
      }
      throw error;
    }
  },

  // PUT request
  put: async (url, data, config = {}) => {
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockPut(url, data);
      }
      const response = await axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      if (USE_MOCK) {
        return { success: true, data };
      }
      throw error;
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockDelete(url);
      }
      const response = await axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      if (USE_MOCK) {
        return { success: true };
      }
      throw error;
    }
  },
};

// Create axios instance for real API calls
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor - add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem('auth_token');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      return Promise.reject({
        status,
        message: error.response.data?.error || error.response.data?.message || 'Something went wrong',
        data: error.response.data,
      });
    }
    return Promise.reject({
      status: 0,
      message: 'Network error - please check your connection',
    });
  }
);

// ============================================
// HELPER FUNCTIONS
// ============================================
export const handleApiError = (error) => {
  const message = error?.message || 'An unexpected error occurred';
  toast.error(message);
  return { error: true, message };
};

export default api;