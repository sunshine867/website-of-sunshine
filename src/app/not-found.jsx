import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">The page you are looking for doesn't exist or has been moved.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/"><Button variant="gradient">Go Home</Button></Link>
          <Link href="/contact"><Button variant="outline">Contact Support</Button></Link>
        </div>
      </div>
    </div>
  );
}