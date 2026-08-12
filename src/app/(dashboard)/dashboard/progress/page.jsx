'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useApiQuery } from '@/hooks/use-api';
import { coursesApi } from '@/lib/api/courses';
import { examsApi } from '@/lib/api/exams';
import { formatDate } from '@/lib/utils';
import {
  TrendingUp, Target, Award, Clock, BookOpen,
  CheckCircle, AlertCircle, Star
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

export default function ProgressPage() {
  const { data: enrollmentsData } = useApiQuery('enrollments', () => coursesApi.getMyEnrollments());
  const { data: resultsData } = useApiQuery('exam-results', () => examsApi.getMyResults());

  const enrollments = enrollmentsData?.data || [];
  const results = resultsData?.data || [];

  const skillData = [
    { subject: 'Vocabulary', score: 85, fullMark: 100 },
    { subject: 'Grammar', score: 72, fullMark: 100 },
    { subject: 'Kanji', score: 65, fullMark: 100 },
    { subject: 'Reading', score: 78, fullMark: 100 },
    { subject: 'Listening', score: 70, fullMark: 100 },
    { subject: 'Speaking', score: 60, fullMark: 100 },
  ];

  const scoreHistory = results.slice(0, 10).reverse().map((r, i) => ({
    name: `Exam ${i + 1}`,
    score: r.percentage,
    passing: 40,
  }));

  const totalStudyHours = enrollments.reduce((sum, e) => sum + (e.total_time_spent_minutes || 0), 0) / 60;
  const completedCourses = enrollments.filter(e => e.status === 'COMPLETED').length;
  const averageScore = results.length > 0
    ? Math.round(results.reduce((s, r) => s + r.percentage, 0) / results.length)
    : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-gray-900">Learning Progress</h1>
        <p className="text-gray-500 mt-1">Track your Japanese learning journey</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: 'Courses Enrolled', value: enrollments.length, color: 'bg-blue-500' },
          { icon: CheckCircle, label: 'Completed', value: completedCourses, color: 'bg-green-500' },
          { icon: Target, label: 'Avg Score', value: `${averageScore}%`, color: 'bg-purple-500' },
          { icon: Clock, label: 'Study Hours', value: `${Math.round(totalStudyHours)}h`, color: 'bg-orange-500' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Score History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" /> Exam Score History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scoreHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={scoreHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="passing" stroke="#EF4444" strokeDasharray="5 5" strokeWidth={1} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No exam data yet. Take an exam to see your progress!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skills Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" /> Skill Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={10} />
                <Radar name="Skills" dataKey="score" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {enrollments.map((enrollment, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium">{enrollment.course?.title}</p>
                    <p className="text-sm text-gray-500">{enrollment.course?.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <Progress value={enrollment.progress_percentage || 0} className="h-2" />
                    <p className="text-xs text-gray-500 text-right mt-1">
                      {enrollment.progress_percentage || 0}%
                    </p>
                  </div>
                  <Badge variant={
                    enrollment.status === 'COMPLETED' ? 'success' : 'default'
                  }>
                    {enrollment.status}
                  </Badge>
                </div>
              </div>
            ))}
            {enrollments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No courses enrolled yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Results */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Exam Results</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {results.slice(0, 10).map((result, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    result.is_passed ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {result.is_passed ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{result.exam?.title}</p>
                    <p className="text-sm text-gray-500">{formatDate(result.completed_at)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    result.is_passed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.percentage}%
                  </p>
                  <p className="text-xs text-gray-500">
                    {result.obtained_marks}/{result.total_marks} marks
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
