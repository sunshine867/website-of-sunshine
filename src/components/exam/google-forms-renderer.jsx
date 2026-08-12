'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronUp, ChevronDown, Flag, CheckCircle, 
  AlertCircle, Clock, Eye, EyeOff 
} from 'lucide-react';

// Question Type Renderers
function MCQQuestion({ question, value, onChange }) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
      {question.options?.map((option, i) => (
        <label
          key={i}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            value === option.value 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <RadioGroupItem value={option.value} id={`opt-${i}`} />
          <div className="flex-1">
            {option.image && <img src={option.image} alt="" className="h-20 rounded-lg mb-2" />}
            <span>{option.label || option.value}</span>
          </div>
        </label>
      ))}
    </RadioGroup>
  );
}

function CheckboxQuestion({ question, value = [], onChange }) {
  const handleToggle = (optionValue) => {
    const current = [...value];
    const index = current.indexOf(optionValue);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(optionValue);
    }
    onChange(current);
  };

  return (
    <div className="space-y-3">
      {question.options?.map((option, i) => (
        <label
          key={i}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            value.includes(option.value)
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Checkbox
            checked={value.includes(option.value)}
            onCheckedChange={() => handleToggle(option.value)}
          />
          <span>{option.label || option.value}</span>
        </label>
      ))}
    </div>
  );
}

function LinearScaleQuestion({ question, value, onChange }) {
  const min = question.scaleMin || 1;
  const max = question.scaleMax || 5;
  const labels = question.scaleLabels || {};

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-500">
        <span>{labels.min || min}</span>
        <span>{labels.max || max}</span>
      </div>
      <div className="flex justify-center gap-4">
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((num) => (
          <button
            key={num}
            onClick={() => onChange(String(num))}
            className={`w-12 h-12 rounded-full text-lg font-bold transition-all ${
              value === String(num)
                ? 'bg-primary-600 text-white scale-110 shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

function MatrixGridQuestion({ question, value = {}, onChange }) {
  const handleCellChange = (rowIndex, colValue) => {
    onChange({ ...value, [rowIndex]: colValue });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 text-left"></th>
            {question.columns?.map((col, i) => (
              <th key={i} className="p-2 text-center text-sm font-medium text-gray-500">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {question.rows?.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              <td className="p-2 text-sm">{row}</td>
              {question.columns?.map((col, colIndex) => (
                <td key={colIndex} className="p-2 text-center">
                  <input
                    type="radio"
                    name={`row-${rowIndex}`}
                    checked={value[rowIndex] === col}
                    onChange={() => handleCellChange(rowIndex, col)}
                    className="w-5 h-5 text-primary-600"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Main Renderer Component
export default function GoogleFormsRenderer({ 
  questions = [], 
  onAnswer, 
  onSubmit,
  mode = 'exam',
  showTimer = true,
  durationMinutes = 60,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  // Timer
  useEffect(() => {
    if (!showTimer || isPaused || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onSubmit?.(answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showTimer, isPaused, timeLeft]);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    onAnswer?.(questionId, value);
  };

  const toggleFlag = (questionId) => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const renderQuestion = (question) => {
    const value = answers[question.id];
    
    switch (question.question_type) {
      case 'MCQ':
        return <MCQQuestion question={question} value={value} onChange={(v) => handleAnswer(question.id, v)} />;
      case 'MULTIPLE_RESPONSE':
        return <CheckboxQuestion question={question} value={value || []} onChange={(v) => handleAnswer(question.id, v)} />;
      case 'LINEAR_SCALE':
        return <LinearScaleQuestion question={question} value={value} onChange={(v) => handleAnswer(question.id, v)} />;
      case 'MATRIX_GRID':
        return <MatrixGridQuestion question={question} value={value || {}} onChange={(v) => handleAnswer(question.id, v)} />;
      case 'SHORT_ANSWER':
        return <Input value={value || ''} onChange={(e) => handleAnswer(question.id, e.target.value)} placeholder="Your answer" />;
      case 'LONG_ANSWER':
        return <Textarea value={value || ''} onChange={(e) => handleAnswer(question.id, e.target.value)} placeholder="Your answer" className="min-h-[150px]" />;
      default:
        return <p className="text-gray-500">Unsupported question type: {question.question_type}</p>;
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No questions available</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white z-30 pb-4 mb-6 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="hidden sm:flex gap-1">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-primary-600 w-4' :
                    answers[q.id] ? 'bg-green-400' :
                    flagged.has(q.id) ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          {showTimer && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold ${
              timeLeft < 300 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'
            }`}>
              <Clock className="h-4 w-4" />
              {formatTime(timeLeft)}
            </div>
          )}
        </div>
        <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-1.5" />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <Card className={`p-6 mb-6 ${flagged.has(currentQuestion?.id) ? 'border-yellow-400 border-2' : ''}`}>
            {/* Question Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline">Q{currentIndex + 1}</Badge>
                <Badge>{currentQuestion?.question_type?.replace(/_/g, ' ')}</Badge>
                {currentQuestion?.difficulty_level && (
                  <Badge variant="secondary">{currentQuestion.difficulty_level}</Badge>
                )}
                {currentQuestion?.marks && (
                  <Badge variant="default">{currentQuestion.marks} pts</Badge>
                )}
              </div>
              <button
                onClick={() => toggleFlag(currentQuestion?.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  flagged.has(currentQuestion?.id) ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                <Flag className={`h-5 w-5 ${flagged.has(currentQuestion?.id) ? 'fill-yellow-500' : ''}`} />
              </button>
            </div>

            {/* Question Text */}
            <h3 className="text-lg font-semibold mb-4">{currentQuestion?.question_text}</h3>

            {/* Question Media */}
            {currentQuestion?.media?.map((media, i) => (
              <div key={i} className="mb-4">
                {media.media_type === 'IMAGE' && (
                  <img src={media.media_url} alt={media.alt_text} className="max-h-64 rounded-lg" />
                )}
                {media.media_type === 'AUDIO' && (
                  <audio controls className="w-full"><source src={media.media_url} /></audio>
                )}
                {media.media_type === 'VIDEO' && (
                  <video controls className="w-full rounded-lg"><source src={media.media_url} /></video>
                )}
              </div>
            ))}

            {/* Answer Area */}
            {renderQuestion(currentQuestion)}
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
            >
              <ChevronUp className="mr-1 h-4 w-4" /> Previous
            </Button>
            
            <span className="text-sm text-gray-500">
              {answeredCount} of {questions.length} answered
            </span>

            {currentIndex === questions.length - 1 ? (
              <Button variant="gradient" onClick={() => setShowSubmitConfirm(true)}>
                <CheckCircle className="mr-1 h-4 w-4" /> Submit
              </Button>
            ) : (
              <Button onClick={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))}>
                Next <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showSubmitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <Card className="w-full max-w-md p-6 text-center">
                <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Submit Your Answers?</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
                  <div className="flex justify-between text-sm">
                    <span>Answered:</span>
                    <span className="text-green-600 font-bold">{answeredCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Unanswered:</span>
                    <span className="text-red-600 font-bold">{questions.length - answeredCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Flagged:</span>
                    <span className="text-yellow-600 font-bold">{flagged.size}</span>
                  </div>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => setShowSubmitConfirm(false)}>Go Back</Button>
                  <Button variant="gradient" onClick={() => onSubmit?.(answers)}>Confirm Submit</Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}