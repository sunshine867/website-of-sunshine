'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

export default function ReadingExercise({ passage, questions = [], title, level }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <Card><CardContent className="p-6"><div className="flex items-center gap-2 mb-3"><Badge>{level}</Badge><h3 className="text-lg font-bold">{title || 'Reading Exercise'}</h3></div><div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">{passage}</div></CardContent></Card>
      
      {questions.map((q, i) => (
        <Card key={q.id}>
          <CardContent className="p-6">
            <p className="font-medium mb-3">Q{i + 1}. {q.question}</p>
            <div className="space-y-2">
              {q.options?.map((opt, j) => {
                const isSelected = answers[q.id] === opt;
                const isCorrect = submitted && opt === q.correctAnswer;
                const isWrong = submitted && isSelected && opt !== q.correctAnswer;
                return (
                  <button key={j} onClick={() => !submitted && setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'} ${isCorrect ? 'border-green-500 bg-green-50' : ''} ${isWrong ? 'border-red-500 bg-red-50' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold">{String.fromCharCode(65 + j)}</span>
                      <span className="flex-1">{opt}</span>
                      {isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {isWrong && <XCircle className="h-5 w-5 text-red-500" />}
                    </div>
                  </button>
                );
              })}
            </div>
            {submitted && q.explanation && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-800">{q.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {!submitted && questions.length > 0 && (
        <Button variant="gradient" size="lg" className="w-full" onClick={handleSubmit}>Submit Answers</Button>
      )}
      {submitted && (
        <Card className="text-center">
          <CardContent className="p-6">
            <p className="text-2xl font-extrabold text-primary-600">{score}/{questions.length} Correct</p>
            <p className="text-gray-500">{score === questions.length ? 'Perfect! 🎉' : score >= questions.length / 2 ? 'Good job! 👍' : 'Keep practicing! 💪'}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}