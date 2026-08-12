'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useApiQuery } from '@/hooks/use-api';
import { examsApi } from '@/lib/api/exams';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import {
  CheckCircle, XCircle, Clock, Target, Award,
  ArrowLeft, RotateCcw, Share2, Download
} from 'lucide-react';

export default function ExamResultPage() {
  const { id } = useParams();
  const { data: resultData, isLoading } = useApiQuery(
    ['exam-result', id],
    () => examsApi.getResult(id)
  );

  const result = resultData?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-16">
        <XCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-500">Result not found</h2>
        <Link href="/dashboard/exams">
          <Button variant="gradient" className="mt-4">Back to Exams</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Link href="/dashboard/exams" className="inline-flex items-center text-gray-500 hover:text-gray-700">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exams
      </Link>

      {/* Result Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className={`overflow-hidden border-2 ${
          result.is_passed ? 'border-green-200' : 'border-red-200'
        }`}>
          <div className={`p-8 text-center ${
            result.is_passed 
              ? 'bg-gradient-to-br from-green-50 to-emerald-50' 
              : 'bg-gradient-to-br from-red-50 to-rose-50'
          }`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              {result.is_passed ? (
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-12 w-12 text-green-600" />
                </div>
              ) : (
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-12 w-12 text-red-600" />
                </div>
              )}
            </motion.div>
            <h1 className="text-3xl font-extrabold mb-2">
              {result.is_passed ? 'Congratulations! 🎉' : 'Keep Practicing! 💪'}
            </h1>
            <p className="text-gray-600">
              {result.is_passed 
                ? 'You have successfully passed the exam!' 
                : 'Don\'t give up! Review your answers and try again.'}
            </p>
          </div>
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-extrabold text-primary-600">{result.percentage}%</p>
                <p className="text-sm text-gray-500">Score</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-green-600">{result.correct_answers}</p>
                <p className="text-sm text-gray-500">Correct</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-red-600">{result.wrong_answers}</p>
                <p className="text-sm text-gray-500">Wrong</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-600">{result.total_time_seconds ? `${Math.floor(result.total_time_seconds / 60)}m` : '-'}</p>
                <p className="text-sm text-gray-500">Time Taken</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Correct Answers</span>
                <span className="text-green-600 font-medium">{result.correct_answers}</span>
              </div>
              <Progress 
                value={(result.correct_answers / result.total_questions) * 100} 
                className="h-3 bg-gray-100 [&>div]:bg-green-500" 
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Wrong Answers</span>
                <span className="text-red-600 font-medium">{result.wrong_answers}</span>
              </div>
              <Progress 
                value={(result.wrong_answers / result.total_questions) * 100} 
                className="h-3 bg-gray-100 [&>div]:bg-red-500" 
              />
            </div>
            {result.skipped_questions > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Skipped</span>
                  <span className="text-yellow-600 font-medium">{result.skipped_questions}</span>
                </div>
                <Progress 
                  value={(result.skipped_questions / result.total_questions) * 100} 
                  className="h-3 bg-gray-100 [&>div]:bg-yellow-500" 
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Exam Details */}
      <Card>
        <CardHeader>
          <CardTitle>Exam Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Exam</p>
                <p className="font-medium">{result.exam?.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="font-medium">{formatDate(result.completed_at)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge variant={result.is_passed ? 'success' : 'danger'}>
                  {result.is_passed ? 'Passed' : 'Failed'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Rank</p>
                <p className="font-medium">{result.rank ? `#${result.rank}` : 'N/A'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 justify-center">
        <Link href={`/dashboard/exams/${result.exam_id}/take`}>
          <Button variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" /> Retake Exam
          </Button>
        </Link>
        <Button variant="ghost">
          <Share2 className="mr-2 h-4 w-4" /> Share Result
        </Button>
        <Button variant="ghost">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </div>
    </div>
  );
}