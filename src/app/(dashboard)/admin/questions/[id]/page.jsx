// apps/web/src/app/(dashboard)/admin/questions/[id]/page.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Copy,
  RefreshCw,
  FileQuestion,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

// ✅ DEFAULT EXPORT
export default function QuestionDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/questions/${id}`);
      setQuestion(response.data);
    } catch (error) {
      console.error('Failed to fetch question:', error);
      toast.error('Failed to load question');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800',
      pending_review: 'bg-orange-100 text-orange-800',
      archived: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || colors.draft;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      elementary: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      upper_intermediate: 'bg-orange-100 text-orange-800',
      advanced: 'bg-red-100 text-red-800',
      expert: 'bg-purple-100 text-purple-800',
    };
    return colors[difficulty] || colors.intermediate;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-96">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Question Not Found</h3>
            <Button className="mt-4" onClick={() => router.push('/admin/questions')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Questions
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/admin/questions')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Question Details</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <Badge variant="outline">{question.code}</Badge>
              <Badge className={getStatusColor(question.status)}>{question.status}</Badge>
              <Badge variant="secondary">{question.question_type}</Badge>
              {question.difficulty && (
                <Badge className={getDifficultyColor(question.difficulty)}>
                  {question.difficulty}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchQuestion}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
        </div>
      </div>

      {/* Question Content */}
      <Card>
        <CardHeader>
          <CardTitle>Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/20 rounded-lg">
            <p className="text-lg">{question.question_text}</p>
          </div>

          {question.hint && (
            <div>
              <p className="text-sm text-muted-foreground">Hint:</p>
              <p className="text-sm">{question.hint}</p>
            </div>
          )}

          {question.options && question.options.length > 0 && (
            <div>
              <p className="font-medium mb-2">Options:</p>
              <div className="space-y-2">
                {question.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border ${
                      opt.is_correct
                        ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                        : 'border-gray-200'
                    }`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + idx)}.</span>
                    <span className="ml-2">{opt.option_text}</span>
                    {opt.is_correct && (
                      <Badge className="ml-2 bg-green-600">Correct</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {question.explanation && (
            <div>
              <p className="text-sm text-muted-foreground">Explanation:</p>
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Marks</p>
              <p className="font-medium">{question.marks || 1}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Negative Marks</p>
              <p className="font-medium">{question.negative_marks || 0}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time Limit</p>
              <p className="font-medium">{question.time_seconds ? `${question.time_seconds}s` : 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Usage Count</p>
              <p className="font-medium">{question.usage_count || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}