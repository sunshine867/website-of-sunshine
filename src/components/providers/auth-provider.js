'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { authApi } from '@/lib/api/auth';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const { user, setUser, setToken, logout: storeLogout, getStoredUser } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
 
  const { toast } = useToast();

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setLoading(false);
        return;
      }

      // Try to get cached user first (faster)
      const cachedUser = getStoredUser();
      if (cachedUser) {
        setUser(cachedUser);
      }

      // Set token
      setToken(token);
      document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;

      // Verify token by fetching profile
      try {
        const { data } = await authApi.getProfile();
        const userData = data.data || data;
        setUser(userData);
      } catch (error) {
        if (error.response?.status === 401) {
          // Try refresh
          const refreshed = await refreshToken();
          if (!refreshed) {
            clearAuth();
            if (!isPublicPath(pathname)) {
              router.push('/login');
            }
          }
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const isPublicPath = (path) => {
    const publicPaths = ['/', '/login', '/register', '/forgot-password', '/reset-password', 
                         '/verify-email', '/callback', '/about', '/services', '/countries',
                         '/universities', '/courses', '/blog', '/gallery', '/events', '/faq',
                         '/contact', '/apply', '/privacy', '/terms'];
    return publicPaths.some(p => path === p || path.startsWith(p + '/'));
  };

  const refreshToken = async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (!refreshTokenValue) return false;

      const { data } = await authApi.refreshToken(refreshTokenValue);
      const newToken = data.data?.accessToken || data.accessToken;
      
      localStorage.setItem('accessToken', newToken);
      document.cookie = `token=${newToken}; path=/; max-age=86400; SameSite=Lax`;
      setToken(newToken);

      const profileResponse = await authApi.getProfile();
      const userData = profileResponse.data.data || profileResponse.data;
      setUser(userData);
      
      return true;
    } catch (error) {
      return false;
    }
  };

  const clearAuth = () => {
    storeLogout();
  };

  // const login = async (email, password, callbackUrl = null) => {
  //   try {
  //     const { data } = await authApi.login({ email, password });
  //     const responseData = data.data || data;
      
  //     localStorage.setItem('accessToken', responseData.accessToken);
  //     localStorage.setItem('refreshToken', responseData.refreshToken);
  //     document.cookie = `token=${responseData.accessToken}; path=/; max-age=86400; SameSite=Lax`;
      
  //     setUser(responseData.user);
  //     setToken(responseData.accessToken);
      
  //     toast({ title: 'Welcome back!', description: 'Login successful' });
      
  //     // Check for callback URL
      
      
  //     // Redirect based on role
  //     const role = responseData.user?.role;
  //     if (callbackUrl) {
  //       router.push(callbackUrl);
  //     } else if (['ADMIN', 'SUPER_ADMIN'].includes(role)) {
  //       router.push('/admin');
  //     } else {
  //       router.push('/dashboard');
  //     }
  //   } catch (error) {
  //     toast({
  //       title: 'Login failed',
  //       description: error.response?.data?.message || 'Invalid credentials',
  //       variant: 'destructive'
  //     });
  //     throw error;
  //   }
  // };

const login = async (email, password, callbackUrl = null) => {
  try {
    const { data } = await authApi.login({ email, password });
    const responseData = data.data || data;

    localStorage.setItem('accessToken', responseData.accessToken);
    localStorage.setItem('refreshToken', responseData.refreshToken);

    document.cookie = `token=${responseData.accessToken}; path=/; max-age=86400; SameSite=Lax`;

    setUser(responseData.user);
    setToken(responseData.accessToken);

    toast({
      title: 'Welcome back!',
      description: 'Login successful',
    });

    const role = responseData.user?.role;

    if (callbackUrl) {
      router.push(callbackUrl);
    } else if (['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  } catch (error) {
    toast({
      title: 'Login failed',
      description:
        error.response?.data?.message || 'Invalid credentials',
      variant: 'destructive',
    });

    throw error;
  }
};


  const register = async (userData) => {
    try {
      await authApi.register(userData);
      toast({ title: 'Account created!', description: 'Please check your email.' });
      router.push('/login');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Ignore
    } finally {
      clearAuth();
      router.push('/');
      toast({ title: 'Logged out', description: 'See you soon!' });
    }
  };

  const value = { user, loading, login, register, logout, refreshToken };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};