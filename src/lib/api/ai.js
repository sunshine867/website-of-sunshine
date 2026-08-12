import { apiClient } from './client';

export const aiApi = {
  generateQuestions: (data) => apiClient.post('/ai/generate-questions', data),
  generateMockExam: (data) => apiClient.post('/ai/generate-mock-exam', data),
  translate: (data) => apiClient.post('/ai/translate', data),
  explainKanji: (kanji) => apiClient.post('/ai/explain-kanji', { kanji }),
  generateStudyPlan: (data) => apiClient.post('/ai/generate-study-plan', data),
  explainGrammar: (data) => apiClient.post('/ai/explain-grammar', data),
  chat: (data) => apiClient.post('/ai/chat', data),
  getHistory: () => apiClient.get('/ai/history'),
};