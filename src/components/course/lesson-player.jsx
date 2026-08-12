'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle, Play, FileText, Download, Maximize2 } from 'lucide-react';

export default function LessonPlayer({ lesson, course, onComplete, onNext, onPrevious, hasNext, hasPrevious }) {
  const [completed, setCompleted] = useState(lesson?.completed || false);

  const handleComplete = () => {
    setCompleted(true);
    onComplete?.(lesson);
  };

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">No lesson selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge className="mb-2">{lesson.lesson_type}</Badge>
          <h2 className="text-xl font-bold">{lesson.title}</h2>
          <p className="text-sm text-gray-500">{lesson.duration_minutes} minutes</p>
        </div>
        {completed && (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Completed
          </Badge>
        )}
      </div>

      {/* Video Player */}
      {lesson.video_url && (
        <Card className="overflow-hidden">
          <div className="aspect-video bg-black flex items-center justify-center relative group cursor-pointer">
            <Play className="h-16 w-16 text-white/80 group-hover:scale-110 transition-transform" />
            <button className="absolute bottom-3 right-3 text-white/80 hover:text-white">
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
        </Card>
      )}

      {/* Lesson Content */}
      {lesson.content_text && (
        <Card>
          <CardContent className="p-6">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content_text }} />
          </CardContent>
        </Card>
      )}

      {/* Attachments */}
      {lesson.attachments && lesson.attachments.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3">Downloads</h4>
            <div className="space-y-2">
              {lesson.attachments.map((attachment, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary-600" />
                    <span className="text-sm">{attachment.name || `Resource ${i + 1}`}</span>
                  </div>
                  <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation & Complete */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button variant="outline" onClick={onPrevious} disabled={!hasPrevious}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Previous
        </Button>
        <Button variant="gradient" onClick={handleComplete} disabled={completed}>
          <CheckCircle className="mr-2 h-4 w-4" /> {completed ? 'Completed' : 'Mark Complete'}
        </Button>
        <Button onClick={onNext} disabled={!hasNext}>
          Next <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}