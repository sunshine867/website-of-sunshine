import { cn } from '@/lib/utils';

export default function LoadingSpinner({ size = 'md', className }) {
  const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn('animate-spin rounded-full border-primary-600 border-t-transparent', sizeClasses[size])} />
    </div>
  );
}