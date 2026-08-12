import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, Target, Play, BarChart3 } from 'lucide-react';

export default function ExamCard({ exam, result, onStart }) {
  const isCompleted = result?.status === 'COMPLETED';
  
  return (
    <Card className="hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <div className="flex items-start gap-2 mb-3">
          <Badge>{exam.exam_type}</Badge>
          <Badge variant="outline">{exam.level}</Badge>
          {isCompleted && <Badge variant={result.is_passed ? 'success' : 'danger'}>{result.is_passed ? 'Passed' : 'Failed'}</Badge>}
        </div>
        <h3 className="font-bold text-lg mb-3">{exam.title}</h3>
        <div className="space-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2"><FileText className="h-4 w-4" /> {exam.total_questions} Questions</div>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {exam.duration_minutes} Minutes</div>
          <div className="flex items-center gap-2"><Target className="h-4 w-4" /> Passing: {exam.passing_marks} marks</div>
        </div>
        {result && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg text-center">
            <p className={`text-xl font-bold ${result.is_passed ? 'text-green-600' : 'text-red-600'}`}>{result.percentage}%</p>
            <p className="text-xs text-gray-500">{result.obtained_marks}/{result.total_marks} marks</p>
          </div>
        )}
        <div className="flex gap-2">
          {onStart && !isCompleted && (
            <Button variant="gradient" className="flex-1" onClick={onStart}>
              <Play className="mr-1 h-4 w-4" /> {result ? 'Retake' : 'Start'}
            </Button>
          )}
          {result && (
            <Link href={`/dashboard/exams/results/${result.id}`} className="flex-1">
              <Button variant="outline" className="w-full"><BarChart3 className="mr-1 h-4 w-4" /> Details</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}