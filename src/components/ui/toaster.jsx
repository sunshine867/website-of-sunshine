'use client';

import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const icons = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
};

const colors = {
  default: 'bg-white border-gray-200',
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-yellow-50 border-yellow-200',
};

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.variant] || icons.default;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg ${colors[toast.variant] || colors.default}`}
            >
              <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                {toast.title && <p className="font-semibold text-sm">{toast.title}</p>}
                {toast.description && <p className="text-sm text-gray-600">{toast.description}</p>}
              </div>
              <button onClick={() => dismiss(toast.id)} className="flex-shrink-0">
                <X className="h-4 w-4 text-gray-400" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}