'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mic, StopCircle, Play, RotateCcw, CheckCircle } from 'lucide-react';

export default function SpeakingExercise({ prompt, promptReading, promptMeaning, modelAnswer, tips = [], level }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-8 text-center">
          <Badge className="mb-4">{level}</Badge>
          <h2 className="text-3xl font-bold mb-4">{prompt}</h2>
          {promptReading && <p className="text-lg text-gray-500 mb-2">{promptReading}</p>}
          <p className="text-gray-600 mb-6">{promptMeaning}</p>
          
          <div className="flex justify-center gap-4 mb-6">
            {!recorded ? (
              <Button size="lg" variant={isRecording ? 'destructive' : 'gradient'} className="rounded-full h-16 w-16" onClick={() => { setIsRecording(!isRecording); if (!isRecording) setTimeout(() => { setIsRecording(false); setRecorded(true); }, 3000); }}>
                {isRecording ? <StopCircle className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button size="lg" variant="outline" className="rounded-full h-16 w-16"><Play className="h-8 w-8" /></Button>
                <Button size="lg" variant="outline" className="rounded-full h-16 w-16" onClick={() => setRecorded(false)}><RotateCcw className="h-8 w-8" /></Button>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">{isRecording ? 'Recording... Speak now!' : recorded ? 'Recording complete! Listen to your recording.' : 'Press the microphone to start speaking'}</p>
        </CardContent>
      </Card>

      {tips.length > 0 && (
        <Card><CardContent className="p-6"><h3 className="font-bold mb-3">Tips</h3><ul className="space-y-2">{tips.map((tip, i) => (<li key={i} className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />{tip}</li>))}</ul></CardContent></Card>
      )}

      <Button variant="outline" className="w-full" onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? 'Hide' : 'Show'} Model Answer</Button>
      {showAnswer && modelAnswer && (
        <Card><CardContent className="p-6"><p className="text-lg">{modelAnswer}</p></CardContent></Card>
      )}
    </div>
  );
}