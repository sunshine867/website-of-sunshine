'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h1>
        <p className="text-gray-500 mb-6">{error?.message || 'An unexpected error occurred. Please try again.'}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="gradient" onClick={reset}>Try Again</Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>Go Home</Button>
        </div>
      </div>
    </div>
  );
}