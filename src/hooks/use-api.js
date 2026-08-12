// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useToast } from './use-toast';

// export function useApiQuery(key, apiFunction, options = {}) {
//   return useQuery({
//     queryKey: Array.isArray(key) ? key : [key],
//     queryFn: apiFunction,
//     ...options,
//   });
// }

// export function useApiMutation(apiFunction, options = {}) {
//   const queryClient = useQueryClient();
//   const { toast } = useToast();

//   return useMutation({
//     mutationFn: apiFunction,
//     onSuccess: (data, variables, context) => {
//       if (options.successMessage) {
//         toast({
//           title: 'Success',
//           description: options.successMessage,
//         });
//       }
//       if (options.invalidateQueries) {
//         const queries = Array.isArray(options.invalidateQueries) 
//           ? options.invalidateQueries 
//           : [options.invalidateQueries];
//         queries.forEach(q => queryClient.invalidateQueries({ queryKey: [q] }));
//       }
//       options.onSuccess?.(data, variables, context);
//     },
//     onError: (error, variables, context) => {
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Something went wrong',
//         variant: 'destructive',
//       });
//       options.onError?.(error, variables, context);
//     },
//   });
// }




'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './use-toast';

// Custom hook for GET requests
export function useApiQuery(key, apiFunction, options = {}) {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      try {
        const response = await apiFunction();
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    ...options,
  });
}

// Custom hook for POST/PUT/DELETE requests
export function useApiMutation(apiFunction, options = {}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (variables) => {
      try {
        const response = await apiFunction(variables);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data, variables, context) => {
      if (options.successMessage) {
        toast({
          title: 'Success',
          description: options.successMessage,
        });
      }
      if (options.invalidateQueries) {
        const queries = Array.isArray(options.invalidateQueries)
          ? options.invalidateQueries
          : [options.invalidateQueries];
        queries.forEach(q => queryClient.invalidateQueries({ queryKey: [q] }));
      }
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      const message = error?.response?.data?.message || error?.message || 'Something went wrong';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      if (options.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}