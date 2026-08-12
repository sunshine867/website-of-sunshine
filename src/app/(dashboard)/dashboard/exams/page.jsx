'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { examsApi } from '@/lib/api/exams';
import { formatDate } from '@/lib/utils';
import {
  FileText, Clock, Target, Search, Filter,
  Play, Trophy, TrendingUp, AlertCircle
} from 'lucide-react';

export default function ExamsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const { data: availableExams } = useApiQuery('available-exams', () => examsApi.getAvailable());
  const { data: myResults } = useApiQuery('my-results', () => examsApi.getMyResults());
  const startExamMutation = useApiMutation((id) => examsApi.start(id));

  const exams = availableExams?.data || [];
  const results = myResults?.data || [];

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || exam.exam_type === filter || exam.level === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-gray-900">Exams</h1>
        <p className="text-gray-500 mt-1">Take practice exams and track your progress</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: FileText, label: 'Total Exams', value: results.length, color: 'bg-blue-500' },
          { icon: Trophy, label: 'Passed', value: results.filter(r => r.is_passed).length, color: 'bg-green-500' },
          { icon: Target, label: 'Avg Score', value: results.length ? `${Math.round(results.reduce((s, r) => s + r.percentage, 0) / results.length)}%` : '0%', color: 'bg-yellow-500' },
          { icon: TrendingUp, label: 'Best Score', value: results.length ? `${Math.max(...results.map(r => r.percentage))}%` : '0%', color: 'bg-purple-500' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
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

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search exams..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="border rounded-lg px-4 py-2 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Exams</option>
          <option value="MOCK">Mock Exams</option>
          <option value="PRACTICE">Practice</option>
          <option value="CHAPTER_TEST">Chapter Tests</option>
          <option value="N5">N5 Level</option>
          <option value="N4">N4 Level</option>
          <option value="N3">N3 Level</option>
          <option value="N2">N2 Level</option>
        </select>
      </div>

      {/* Available Exams */}
      <div>
        <h2 className="text-xl font-bold mb-4">Available Exams</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExams.map((exam, i) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <Badge className="mb-3">{exam.exam_type}</Badge>
                  <h3 className="font-bold text-lg mb-2">{exam.title}</h3>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>{exam.total_questions} Questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{exam.duration_minutes} Minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span>Passing: {exam.passing_marks} marks</span>
                    </div>
                  </div>
                  <Button
                    variant="gradient"
                    className="w-full"
                    onClick={() => startExamMutation.mutate(exam.id, {
                      onSuccess: (data) => {
                        // Navigate to exam taking page
                        window.location.href = `/dashboard/exams/${exam.id}/take?attempt=${data.data.id}`;
                      }
                    })}
                    loading={startExamMutation.isPending}
                  >
                    <Play className="mr-2 h-4 w-4" /> Start Exam
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Results */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Results</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {results.slice(0, 10).map((result, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div>
                    <p className="font-medium">{result.exam?.title}</p>
                    <p className="text-sm text-gray-500">{formatDate(result.completed_at)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`text-lg font-bold ${result.is_passed ? 'text-green-600' : 'text-red-600'}`}>
                        {result.percentage}%
                      </p>
                      <p className="text-xs text-gray-500">
                        {result.obtained_marks}/{result.total_marks} marks
                      </p>
                    </div>
                    <Badge variant={result.is_passed ? 'success' : 'danger'}>
                      {result.is_passed ? 'Passed' : 'Failed'}
                    </Badge>
                    <Link href={`/dashboard/exams/results/${result.id}`}>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
