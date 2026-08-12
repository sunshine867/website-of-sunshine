import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <div>
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg border-2 bg-white px-4 py-2 text-sm transition-all',
          'placeholder:text-gray-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
          error ? 'border-red-300 focus-visible:ring-red-400' : 'border-gray-300 focus-visible:border-primary-400 focus-visible:ring-primary-400',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };