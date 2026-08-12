import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {Icon && <Icon className="h-16 w-16 text-gray-300 mb-4" />}
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{title || 'No data found'}</h3>
      {description && <p className="text-gray-400 mb-6 max-w-md">{description}</p>}
      {actionLabel && onAction && <Button variant="gradient" onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}