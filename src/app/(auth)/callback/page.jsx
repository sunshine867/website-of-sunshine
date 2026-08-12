'use client';

 

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/auth-store';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState('');

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      const provider = searchParams.get('provider');
      const code = searchParams.get('code');
      const accessToken = searchParams.get('access_token');

      if (!provider && !code && !accessToken) {
        setStatus('error');
        setError('No authentication data received');
        return;
      }

      let response;

      if (provider === 'google' && accessToken) {
        response = await authApi.googleAuth(accessToken);
      } else if (provider === 'facebook' && accessToken) {
        response = await authApi.facebookAuth(accessToken);
      } else if (provider === 'apple' && code) {
        response = await authApi.appleAuth(code);
      } else if (accessToken) {
        // Generic OAuth
        response = await authApi.googleAuth(accessToken);
      } else {
        setStatus('error');
        setError('Invalid authentication data');
        return;
      }

      const { user, accessToken: token, refreshToken } = response.data.data;

      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setToken(token);

      setStatus('success');
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err) {
      setStatus('error');
      setError(err.response?.data?.message || 'Authentication failed');
      
      setTimeout(() => {
        router.push('/login?error=auth_failed');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          {status === 'processing' && (
            <>
              <Loader2 className="h-16 w-16 text-primary-500 mx-auto mb-4 animate-spin" />
              <h2 className="text-xl font-bold mb-2">Authenticating...</h2>
              <p className="text-gray-500">Please wait while we log you in.</p>
            </>
          )}
          {status === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Authentication Successful!</h2>
              <p className="text-gray-500">Redirecting to dashboard...</p>
            </>
          )}
          {status === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Authentication Failed</h2>
              <p className="text-gray-500">{error}</p>
              <p className="text-sm text-gray-400 mt-2">Redirecting to login...</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
