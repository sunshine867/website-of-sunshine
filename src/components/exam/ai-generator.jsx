// apps/web/src/components/exam/ai-generator.jsx

'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Wand2,
  Sparkles,
  CheckCircle,
  XCircle,
  Edit,
  RefreshCw,
  Eye,
  Download,
  Upload,
  FileSpreadsheet,
  FileJson,
  FileText,
  Shield,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

// ✅ Named export - CORRECT
export default function AIGenerator({ questionBankId, onQuestionsGenerated }) {
  const [prompt, setPrompt] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [questionType, setQuestionType] = useState('single_choice');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [language, setLanguage] = useState('en');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());
  const [progress, setProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState(null);
  const [duplicateCheck, setDuplicateCheck] = useState({});
  const [activeTab, setActiveTab] = useState('generate');

  // Generate questions
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      const response = await api.post('/ai/generate-questions', {
        questionBankId,
        prompt,
        count: questionCount,
        questionType,
        difficulty,
        language,
      });

      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const { questions } = response.data;

      setGeneratedQuestions(questions);
      setSelectedQuestions(new Set(questions.map(q => q.id)));
      setProgress(100);

      toast.success(`Generated ${questions.length} questions successfully`);

      setTimeout(() => setProgress(0), 1000);
    } catch (error) {
      toast.error(error.message || 'Failed to generate questions');
      setProgress(0);
    } finally {
      setIsGenerating(false);
    }
  };

  // Approve questions
  const handleApprove = async () => {
    const questionsToSave = generatedQuestions.filter(q => selectedQuestions.has(q.id));

    try {
      await api.post('/questions/bulk', {
        questions: questionsToSave,
        questionBankId,
      });

      toast.success(`Added ${questionsToSave.length} questions to bank`);
      if (onQuestionsGenerated) {
        onQuestionsGenerated(questionsToSave);
      }
      setGeneratedQuestions([]);
      setSelectedQuestions(new Set());
    } catch (error) {
      toast.error('Failed to add questions');
    }
  };

  // Regenerate question
  const handleRegenerate = async (questionId) => {
    try {
      const question = generatedQuestions.find(q => q.id === questionId);
      const response = await api.post('/ai/regenerate-question', {
        question,
        prompt,
        questionType,
        difficulty,
      });

      const updatedQuestions = generatedQuestions.map(q =>
        q.id === questionId ? response.data : q
      );

      setGeneratedQuestions(updatedQuestions);
      toast.success('Question regenerated');
    } catch (error) {
      toast.error('Failed to regenerate question');
    }
  };

  // Toggle selection
  const toggleSelection = (questionId) => {
    const newSelected = new Set(selectedQuestions);
    if (selectedQuestions.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedQuestions(newSelected);
  };

  // Select all / deselect all
  const toggleSelectAll = () => {
    if (selectedQuestions.size === generatedQuestions.length) {
      setSelectedQuestions(new Set());
    } else {
      setSelectedQuestions(new Set(generatedQuestions.map(q => q.id)));
    }
  };

  // Get difficulty color
  const getDifficultyColor = (level) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      elementary: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      upper_intermediate: 'bg-orange-100 text-orange-800',
      advanced: 'bg-red-100 text-red-800',
      expert: 'bg-purple-100 text-purple-800',
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  // Get question type icon
  const getQuestionTypeIcon = (type) => {
    const icons = {
      single_choice: '🔘',
      multiple_choice: '☑️',
      true_false: '✓✗',
      fill_blank: '___',
      essay: '📝',
      reading: '📖',
      listening: '🎧',
      speaking: '🎤',
      vocabulary: '📚',
      grammar: '📐',
    };
    return icons[type] || '❓';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            AI Question Generator
          </CardTitle>
          <CardDescription>
            Describe what questions you want and AI will create them for you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Prompt Input */}
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Example: Create 10 JLPT N5 vocabulary questions about daily activities..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Settings Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="count">Question Count</Label>
              <Input
                id="count"
                type="number"
                min={1}
                max={100}
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Question Type</Label>
              <Select value={questionType} onValueChange={setQuestionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single_choice">Single Choice</SelectItem>
                  <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                  <SelectItem value="true_false">True/False</SelectItem>
                  <SelectItem value="fill_blank">Fill in the Blank</SelectItem>
                  <SelectItem value="essay">Essay</SelectItem>
                  <SelectItem value="reading">Reading Comprehension</SelectItem>
                  <SelectItem value="listening">Listening</SelectItem>
                  <SelectItem value="speaking">Speaking</SelectItem>
                  <SelectItem value="vocabulary">Vocabulary</SelectItem>
                  <SelectItem value="grammar">Grammar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="elementary">Elementary</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="upper_intermediate">Upper Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="ko">Korean</SelectItem>
                  <SelectItem value="ne">Nepali</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Questions
              </>
            )}
          </Button>

          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Questions Preview */}
      {generatedQuestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Questions</span>
              <Badge variant="outline">{generatedQuestions.length} questions</Badge>
            </CardTitle>
            <CardDescription>
              Review and select questions to add to your bank
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSelectAll}
                >
                  {selectedQuestions.size === generatedQuestions.length
                    ? 'Deselect All'
                    : 'Select All'}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedQuestions.size} selected
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleApprove}
                  disabled={selectedQuestions.size === 0}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Add Selected ({selectedQuestions.size})
                </Button>
              </div>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedQuestions.size === generatedQuestions.length}
                        onChange={toggleSelectAll}
                        className="h-4 w-4"
                      />
                    </TableHead>
                    <TableHead>#</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generatedQuestions.map((q, index) => (
                    <TableRow key={q.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedQuestions.has(q.id)}
                          onChange={() => toggleSelection(q.id)}
                          className="h-4 w-4"
                        />
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {q.question_text}
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1">
                          {getQuestionTypeIcon(q.question_type)}
                          {q.question_type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(q.difficulty)}>
                          {q.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              setPreviewQuestion(q);
                              setShowPreview(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleRegenerate(q.id)}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Question Preview</DialogTitle>
            <DialogDescription>
              Review the question details before adding to bank
            </DialogDescription>
          </DialogHeader>
          {previewQuestion && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge>{getQuestionTypeIcon(previewQuestion.question_type)} {previewQuestion.question_type}</Badge>
                  <Badge className={getDifficultyColor(previewQuestion.difficulty)}>
                    {previewQuestion.difficulty}
                  </Badge>
                </div>
                <p className="text-lg">{previewQuestion.question_text}</p>
              </div>

              {previewQuestion.options && previewQuestion.options.length > 0 && (
                <div className="space-y-2">
                  <p className="font-medium">Options:</p>
                  <div className="space-y-1">
                    {previewQuestion.options.map((opt, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded border ${
                          opt.is_correct
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + idx)}.</span>
                        <span className="ml-2">{opt.text}</span>
                        {opt.is_correct && (
                          <Badge className="ml-2" variant="default">
                            Correct
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setSelectedQuestions(new Set([...selectedQuestions, previewQuestion.id]));
                    setShowPreview(false);
                    toast.success('Question selected');
                  }}
                >
                  Select Question
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}