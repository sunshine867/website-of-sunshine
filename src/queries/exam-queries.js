import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { examsApi } from '@/lib/api/exams';
import { useToast } from '@/hooks/use-toast';

export function useExams(params) {
  return useQuery({
    queryKey: ['exams', params],
    queryFn: () => examsApi.getAll(params),
    select: (data) => data?.data,
  });
}

export function useAvailableExams() {
  return useQuery({
    queryKey: ['exams', 'available'],
    queryFn: () => examsApi.getAvailable(),
    select: (data) => data?.data,
  });
}

export function useExamResults() {
  return useQuery({
    queryKey: ['exams', 'results'],
    queryFn: () => examsApi.getMyResults(),
    select: (data) => data?.data,
  });
}

export function useExamResult(attemptId) {
  return useQuery({
    queryKey: ['exam-result', attemptId],
    queryFn: () => examsApi.getResult(attemptId),
    select: (data) => data?.data,
    enabled: !!attemptId,
  });
}

export function useLeaderboard(examId) {
  return useQuery({
    queryKey: ['leaderboard', examId],
    queryFn: () => examsApi.getLeaderboard(examId),
    select: (data) => data?.data,
    enabled: !!examId,
  });
}

export function useQuestionBank(params) {
  return useQuery({
    queryKey: ['question-bank', params],
    queryFn: () => examsApi.getQuestionBank(params),
    select: (data) => data?.data,
  });
}

export function useExamAnalytics(examId) {
  return useQuery({
    queryKey: ['exam-analytics', examId],
    queryFn: () => examsApi.getAnalytics(examId),
    select: (data) => data?.data,
    enabled: !!examId,
  });
}

export function useStartExam() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (examId) => examsApi.start(examId),
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to start exam', variant: 'destructive' });
    },
  });
}

export function useSubmitExam() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ examId, data }) => examsApi.submit(examId, data),
    onSuccess: () => {
      toast({ title: 'Submitted!', description: 'Exam submitted successfully.' });
      queryClient.invalidateQueries({ queryKey: ['exams'] });
      queryClient.invalidateQueries({ queryKey: ['exam-result'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to submit exam', variant: 'destructive' });
    },
  });
}

export function useCreateExam() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data) => examsApi.create(data),
    onSuccess: () => {
      toast({ title: 'Created!', description: 'Exam created successfully.' });
      queryClient.invalidateQueries({ queryKey: ['exams'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to create exam', variant: 'destructive' });
    },
  });
}

export function useDeleteExam() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id) => examsApi.delete(id),
    onSuccess: () => {
      toast({ title: 'Deleted!', description: 'Exam deleted successfully.' });
      queryClient.invalidateQueries({ queryKey: ['exams'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to delete exam', variant: 'destructive' });
    },
  });
}