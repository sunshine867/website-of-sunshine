'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { examsApi } from '@/lib/api/exams';
import { useToast } from '@/hooks/use-toast';
import {
  Clock, Flag, ChevronLeft, ChevronRight,
  CheckCircle, XCircle, AlertTriangle, Pause,
  Play, Save
} from 'lucide-react';

export default function ExamTakingPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const attemptId = searchParams.get('attempt');
  const router = useRouter();
  const { toast } = useToast();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const { data: examData, isLoading } = useApiQuery(
    ['exam-attempt', attemptId],
    () => examsApi.getResult(attemptId),
    { enabled: !!attemptId }
  );

  const submitMutation = useApiMutation(
    (data) => examsApi.submit(id, data),
    {
      successMessage: 'Exam submitted successfully!',
      onSuccess: (data) => {
        router.push(`/dashboard/exams/results/${data.data.id}`);
      }
    }
  );

  const saveProgressMutation = useApiMutation(
    (data) => examsApi.saveProgress(id, data)
  );

  const exam = examData?.data;
  const questions = exam?.questions || [];
  const currentQuestion = questions[currentIndex];

  // Timer
  useEffect(() => {
    if (exam?.duration_minutes && !timeLeft) {
      setTimeLeft(exam.duration_minutes * 60);
    }
  }, [exam]);

  useEffect(() => {
    if (timeLeft === null || isPaused) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isPaused]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (isPaused) return;
    const autoSave = setInterval(() => {
      saveProgressMutation.mutate({ answers, currentIndex });
    }, 30000);
    return () => clearInterval(autoSave);
  }, [answers, currentIndex, isPaused]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'f') toggleFlag(currentQuestion?.id);
      if (e.key === '1') selectAnswer('A');
      if (e.key === '2') selectAnswer('B');
      if (e.key === '3') selectAnswer('C');
      if (e.key === '4') selectAnswer('D');
    };
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [currentIndex, currentQuestion]);

  const selectAnswer = (option) => {
    if (!currentQuestion) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option
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

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      question_id: questionId,
      selected_answer: answer,
      time_taken: 0
    }));

    const totalTime = exam.duration_minutes * 60 - timeLeft;

    submitMutation.mutate({
      answers: formattedAnswers,
      total_time: totalTime,
      attempt_id: attemptId
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Exam Header */}
      <div className="sticky top-0 z-30 bg-white border-b mb-6">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-lg font-bold">{exam?.title}</h1>
            <p className="text-sm text-gray-500">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              timeLeft < 300 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'
            }`}>
              <Clock className="h-5 w-5" />
              <span className="text-xl font-bold font-mono">{formatTime(timeLeft)}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowConfirmSubmit(true)}
            >
              Submit Exam
            </Button>
          </div>
        </div>
        <Progress
          value={((currentIndex + 1) / questions.length) * 100}
          className="h-1 rounded-none"
        />
      </div>

      {/* Question Navigator */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => setCurrentIndex(index)}
            className={`w-10 h-10 rounded-lg text-sm font-medium flex-shrink-0 transition-all ${
              index === currentIndex
                ? 'bg-primary-600 text-white scale-110'
                : answers[q.id]
                ? 'bg-green-100 text-green-700'
                : flaggedQuestions.has(q.id)
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Paused Overlay */}
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          >
            <Card className="w-96 text-center p-8">
              <Pause className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Exam Paused</h2>
              <p className="text-gray-500 mb-6">Your progress is saved. Take a break!</p>
              <Button variant="gradient" size="lg" onClick={() => setIsPaused(false)}>
                <Play className="mr-2 h-5 w-5" /> Resume Exam
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Question Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge>{currentQuestion?.question_type}</Badge>
                    <Badge variant="secondary">{currentQuestion?.difficulty_level}</Badge>
                    {flaggedQuestions.has(currentQuestion?.id) && (
                      <Badge variant="warning">
                        <Flag className="h-3 w-3 mr-1" /> Flagged
                      </Badge>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold mb-4">
                    {currentQuestion?.question_text}
                  </h2>
                  {currentQuestion?.image_url && (
                    <img
                      src={currentQuestion.image_url}
                      alt="Question"
                      className="max-h-64 rounded-lg mb-4"
                    />
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFlag(currentQuestion?.id)}
                  className={flaggedQuestions.has(currentQuestion?.id) ? 'text-yellow-600' : ''}
                >
                  <Flag className="h-4 w-4" />
                </Button>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion?.options?.map((option, index) => {
                  const letter = String.fromCharCode(65 + index);
                  const isSelected = answers[currentQuestion.id] === letter;
                  return (
                    <button
                      key={index}
                      onClick={() => selectAnswer(letter)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isSelected
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {letter}
                        </div>
                        <span className="flex-1">{option}</span>
                        {isSelected && <CheckCircle className="h-5 w-5 text-primary-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => saveProgressMutation.mutate({ answers, currentIndex })}>
                <Save className="mr-2 h-4 w-4" /> Save Progress
              </Button>
              {currentIndex === questions.length - 1 ? (
                <Button variant="gradient" onClick={() => setShowConfirmSubmit(true)}>
                  Submit Exam <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showConfirmSubmit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <Card className="w-full max-w-md">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Submit Exam?</h3>
                  <div className="text-left bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Total Questions:</span>
                      <span className="font-medium">{questions.length}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Answered:</span>
                      <span className="font-medium text-green-600">
                        {Object.keys(answers).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Unanswered:</span>
                      <span className="font-medium text-red-600">
                        {questions.length - Object.keys(answers).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Flagged:</span>
                      <span className="font-medium text-yellow-600">
                        {flaggedQuestions.size}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 mb-6">
                    You cannot change your answers after submission.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={() => setShowConfirmSubmit(false)}>
                      Go Back
                    </Button>
                    <Button
                      variant="gradient"
                      onClick={handleSubmit}
                      loading={submitMutation.isPending}
                    >
                      Confirm Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}