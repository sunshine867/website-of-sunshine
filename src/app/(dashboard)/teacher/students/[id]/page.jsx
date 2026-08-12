'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getInitials } from '@/lib/utils';
import {
  ArrowLeft, Mail, Phone, BookOpen, FileText,
  TrendingUp, Calendar, Clock
} from 'lucide-react';

export default function StudentDetailPage() {
  const { id } = useParams();

  // Mock student data
  const student = {
    id,
    name: 'Ram Sharma',
    email: 'ram@email.com',
    phone: '9841XXXXXX',
    avatar: null,
    level: 'N4',
    joined: '2026-01-15',
    status: 'ACTIVE',
    enrollments: [
      { course: 'JLPT N5', progress: 100, completed: true, date: '2026-03-15' },
      { course: 'JLPT N4', progress: 65, completed: false, date: '2026-04-01' },
    ],
    exams: [
      { title: 'N5 Final Exam', score: 88, passed: true, date: '2026-03-10' },
      { title: 'N4 Mid-Term', score: 72, passed: true, date: '2026-06-15' },
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/dashboard/students" className="inline-flex items-center text-gray-500 hover:text-gray-700">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Students
      </Link>

      {/* Student Profile */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl bg-primary-100 text-primary-700">
                  {getInitials(student.name.split(' ')[0], student.name.split(' ')[1])}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{student.name}</h1>
                  <Badge variant={student.status === 'ACTIVE' ? 'success' : 'secondary'}>
                    {student.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {student.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> {student.phone}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Joined: {student.joined}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Mail className="mr-1 h-4 w-4" /> Contact</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Course Progress */}
      <Card>
        <CardHeader><CardTitle>Course Progress</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {student.enrollments.map((enrollment, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <BookOpen className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="font-medium">{enrollment.course}</p>
                    <p className="text-sm text-gray-500">Enrolled: {enrollment.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40">
                    <Progress value={enrollment.progress} className="h-2" />
                    <p className="text-xs text-right mt-1">{enrollment.progress}%</p>
                  </div>
                  <Badge variant={enrollment.completed ? 'success' : 'default'}>
                    {enrollment.completed ? 'Completed' : 'In Progress'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exam Results */}
      <Card>
        <CardHeader><CardTitle>Exam Results</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {student.exams.map((exam, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="font-medium">{exam.title}</p>
                    <p className="text-sm text-gray-500">{exam.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${exam.passed ? 'text-green-600' : 'text-red-600'}`}>
                    {exam.score}%
                  </p>
                  <Badge variant={exam.passed ? 'success' : 'danger'}>
                    {exam.passed ? 'Passed' : 'Failed'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}