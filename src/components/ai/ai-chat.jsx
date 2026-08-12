'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApiMutation } from '@/hooks/use-api';
import { aiApi } from '@/lib/api/ai';
import { Bot, User, Send, Loader2, Sparkles } from 'lucide-react';

export default function AIChat({ className }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your Japanese learning assistant. How can I help you today? You can ask me about grammar, vocabulary, kanji, or anything related to Japanese learning.' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const chatMutation = useApiMutation(
    (data) => aiApi.chat(data),
    { onSuccess: (data) => setMessages(prev => [...prev, { role: 'assistant', content: data.data?.content || data.data }]) }
  );

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    chatMutation.mutate({ message: input, history: messages.slice(-10) });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className={`flex flex-col h-[600px] ${className}`}>
      <div className="p-4 border-b bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary-600" />
          <h3 className="font-bold">AI Assistant</h3>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className={msg.role === 'user' ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700'}>
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {chatMutation.isPending && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8"><AvatarFallback className="bg-accent-100 text-accent-700"><Bot className="h-4 w-4" /></AvatarFallback></Avatar>
              <div className="bg-gray-100 rounded-2xl px-4 py-3"><Loader2 className="h-4 w-4 animate-spin" /></div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input placeholder="Ask me anything about Japanese..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
          <Button size="icon" onClick={handleSend} disabled={!input.trim() || chatMutation.isPending}><Send className="h-4 w-4" /></Button>
        </div>
      </div>
    </Card>
  );
}