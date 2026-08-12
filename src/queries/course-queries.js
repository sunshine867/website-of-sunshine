import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesApi } from '@/lib/api/courses';
import { useToast } from '@/hooks/use-toast';

export function useCourses(params) {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => coursesApi.getAll(params),
    select: (data) => data?.data,
  });
}

export function useFeaturedCourses() {
  return useQuery({
    queryKey: ['courses', 'featured'],
    queryFn: () => coursesApi.getFeatured(),
    select: (data) => data?.data,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCourse(slug) {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: () => coursesApi.getBySlug(slug),
    select: (data) => data?.data,
    enabled: !!slug,
  });
}

export function useCourseById(id) {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => coursesApi.getById(id),
    select: (data) => data?.data,
    enabled: !!id,
  });
}

export function useMyEnrollments() {
  return useQuery({
    queryKey: ['enrollments', 'mine'],
    queryFn: () => coursesApi.getMyEnrollments(),
    select: (data) => data?.data,
  });
}

export function useCourseProgress(courseId) {
  return useQuery({
    queryKey: ['course-progress', courseId],
    queryFn: () => coursesApi.getProgress(courseId),
    select: (data) => data?.data,
    enabled: !!courseId,
  });
}

export function useCourseReviews(courseId) {
  return useQuery({
    queryKey: ['course-reviews', courseId],
    queryFn: () => coursesApi.getReviews(courseId),
    select: (data) => data?.data,
    enabled: !!courseId,
  });
}

export function useEnrollCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ courseId, data }) => coursesApi.enroll(courseId, data),
    onSuccess: () => {
      toast({ title: 'Enrolled!', description: 'Successfully enrolled in the course.' });
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['course-progress'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to enroll', variant: 'destructive' });
    },
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data) => coursesApi.create(data),
    onSuccess: () => {
      toast({ title: 'Created!', description: 'Course created successfully.' });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to create course', variant: 'destructive' });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }) => coursesApi.update(id, data),
    onSuccess: () => {
      toast({ title: 'Updated!', description: 'Course updated successfully.' });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to update course', variant: 'destructive' });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id) => coursesApi.delete(id),
    onSuccess: () => {
      toast({ title: 'Deleted!', description: 'Course deleted successfully.' });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to delete course', variant: 'destructive' });
    },
  });
}