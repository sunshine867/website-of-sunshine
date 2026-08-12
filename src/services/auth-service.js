import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/auth-store';

const authService = {
  login: async (email, password) => {
    const { data } = await authApi.login({ email, password });
    localStorage.setItem('accessToken', data.data.accessToken);
    localStorage.setItem('refreshToken', data.data.refreshToken);
    useAuthStore.getState().setUser(data.data.user);
    useAuthStore.getState().setToken(data.data.accessToken);
    return data.data;
  },

  register: async (userData) => {
    const { data } = await authApi.register(userData);
    return data;
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Ignore
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');
    const { data } = await authApi.refreshToken(refreshToken);
    localStorage.setItem('accessToken', data.data.accessToken);
    useAuthStore.getState().setToken(data.data.accessToken);
    return data.data.accessToken;
  },

  getCurrentUser: async () => {
    const { data } = await authApi.getProfile();
    useAuthStore.getState().setUser(data.data);
    return data.data;
  },

  isAuthenticated: () => {
    return !!useAuthStore.getState().token;
  },

  hasRole: (...roles) => {
    const user = useAuthStore.getState().user;
    return user && roles.includes(user.role);
  },
};

export default authService;