'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AIChat from '@/components/ai/ai-chat';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, BookOpen, FileText, Languages, Lightbulb, PenTool } from 'lucide-react';

const quickPrompts = [
  { icon: BookOpen, label: 'Explain Grammar', prompt: 'Explain the Japanese grammar point: ' },
  { icon: Languages, label: 'Translate', prompt: 'Translate to Japanese: ' },
  { icon: PenTool, label: 'Kanji Help', prompt: 'Explain the kanji: ' },
  { icon: FileText, label: 'Generate Quiz', prompt: 'Create 5 quiz questions about ' },
  { icon: Lightbulb, label: 'Study Tips', prompt: 'Give me study tips for JLPT ' },
];

export default function AIAssistantPage() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">AI Learning Assistant</h1>
            <p className="text-gray-500">Get help with Japanese learning using AI</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AIChat className="h-[700px]" />
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary-600" /> Quick Actions
              </h3>
              <div className="space-y-2">
                {quickPrompts.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Button key={i} variant="outline" className="w-full justify-start" size="sm">
                      <Icon className="mr-2 h-4 w-4" /> {item.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Tips for Using AI</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">•</span>
                  Be specific with your questions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">•</span>
                  Ask for examples when learning grammar
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">•</span>
                  Request translations with explanations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">•</span>
                  Use for practice quiz generation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">•</span>
                  Ask for study plan recommendations
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
