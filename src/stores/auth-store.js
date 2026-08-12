import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      setUser: (user) => {
        set({ 
          user, 
          isAuthenticated: !!user 
        });
        // Also store in localStorage for quick access
        if (user) {
          localStorage.setItem('userRole', user.role);
          localStorage.setItem('userData', JSON.stringify(user));
        }
      },
      
      setToken: (token) => {
        set({ token });
        if (token) {
          localStorage.setItem('accessToken', token);
          document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
        }
      },
      
      updateUser: (userData) => {
        const currentUser = get().user;
        const updatedUser = { ...currentUser, ...userData };
        set({ user: updatedUser });
        localStorage.setItem('userData', JSON.stringify(updatedUser));
      },
      
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userData');
        document.cookie = 'token=; path=/; max-age=0';
      },

      // Get stored user data
      getStoredUser: () => {
        try {
          const stored = localStorage.getItem('userData');
          return stored ? JSON.parse(stored) : null;
        } catch {
          return null;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token,
        user: state.user,
      }),
    }
  )
);