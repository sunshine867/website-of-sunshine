'use client';

import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, RotateCcw, Volume2, CheckCircle } from 'lucide-react';

export default function ListeningExercise({ audioUrl, transcript, questions = [], title, level }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const audioRef = useRef(null);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4"><Badge>{level}</Badge><h3 className="text-lg font-bold">{title || 'Listening Exercise'}</h3></div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <Button size="icon" variant="gradient" className="rounded-full h-14 w-14" onClick={() => { if (isPlaying) { audioRef.current?.pause(); } else { audioRef.current?.play(); } setIsPlaying(!isPlaying); }}>
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            </Button>
            <div><p className="font-medium">Audio Exercise</p><p className="text-sm text-gray-500">Listen carefully and answer the questions</p></div>
            <div className="flex-1" />
            <Button variant="ghost" size="sm" onClick={() => setShowTranscript(!showTranscript)}>{showTranscript ? 'Hide' : 'Show'} Transcript</Button>
          </div>
          {showTranscript && transcript && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-600 whitespace-pre-line">{transcript}</p></div>
          )}
        </CardContent>
      </Card>

      {questions.map((q, i) => (
        <Card key={q.id}>
          <CardContent className="p-6">
            <p className="font-medium mb-3">Q{i + 1}. {q.question}</p>
            <div className="space-y-2">
              {q.options?.map((opt, j) => (
                <button key={j} onClick={() => !submitted && setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${answers[q.id] === opt ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'} ${submitted && opt === q.correctAnswer ? 'border-green-500 bg-green-50' : ''}`}
                >
                  <span>{opt}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {!submitted && <Button variant="gradient" className="w-full" onClick={() => setSubmitted(true)}>Submit</Button>}
    </div>
  );
}