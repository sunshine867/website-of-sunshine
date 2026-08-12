'use client';

import { create } from 'zustand';

let toastId = 0;

const useToastStore = create((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = ++toastId;
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, toast.duration || 5000);
    return id;
  },
  dismiss: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

export function useToast() {
  const { toasts, addToast, dismiss } = useToastStore();

  const toast = ({ title, description, variant = 'default', duration }) => {
    return addToast({ title, description, variant, duration });
  };

  return { toast, toasts, dismiss };
}