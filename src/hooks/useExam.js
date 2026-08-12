// apps/web/src/hooks/useExam.js

import { useState, useEffect } from 'react';
import { api } from '@/lib/api'; // Adjust the import path to your API client

export function useExam(examId) {
  const [exam, setExam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!examId) {
      setIsLoading(false);
      return;
    }

    const fetchExam = async () => {
      try {
        setIsLoading(true);
        // Adjust this API call to match your backend endpoint
        const response = await api.get(`/exams/${examId}`);
        setExam(response.data);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch exam:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  return { exam, isLoading, error };
}