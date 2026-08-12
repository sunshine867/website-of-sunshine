'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useApiMutation } from '@/hooks/use-api';
import { aiApi } from '@/lib/api/ai';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2, CheckCircle, Plus } from 'lucide-react';

const questionTypes = [
  { value: 'MCQ', label: 'Multiple Choice' },
  { value: 'MULTIPLE_RESPONSE', label: 'Multiple Response' },
  { value: 'TRUE_FALSE', label: 'True/False' },
  { value: 'FILL_BLANK', label: 'Fill in Blank' },
  { value: 'SHORT_ANSWER', label: 'Short Answer' },
  { value: 'LONG_ANSWER', label: 'Long Answer' },
  { value: 'MATCHING', label: 'Matching' },
];

const difficultyLevels = [
  { value: 'EASY', label: 'Easy', color: 'bg-green-500' },
  { value: 'MEDIUM', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'HARD', label: 'Hard', color: 'bg-red-500' },
];

export default function AIQuestionGenerator({ questionBankId, onQuestionsGenerated }) {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(5);
  const [selectedTypes, setSelectedTypes] = useState(['MCQ']);
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const { toast } = useToast();

  const generateMutation = useApiMutation(
    (params) => aiApi.generateQuestions(params),
    {
      onSuccess: (data) => {
        setGeneratedQuestions(data.data?.questions || []);
        toast({ title: 'Generated!', description: `${data.data?.questions?.length || 0} questions generated.` });
      }
    }
  );

  const handleGenerate = () => {
    if (!topic.trim()) {
      toast({ title: 'Error', description: 'Please enter a topic', variant: 'destructive' });
      return;
    }
    generateMutation.mutate({
      topic,
      count,
      types: selectedTypes,
      difficulty,
      questionBankId,
    });
  };

  const toggleType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSaveQuestions = () => {
    onQuestionsGenerated?.(generatedQuestions);
    toast({ title: 'Saved!', description: 'Questions added to question bank.' });
    setGeneratedQuestions([]);
    setTopic('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary-600" />
            <h3 className="font-bold text-lg">AI Question Generator</h3>
          </div>

          {/* Topic */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Topic *</label>
            <Input
              placeholder="e.g., Japanese Particles, Calculus Derivatives..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {/* Question Types */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Question Types</label>
            <div className="flex flex-wrap gap-2">
              {questionTypes.map(type => (
                <Badge
                  key={type.value}
                  variant={selectedTypes.includes(type.value) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleType(type.value)}
                >
                  {type.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Count Slider */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Number of Questions: <span className="font-bold text-primary-600">{count}</span>
            </label>
            <Slider
              value={[count]}
              onValueChange={([val]) => setCount(val)}
              min={1}
              max={20}
              step={1}
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Difficulty Level</label>
            <div className="flex gap-2">
              {difficultyLevels.map(level => (
                <Badge
                  key={level.value}
                  variant={difficulty === level.value ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setDifficulty(level.value)}
                >
                  {level.label}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            variant="gradient"
            className="w-full"
            onClick={handleGenerate}
            loading={generateMutation.isPending}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Questions
          </Button>
        </CardContent>
      </Card>

      {/* Generated Questions */}
      {generatedQuestions.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Generated Questions ({generatedQuestions.length})</h3>
              <Button variant="gradient" size="sm" onClick={handleSaveQuestions}>
                <Plus className="mr-1 h-4 w-4" /> Save All to Bank
              </Button>
            </div>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {generatedQuestions.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Q{i + 1}</Badge>
                      <Badge>{q.question_type}</Badge>
                      <Badge variant="secondary">{q.difficulty_level}</Badge>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-sm font-medium">{q.question_text}</p>
                  {q.options && (
                    <div className="mt-2 space-y-1">
                      {q.options.map((opt, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                            {String.fromCharCode(65 + j)}
                          </span>
                          {opt.option_text || opt}
                          {opt.is_correct && <CheckCircle className="h-3 w-3 text-green-500" />}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}