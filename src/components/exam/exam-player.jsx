
// src/components/exam/exam-player.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle,
  Flag,
  Send,
  Volume2,
  VolumeX,
  Download,
  Printer,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function ExamPlayer({
  title,
  level,
  type,
  sections,
  totalMarks,
  passingMarks,
  durationMinutes,
}) {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [showDetailedResults, setShowDetailedResults] = useState(true);
  const audioRef = useRef(null);

  // Get current section and question
  const section = sections[currentSection];
  const question = section?.questions[currentQuestion];
  const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0);
  const currentQuestionNumber = sections
    .slice(0, currentSection)
    .reduce((acc, s) => acc + s.questions.length, 0) + currentQuestion + 1;

  // Get the actual question ID from the question object
  const getQuestionId = (sIdx, qIdx) => {
    return sections[sIdx]?.questions[qIdx]?.id || `${sIdx}-${qIdx}`;
  };

  // Timer
  useEffect(() => {
    if (isSubmitted) return;
    if (timeRemaining <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isSubmitted]);

  // Audio player
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const handleTimeUpdate = () => {
        if (audio.duration) {
          setAudioProgress((audio.currentTime / audio.duration) * 100);
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setAudioProgress(0);
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [question?.audio]);

  // Handle answer selection
  const handleAnswer = (questionId, optionValue) => {
    if (isSubmitted) return;
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionValue
    }));
  };

  // Toggle flag
  const toggleFlag = () => {
    const questionId = getQuestionId(currentSection, currentQuestion);
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

  // Navigation
  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setCurrentQuestion(0);
    }
  };

  // Audio controls
  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Submit exam
  const handleSubmit = () => {
    if (isSubmitted) return;

    // Check if all questions are answered
    const answeredCount = Object.keys(answers).length;

    if (answeredCount < totalQuestions) {
      toast({
        title: 'Incomplete Exam',
        description: `You have ${totalQuestions - answeredCount} unanswered questions. Are you sure you want to submit?`,
        variant: 'destructive',
        action: (
          <Button
            variant="outline"
            onClick={() => {
              calculateResults();
              setIsSubmitted(true);
            }}
          >
            Submit Anyway
          </Button>
        ),
      });
      return;
    }

    calculateResults();
    setIsSubmitted(true);
  };

  // Calculate results
  const calculateResults = () => {
    let correct = 0;
    let total = 0;
    const detailedResults = [];

    sections.forEach((section, sIdx) => {
      section.questions.forEach((q, qIdx) => {
        const questionId = q.id || `${sIdx}-${qIdx}`;
        const userAnswer = answers[questionId];
        
        // Get correct answer from correctAnswer field or from options with value matching correct
        let correctAnswer = q.correctAnswer;
        if (!correctAnswer) {
          const correctOption = q.options.find(opt => opt.value === '1');
          correctAnswer = correctOption?.value;
        }
        
        // Find the text of the correct answer
        const correctOptionText = q.options.find(opt => opt.value === correctAnswer)?.text || correctAnswer;
        const userOptionText = q.options.find(opt => opt.value === userAnswer)?.text || userAnswer;
        
        const isCorrect = userAnswer === correctAnswer;
        
        if (isCorrect) correct++;
        total++;

        detailedResults.push({
          questionId,
          questionNumber: q.questionNumber || qIdx + 1,
          sectionTitle: section.title,
          questionText: q.questionText || q.instruction,
          instruction: q.instruction,
          image: q.image,
          userAnswer: userAnswer || 'Not Answered',
          userAnswerText: userOptionText || 'Not Answered',
          correctAnswer: correctAnswer,
          correctAnswerText: correctOptionText || correctAnswer,
          isCorrect,
          options: q.options,
        });
      });
    });

    const score = Math.round((correct / total) * 100);
    const isPassed = score >= (passingMarks / totalMarks) * 100;

    setResults({
      correct,
      total,
      score,
      isPassed,
      detailedResults,
      totalMarks,
      passingMarks,
      obtainedMarks: Math.round((correct / total) * totalMarks),
    });

    toast({
      title: isPassed ? '🎉 Congratulations!' : '😢 Keep Trying!',
      description: `You scored ${score}% (${correct}/${total})`,
      variant: isPassed ? 'default' : 'destructive',
    });
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Get answer status for a question
  const getQuestionStatus = (sIdx, qIdx) => {
    const questionId = getQuestionId(sIdx, qIdx);
    const isAnswered = !!answers[questionId];
    const isFlagged = flaggedQuestions.has(questionId);
    
    if (isFlagged) return 'flagged';
    if (isAnswered) return 'answered';
    return 'unanswered';
  };

  // Render question content
  const renderQuestion = () => {
    if (!question) return null;

    const questionId = question.id || `${currentSection}-${currentQuestion}`;
    const isFlagged = flaggedQuestions.has(questionId);
    const selectedAnswer = answers[questionId];

    return (
      <div className="space-y-6">
        {/* Question Header */}
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="secondary" className="mb-2">
              Question {currentQuestionNumber} of {totalQuestions}
            </Badge>
            <h3 className="text-lg font-semibold">{question.instruction}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFlag}
            className={isFlagged ? 'text-yellow-500' : ''}
          >
            <Flag className="h-5 w-5" />
          </Button>
        </div>

        {/* Question Text */}
        {question.questionText && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-line">{question.questionText}</p>
          </div>
        )}

        {/* Question Image */}
        {question.image && (
          <div className="relative w-full max-w-md mx-auto h-64">
            <Image
              src={question.image}
              alt="Question illustration"
              fill
              className="object-contain"
            />
          </div>
        )}

        {/* Audio */}
        {question.audio && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAudio}
              className="w-10 h-10 rounded-full"
            >
              {isPlaying ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <div className="flex-1">
              <Progress value={audioProgress} className="h-2" />
            </div>
            <audio ref={audioRef} src={question.audio} />
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option.value;
            const optionLabel = option.label || String.fromCharCode(65 + index);
            
            return (
              <motion.div
                key={`${questionId}-${index}-${option.value}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => handleAnswer(questionId, option.value)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${isSubmitted ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                      {optionLabel}
                    </span>
                    <span className="flex-1">{option.text}</span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render detailed results
// Render detailed results - Updated to show full question
const renderDetailedResults = () => {
  if (!results) return null;

  return (
    <div className="space-y-8">
      {/* Score Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-primary-600">{results.score}%</p>
            <p className="text-sm text-gray-500">Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-green-600">{results.correct}</p>
            <p className="text-sm text-gray-500">Correct</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-red-600">{results.total - results.correct}</p>
            <p className="text-sm text-gray-500">Incorrect</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className={`text-3xl font-bold ${results.isPassed ? 'text-green-600' : 'text-red-600'}`}>
              {results.isPassed ? '✅ Pass' : '❌ Fail'}
            </p>
            <p className="text-sm text-gray-500">Status</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => window.print()}>
          <Printer className="h-4 w-4 mr-2" /> Print Results
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" /> Download PDF
        </Button>
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" /> Share
        </Button>
      </div>

      {/* Detailed Results by Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Detailed Results</h3>
          <Badge variant="outline" className="text-sm">
            {results.correct}/{results.total} Correct
          </Badge>
        </div>

        {sections.map((section, sIdx) => {
          const sectionStart = sections.slice(0, sIdx).reduce((acc, s) => acc + s.questions.length, 0);
          const sectionEnd = sectionStart + section.questions.length;
          const sectionResults = results.detailedResults.slice(sectionStart, sectionEnd);

          if (sectionResults.length === 0) return null;

          const sectionCorrect = sectionResults.filter(r => r.isCorrect).length;

          return (
            <Card key={sIdx} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
                  <h4 className="font-semibold">{section.title}</h4>
                  <Badge variant="secondary">
                    {sectionCorrect}/{sectionResults.length} Correct
                  </Badge>
                </div>
                
                <div className="divide-y">
                  {sectionResults.map((result, qIdx) => {
                    // Get the original question data
                    const originalQuestion = section.questions[qIdx];
                    
                    return (
                      <div key={qIdx} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {result.isCorrect ? (
                              <CheckCircle className="h-6 w-6 text-green-500" />
                            ) : (
                              <XCircle className="h-6 w-6 text-red-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            {/* Question Header */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="font-bold text-base">Question {result.questionNumber}</span>
                              <Badge variant={result.isCorrect ? 'success' : 'destructive'} className="text-xs">
                                {result.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                              </Badge>
                            </div>
                            
                            {/* Full Question */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                              <p className="text-sm text-gray-500 font-medium mb-1">📝 Question:</p>
                              {originalQuestion?.questionText ? (
                                <p className="text-gray-800 whitespace-pre-line font-medium">
                                  {originalQuestion.questionText}
                                </p>
                              ) : (
                                <p className="text-gray-800 font-medium">
                                  {result.instruction || result.questionText}
                                </p>
                              )}
                              {originalQuestion?.image && (
                                <div className="mt-3 relative w-48 h-32">
                                  <Image
                                    src={originalQuestion.image}
                                    alt={`Question ${result.questionNumber}`}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              )}
                            </div>
                            
                            {/* Answer Comparison */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                <span className="text-xs text-gray-500 block mb-1">✅ Correct Answer</span>
                                <span className="font-semibold text-green-700">
                                  {result.correctAnswerText || result.correctAnswer || 'Not specified'}
                                </span>
                              </div>
                              <div className={result.isCorrect ? 'bg-green-50 p-3 rounded-lg border border-green-200' : 'bg-red-50 p-3 rounded-lg border border-red-200'}>
                                <span className="text-xs text-gray-500 block mb-1">
                                  {result.isCorrect ? '✅ Your Answer' : '❌ Your Answer'}
                                </span>
                                <span className={result.isCorrect ? 'font-semibold text-green-700' : 'font-semibold text-red-700'}>
                                  {result.userAnswerText || result.userAnswer || 'Not Answered'}
                                </span>
                              </div>
                            </div>

                            {/* Show all options for context */}
                            {originalQuestion?.options && originalQuestion.options.length > 0 && (
                              <div className="mt-3">
                                <p className="text-xs text-gray-500 mb-2">📋 All Options:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                  {originalQuestion.options.map((opt, optIdx) => {
                                    const isCorrect = opt.value === result.correctAnswer;
                                    const isUserAnswer = opt.value === result.userAnswer;
                                    let bgColor = 'bg-gray-50';
                                    if (isCorrect && isUserAnswer) bgColor = 'bg-green-100 border-green-500';
                                    else if (isCorrect) bgColor = 'bg-green-50 border-green-300';
                                    else if (isUserAnswer) bgColor = 'bg-red-100 border-red-500';
                                    
                                    return (
                                      <div 
                                        key={optIdx} 
                                        className={`text-xs p-2 rounded border ${bgColor} ${
                                          isCorrect ? 'border-green-300' : 
                                          isUserAnswer ? 'border-red-500' : 
                                          'border-gray-200'
                                        }`}
                                      >
                                        <span className="font-medium">{opt.label || String.fromCharCode(65 + optIdx)}.</span>
                                        <span className="ml-1">{opt.text}</span>
                                        {isCorrect && <span className="ml-1 text-green-600">✓</span>}
                                        {isUserAnswer && !isCorrect && <span className="ml-1 text-red-600">✗</span>}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Table */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4">Summary by Section</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Section</th>
                  <th className="text-center py-2 font-medium">Correct</th>
                  <th className="text-center py-2 font-medium">Incorrect</th>
                  <th className="text-center py-2 font-medium">Total</th>
                  <th className="text-right py-2 font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section, sIdx) => {
                  const sectionStart = sections.slice(0, sIdx).reduce((acc, s) => acc + s.questions.length, 0);
                  const sectionEnd = sectionStart + section.questions.length;
                  const sectionResults = results.detailedResults.slice(sectionStart, sectionEnd);
                  const correct = sectionResults.filter(r => r.isCorrect).length;
                  const total = sectionResults.length;
                  const score = total > 0 ? Math.round((correct / total) * 100) : 0;

                  return (
                    <tr key={sIdx} className="border-b hover:bg-gray-50">
                      <td className="py-2">{section.title}</td>
                      <td className="text-center py-2 text-green-600">{correct}</td>
                      <td className="text-center py-2 text-red-600">{total - correct}</td>
                      <td className="text-center py-2">{total}</td>
                      <td className="text-right py-2 font-medium">{score}%</td>
                    </tr>
                  );
                })}
                <tr className="font-bold bg-gray-50">
                  <td className="py-2">Total</td>
                  <td className="text-center py-2 text-green-600">{results.correct}</td>
                  <td className="text-center py-2 text-red-600">{results.total - results.correct}</td>
                  <td className="text-center py-2">{results.total}</td>
                  <td className="text-right py-2">{results.score}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Retake Button */}
      <div className="text-center pt-4">
        <Button onClick={() => {
          setAnswers({});
          setFlaggedQuestions(new Set());
          setCurrentSection(0);
          setCurrentQuestion(0);
          setIsSubmitted(false);
          setResults(null);
          setTimeRemaining(durationMinutes * 60);
        }}>
          🔄 Retake Exam
        </Button>
      </div>
    </div>
  );
};

  // Question navigator
  const renderQuestionNavigator = () => {
    let questionIndex = 0;
    
    return (
      <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
        {sections.map((section, sIdx) => (
          section.questions.map((_, qIdx) => {
            const status = getQuestionStatus(sIdx, qIdx);
            const isCurrent = sIdx === currentSection && qIdx === currentQuestion;
            const color = status === 'answered' ? 'bg-green-500' :
                          status === 'flagged' ? 'bg-yellow-500' :
                          'bg-gray-200';
            
            const qNum = ++questionIndex;
            
            return (
              <button
                key={`nav-${sIdx}-${qIdx}`}
                onClick={() => {
                  setCurrentSection(sIdx);
                  setCurrentQuestion(qIdx);
                }}
                className={`h-8 rounded-lg text-xs font-medium transition-all ${
                  isCurrent ? 'ring-2 ring-primary-500 scale-110' : ''
                } ${color} ${
                  status === 'answered' ? 'text-white' :
                  status === 'flagged' ? 'text-white' :
                  'text-gray-500'
                }`}
              >
                {qNum}
              </button>
            );
          })
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary">{level}</Badge>
                <Badge variant="outline">{type}</Badge>
              </div>
            </div>
            {!isSubmitted && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-5 w-5" />
                  <span className={`font-mono font-bold ${timeRemaining < 60 ? 'text-red-500' : ''}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <Progress 
                  value={(currentQuestionNumber / totalQuestions) * 100} 
                  className="w-32 h-2" 
                />
                <span className="text-sm text-gray-500">
                  {Math.round((currentQuestionNumber / totalQuestions) * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        {!isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question Area */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentSection}-${currentQuestion}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderQuestion()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={goToPrevious}
                      disabled={currentSection === 0 && currentQuestion === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                    <div className="flex gap-2">
                      {currentQuestion === section.questions.length - 1 && 
                       currentSection === sections.length - 1 ? (
                        <Button onClick={handleSubmit}>
                          <Send className="h-4 w-4 mr-2" /> Submit Exam
                        </Button>
                      ) : (
                        <Button onClick={goToNext}>
                          Next <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Question Navigator</h4>
                    {renderQuestionNavigator()}
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-green-500" />
                        <span>Answered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-yellow-500" />
                        <span>Flagged</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-gray-200" />
                        <span>Unanswered</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Progress</p>
                      <p className="text-2xl font-bold">
                        {Object.keys(answers).length}/{totalQuestions}
                      </p>
                      <Progress 
                        value={(Object.keys(answers).length / totalQuestions) * 100} 
                        className="h-2 mt-2" 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          renderDetailedResults()
        )}
      </div>
    </div>
  );
}

