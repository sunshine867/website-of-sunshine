// apps/web/src/hooks/useExamAttempt.js

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export function useExamAttempt(attemptId) {
  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================
  // FETCH ATTEMPT DATA
  // ============================================
  useEffect(() => {
    if (!attemptId) {
      setIsLoading(false);
      return;
    }

    const fetchAttemptData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch attempt details
        const attemptResponse = await api.get(`/exam-attempts/${attemptId}`);
        setAttempt(attemptResponse.data);

        // Fetch questions for this attempt
        const questionsResponse = await api.get(`/exam-attempts/${attemptId}/questions`);
        setQuestions(questionsResponse.data || []);
      } catch (err) {
        console.error('Failed to fetch attempt data:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttemptData();
  }, [attemptId]);

  // ============================================
  // SUBMIT ANSWER
  // ============================================
  const submitAnswer = async (questionId, answer) => {
    try {
      // If no attemptId, just return (for free exams)
      if (!attemptId) {
        return { success: true };
      }

      const response = await api.post(`/exam-attempts/${attemptId}/answers`, {
        questionId,
        answer,
      });
      return response.data;
    } catch (err) {
      console.error('Failed to submit answer:', err);
      // Don't throw - just log the error and let the UI handle it
      return { success: false, error: err.message };
    }
  };

  // ============================================
  // SUBMIT EXAM
  // ============================================
  const submitExam = async (answers) => {
    try {
      // If no attemptId, this is a free exam - just return success
      if (!attemptId) {
        return { success: true, message: 'Free exam completed' };
      }

      // Format answers for API
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));

      const response = await api.post(`/exam-attempts/${attemptId}/submit`, {
        answers: formattedAnswers,
      });

      return response.data;
    } catch (err) {
      console.error('Submit exam error details:', err);
      
      // Return a more helpful error
      return {
        success: false,
        error: err.response?.data?.error || err.message || 'Failed to submit exam',
      };
    }
  };

  // ============================================
  // SAVE PROGRESS (Auto-save)
  // ============================================
  const saveProgress = async (answers) => {
    try {
      if (!attemptId) return;

      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));

      await api.post(`/exam-attempts/${attemptId}/progress`, {
        answers: formattedAnswers,
      });
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  };

  return {
    attempt,
    questions,
    isLoading,
    error,
    submitAnswer,
    submitExam,
    saveProgress,
  };
}