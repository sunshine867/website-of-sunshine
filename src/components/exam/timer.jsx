'use client';

import { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Timer({ totalSeconds, onTimeUp, isPaused, className }) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isWarning, setIsWarning] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeLeft, onTimeUp]);

  useEffect(() => {
    setIsWarning(timeLeft <= 300); // 5 minutes
    setIsCritical(timeLeft <= 60); // 1 minute
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className={cn(
      'flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold transition-all',
      isCritical ? 'bg-red-50 text-red-600 animate-pulse' :
      isWarning ? 'bg-yellow-50 text-yellow-600' :
      'bg-gray-100 text-gray-700',
      className
    )}>
      {isCritical ? <AlertTriangle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
      <span>{formattedTime}</span>
    </div>
  );
}