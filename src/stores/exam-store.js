import { create } from 'zustand';

export const useExamStore = create((set, get) => ({
  currentExam: null,
  currentAttempt: null,
  questions: [],
  answers: {},
  currentIndex: 0,
  timeLeft: null,
  isPaused: false,
  flaggedQuestions: new Set(),
  viewMode: 'single',

  setExam: (exam) => set({ currentExam: exam }),
  setAttempt: (attempt) => set({ currentAttempt: attempt }),
  setQuestions: (questions) => set({ questions }),
  setAnswer: (questionId, answer) => set((state) => ({
    answers: { ...state.answers, [questionId]: answer }
  })),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setTimeLeft: (time) => set({ timeLeft: time }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  toggleFlag: (questionId) => set((state) => {
    const newFlags = new Set(state.flaggedQuestions);
    if (newFlags.has(questionId)) {
      newFlags.delete(questionId);
    } else {
      newFlags.add(questionId);
    }
    return { flaggedQuestions: newFlags };
  }),
  setViewMode: (mode) => set({ viewMode: mode }),
  resetExam: () => set({
    currentExam: null,
    currentAttempt: null,
    questions: [],
    answers: {},
    currentIndex: 0,
    timeLeft: null,
    isPaused: false,
    flaggedQuestions: new Set(),
    viewMode: 'single',
  }),
  
  getAnsweredCount: () => Object.keys(get().answers).length,
  getUnansweredCount: () => get().questions.length - Object.keys(get().answers).length,
  getFlaggedCount: () => get().flaggedQuestions.size,
}));