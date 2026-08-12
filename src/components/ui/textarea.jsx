import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <div>
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-lg border-2 bg-white px-4 py-3 text-sm transition-all',
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
Textarea.displayName = 'Textarea';

export { Textarea };