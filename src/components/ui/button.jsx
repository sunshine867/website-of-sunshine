import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/25',
        destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/25',
        outline: 'border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        ghost: 'hover:bg-gray-100 text-gray-700',
        link: 'text-primary-600 underline-offset-4 hover:underline',
        gradient: 'bg-gradient-to-r from-primary-600 to-secondary-500 text-white hover:from-primary-700 hover:to-secondary-600 shadow-lg shadow-primary-600/25',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-lg px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Comp>
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };