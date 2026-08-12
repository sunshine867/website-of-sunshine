import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/lib/api/user';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';

export function useUsers(params) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userApi.getAll(params),
    select: (data) => data?.data,
  });
}

export function useUser(id) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userApi.getById(id),
    select: (data) => data?.data,
    enabled: !!id,
  });
}

export function useUserStats() {
  return useQuery({
    queryKey: ['users', 'stats'],
    queryFn: () => userApi.getStats(),
    select: (data) => data?.data,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const updateUser = useAuthStore((state) => state.updateUser);
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data) => authApi.updateProfile(data),
    onSuccess: (data) => {
      toast({ title: 'Updated!', description: 'Profile updated successfully.' });
      updateUser(data?.data?.data || data?.data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to update profile', variant: 'destructive' });
    },
  });
}

export function useChangePassword() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data) => authApi.changePassword(data),
    onSuccess: () => {
      toast({ title: 'Success!', description: 'Password changed successfully.' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to change password', variant: 'destructive' });
    },
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, status }) => userApi.updateStatus(id, status),
    onSuccess: () => {
      toast({ title: 'Updated!', description: 'User status updated.' });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to update status', variant: 'destructive' });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id) => userApi.delete(id),
    onSuccess: () => {
      toast({ title: 'Deleted!', description: 'User deleted successfully.' });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to delete user', variant: 'destructive' });
    },
  });
}