'use client';

 

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { authApi } from '@/lib/api/auth';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying'); // verifying | success | error

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      await authApi.verifyEmail(token);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
        <Card>
          <CardContent className="p-8">
            {status === 'verifying' && (
              <>
                <Loader2 className="h-16 w-16 text-primary-500 mx-auto mb-4 animate-spin" />
                <h2 className="text-2xl font-bold mb-2">Verifying Email...</h2>
                <p className="text-gray-500">Please wait while we verify your email address.</p>
              </>
            )}
            {status === 'success' && (
              <>
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
                <p className="text-gray-500 mb-6">Your email has been verified successfully. You can now login.</p>
                <Link href="/login"><Button variant="gradient" size="lg">Go to Login</Button></Link>
              </>
            )}
            {status === 'error' && (
              <>
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
                <p className="text-gray-500 mb-6">The verification link is invalid or has expired.</p>
                <Link href="/login"><Button variant="outline">Back to Login</Button></Link>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
