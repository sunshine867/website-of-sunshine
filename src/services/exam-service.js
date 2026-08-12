import { examsApi } from '@/lib/api/exams';

const examService = {
  getAvailableExams: async () => {
    const { data } = await examsApi.getAvailable();
    return data.data;
  },

  getAllExams: async (params) => {
    const { data } = await examsApi.getAll(params);
    return data;
  },

  startExam: async (examId) => {
    const { data } = await examsApi.start(examId);
    return data.data;
  },

  submitExam: async (examId, answers) => {
    const { data } = await examsApi.submit(examId, answers);
    return data.data;
  },

  saveProgress: async (examId, progress) => {
    await examsApi.saveProgress(examId, progress);
  },

  pauseExam: async (examId) => {
    await examsApi.pause(examId);
  },

  resumeExam: async (examId) => {
    const { data } = await examsApi.resume(examId);
    return data.data;
  },

  getResult: async (attemptId) => {
    const { data } = await examsApi.getResult(attemptId);
    return data.data;
  },

  getMyResults: async () => {
    const { data } = await examsApi.getMyResults();
    return data.data;
  },

  getLeaderboard: async (examId) => {
    const { data } = await examsApi.getLeaderboard(examId);
    return data.data;
  },

  createExam: async (examData) => {
    const { data } = await examsApi.create(examData);
    return data.data;
  },

  updateExam: async (id, examData) => {
    const { data } = await examsApi.update(id, examData);
    return data.data;
  },

  deleteExam: async (id) => {
    await examsApi.delete(id);
  },

  createQuestion: async (questionData) => {
    const { data } = await examsApi.createQuestion(questionData);
    return data.data;
  },

  updateQuestion: async (id, questionData) => {
    const { data } = await examsApi.updateQuestion(id, questionData);
    return data.data;
  },

  getQuestionBank: async (params) => {
    const { data } = await examsApi.getQuestionBank(params);
    return data;
  },

  getExamAnalytics: async (examId) => {
    const { data } = await examsApi.getAnalytics(examId);
    return data.data;
  },
};

export default examService;