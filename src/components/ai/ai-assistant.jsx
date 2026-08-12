'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AIChat from './ai-chat';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function AIAssistant({ variant = 'button' }) {
  const [open, setOpen] = useState(false);

  if (variant === 'floating') {
    return (
      <>
        <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform animate-pulse">
          <Sparkles className="h-6 w-6" />
        </button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[500px] h-[700px] p-0">
            <DialogHeader className="p-4 border-b"><DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary-600" /> AI Assistant</DialogTitle></DialogHeader>
            <AIChat className="border-0 shadow-none h-full" />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient"><MessageSquare className="mr-2 h-4 w-4" /> Ask AI</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[600px] p-0">
        <DialogHeader className="p-4 border-b"><DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary-600" /> AI Assistant</DialogTitle></DialogHeader>
        <AIChat className="border-0 shadow-none h-full" />
      </DialogContent>
    </Dialog>
  );
}