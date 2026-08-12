'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  ChevronUp, ChevronDown, Clock, Flag, CheckCircle,
  XCircle, Eye, EyeOff, Grid, List, Maximize2,
  Minimize2, Volume2, Play, Image as ImageIcon
} from 'lucide-react';

export default function GoogleFormQuiz({
  questions = [],
  examConfig = {},
  onSubmit,
  onSaveProgress,
  timeLeft,
  isPaused,
  onPause,
  onResume,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [viewMode, setViewMode] = useState('single'); // 'single' | 'grid'
  const [showExplanation, setShowExplanation] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [fullscreen, setFullscreen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(null);
  const containerRef = useRef(null);
  const { toast } = useToast();

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        if (currentIndex < totalQuestions - 1) setCurrentIndex(prev => prev + 1);
      }
      if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
      }
      if (e.key === 'f' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleFlag(currentQuestion?.id);
      }
      if (e.key === 'g') {
        setViewMode(prev => prev === 'single' ? 'grid' : 'single');
      }
      if (e.key === 'Enter' && e.ctrlKey) {
        handleSubmit();
      }
      // Number keys for options
      if (currentQuestion?.type === 'SINGLE_CHOICE' || currentQuestion?.type === 'MULTIPLE_CHOICE') {
        const num = parseInt(e.key);
        if (num >= 1 && num <= (currentQuestion.options?.length || 0)) {
          selectOption(currentQuestion.options[num - 1], num - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [currentIndex, currentQuestion, answers, totalQuestions]);

  const selectOption = (option, index) => {
    if (!currentQuestion) return;

    if (currentQuestion.type === 'MULTIPLE_CHOICE') {
      setAnswers(prev => {
        const current = prev[currentQuestion.id] || [];
        const updated = current.includes(option)
          ? current.filter(o => o !== option)
          : [...current, option];
        return { ...prev, [currentQuestion.id]: updated };
      });
    } else {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: option
      }));
    }
  };

  const handleTextAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const toggleFlag = (questionId) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    const unansweredQuestions = questions.filter(q => !answers[q.id]);
    
    if (unansweredQuestions.length > 0) {
      const confirm = window.confirm(
        `You have ${unansweredQuestions.length} unanswered question(s). Are you sure you want to submit?`
      );
      if (!confirm) return;
    }

    onSubmit?.(answers);
  };

  const renderQuestionContent = (question) => {
    switch (question.type) {
      case 'SINGLE_CHOICE':
        return (
          <div className="space-y-3 mt-6">
            {question.options?.map((option, index) => {
              const isSelected = answers[question.id] === option;
              const letter = String.fromCharCode(65 + index);
              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectOption(option, index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all group ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50 shadow-md shadow-primary-100'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }`}>
                      {letter}
                    </div>
                    <span className="flex-1 text-base">{option}</span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <CheckCircle className="h-6 w-6 text-primary-600" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        );

      case 'MULTIPLE_CHOICE':
        return (
          <div className="space-y-3 mt-6">
            <p className="text-sm text-gray-500 mb-2">
              Select all that apply. Press numbers 1-{question.options?.length} to toggle.
            </p>
            {question.options?.map((option, index) => {
              const isSelected = (answers[question.id] || []).includes(option);
              const letter = String.fromCharCode(65 + index);
              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectOption(option, index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all group ${
                    isSelected
                      ? 'border-accent-500 bg-accent-50 shadow-md shadow-accent-100'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-accent-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {letter}
                    </div>
                    <span className="flex-1">{option}</span>
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-accent-600 bg-accent-600'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <CheckCircle className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        );

      case 'TRUE_FALSE':
        return (
          <div className="grid grid-cols-2 gap-4 mt-6">
            {['TRUE', 'FALSE'].map((option, index) => {
              const isSelected = answers[question.id] === option;
              return (
                <motion.button
                  key={option}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => selectOption(option, index)}
                  className={`p-8 rounded-xl border-2 text-center transition-all ${
                    isSelected
                      ? option === 'TRUE'
                        ? 'border-green-500 bg-green-50 shadow-lg shadow-green-100'
                        : 'border-red-500 bg-red-50 shadow-lg shadow-red-100'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-4xl mb-3 ${isSelected ? 'scale-110' : ''} transition-transform`}>
                    {option === 'TRUE' ? '✅' : '❌'}
                  </div>
                  <span className={`text-lg font-semibold ${
                    isSelected
                      ? option === 'TRUE' ? 'text-green-700' : 'text-red-700'
                      : 'text-gray-700'
                  }`}>
                    {option === 'TRUE' ? 'True' : 'False'}
                  </span>
                </motion.button>
              );
            })}
          </div>
        );

      case 'FILL_BLANK':
        return (
          <div className="mt-6">
            <Input
              placeholder="Type your answer here..."
              className="text-lg h-14"
              value={answers[question.id] || ''}
              onChange={(e) => handleTextAnswer(e.target.value)}
              autoFocus
            />
          </div>
        );

      case 'SHORT_ANSWER':
        return (
          <div className="mt-6">
            <Textarea
              placeholder="Write your answer..."
              className="min-h-[120px]"
              value={answers[question.id] || ''}
              onChange={(e) => handleTextAnswer(e.target.value)}
            />
          </div>
        );

      case 'MATCH_PAIR':
        return (
          <div className="mt-6 space-y-3">
            {question.pairs?.map((pair, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <span className="font-medium flex-1">{pair.left}</span>
                <span className="text-gray-400">→</span>
                <select
                  className="flex-1 p-3 border-2 rounded-lg"
                  value={answers[question.id]?.[pair.left] || ''}
                  onChange={(e) => {
                    const current = answers[question.id] || {};
                    setAnswers(prev => ({
                      ...prev,
                      [question.id]: { ...current, [pair.left]: e.target.value }
                    }));
                  }}
                >
                  <option value="">Select match</option>
                  {question.rightOptions?.map((right, ri) => (
                    <option key={ri} value={right}>{right}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        );

      case 'SPEAKING':
        return (
          <div className="mt-6 text-center">
            <p className="text-gray-500 mb-4">Read the following text aloud:</p>
            <div className="bg-gray-50 rounded-xl p-8 mb-6">
              <p className="text-2xl font-medium">{question.speakingText}</p>
            </div>
            <Button variant="gradient" size="lg" className="rounded-full px-8">
              <Volume2 className="mr-2 h-5 w-5" /> Start Recording
            </Button>
          </div>
        );

      default:
        return (
          <div className="mt-6 text-center text-gray-500">
            Question type not supported
          </div>
        );
    }
  };

  // Grid view for all questions
  if (viewMode === 'grid') {
    return (
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <div className="sticky top-0 bg-white border-b z-30 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">All Questions</h2>
            <div className="flex items-center gap-3">
              <Badge variant="success">{answeredCount} Answered</Badge>
              <Badge variant="danger">{unansweredCount} Unanswered</Badge>
              <Badge variant="warning">{flaggedQuestions.size} Flagged</Badge>
              <Button variant="outline" size="sm" onClick={() => setViewMode('single')}>
                <List className="mr-2 h-4 w-4" /> Single View
              </Button>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-6">
          {questions.map((question, index) => (
            <Card key={question.id} className={`p-6 ${
              flaggedQuestions.has(question.id) ? 'border-yellow-400 border-2' : ''
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-2">Q{index + 1}</Badge>
                  <h3 className="text-lg font-semibold">{question.question_text}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFlag(question.id)}
                  className={flaggedQuestions.has(question.id) ? 'text-yellow-600' : ''}
                >
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
              {renderQuestionContent(question)}
              {answers[question.id] && (
                <div className="mt-4 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">Answered</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Single question view (default)
  return (
    <div className="max-w-3xl mx-auto" ref={containerRef}>
      {/* Question Progress Bar */}
      <div className="sticky top-0 bg-white z-30 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <div className="flex gap-1">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className={`w-8 h-1 rounded-full transition-all ${
                    i === currentIndex
                      ? 'bg-primary-600'
                      : answers[q.id]
                      ? 'bg-green-400'
                      : flaggedQuestions.has(q.id)
                      ? 'bg-yellow-400'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setViewMode('grid')}>
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Progress value={((currentIndex + 1) / totalQuestions) * 100} className="h-1.5" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          {/* Question Card */}
          <Card className={`p-8 mb-6 ${
            flaggedQuestions.has(currentQuestion?.id) ? 'border-yellow-400 border-2' : ''
          }`}>
            {/* Question Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className="text-sm">
                  Q{currentIndex + 1}
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  {currentQuestion?.type?.replace('_', ' ')}
                </Badge>
                {currentQuestion?.difficulty && (
                  <Badge className={
                    currentQuestion.difficulty === 'EASY' ? 'bg-green-100 text-green-700' :
                    currentQuestion.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }>
                    {currentQuestion.difficulty}
                  </Badge>
                )}
                {currentQuestion?.points && (
                  <Badge variant="secondary">
                    {currentQuestion.points} {currentQuestion.points === 1 ? 'point' : 'points'}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFlag(currentQuestion?.id)}
                className={flaggedQuestions.has(currentQuestion?.id) ? 'text-yellow-600 bg-yellow-50' : ''}
              >
                <Flag className={`h-4 w-4 ${flaggedQuestions.has(currentQuestion?.id) ? 'fill-yellow-500' : ''}`} />
                <span className="ml-1 text-xs">
                  {flaggedQuestions.has(currentQuestion?.id) ? 'Flagged' : 'Flag'}
                </span>
              </Button>
            </div>

            {/* Question Text */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-relaxed">
              {currentQuestion?.question_text}
            </h2>

            {/* Question Media */}
            {currentQuestion?.image_url && (
              <div className="mb-6 rounded-xl overflow-hidden bg-gray-50">
                <img
                  src={currentQuestion.image_url}
                  alt="Question"
                  className="max-h-80 w-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => {/* Open fullscreen viewer */}}
                />
              </div>
            )}

            {currentQuestion?.audio_url && (
              <div className="mb-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (audioPlaying === currentQuestion.id) {
                      setAudioPlaying(null);
                    } else {
                      setAudioPlaying(currentQuestion.id);
                    }
                  }}
                  className={audioPlaying === currentQuestion.id ? 'bg-primary-50 border-primary-300' : ''}
                >
                  {audioPlaying === currentQuestion.id ? (
                    <>
                      <Volume2 className="mr-2 h-4 w-4 text-primary-600 animate-pulse" />
                      Playing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Play Audio
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Render question type specific content */}
            {renderQuestionContent(currentQuestion)}
          </Card>

          {/* Navigation Footer */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="group"
            >
              <ChevronUp className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
              Previous
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onSaveProgress?.({ answers, currentIndex });
                  toast({ description: 'Progress saved!' });
                }}
              >
                Save Progress
              </Button>

              {currentIndex === totalQuestions - 1 ? (
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={handleSubmit}
                  className="shadow-lg shadow-primary-200"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Submit Exam
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                  className="group"
                >
                  Next
                  <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                </Button>
              )}
            </div>
          </div>

          {/* Quick Navigation Dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-primary-600 scale-125'
                    : answers[q.id]
                    ? 'bg-green-400'
                    : flaggedQuestions.has(q.id)
                    ? 'bg-yellow-400'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                title={`Question ${i + 1}${answers[q.id] ? ' - Answered' : ''}${flaggedQuestions.has(q.id) ? ' - Flagged' : ''}`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Keyboard Shortcuts Help */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl text-xs text-gray-500">
        <p className="font-medium mb-2">⌨️ Keyboard Shortcuts:</p>
        <div className="grid grid-cols-2 gap-2">
          <span>↑/↓ or J/K - Navigate questions</span>
          <span>1-9 - Select options</span>
          <span>F - Flag question</span>
          <span>G - Grid view toggle</span>
          <span>Ctrl+Enter - Submit</span>
        </div>
      </div>
    </div>
  );
}