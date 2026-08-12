'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useApiQuery } from '@/hooks/use-api';
import { coursesApi } from '@/lib/api/courses';
import { Search, Filter, BookOpen, Clock, Star, Play, ArrowRight } from 'lucide-react';

export default function MyCoursesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const { data: enrollmentsData, isLoading } = useApiQuery(
    'my-enrollments',
    () => coursesApi.getMyEnrollments()
  );

  const enrollments = enrollmentsData?.data || [];

  const filteredEnrollments = enrollments.filter(e => {
    const matchesSearch = e.course?.title?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || e.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">My Courses</h1>
            <p className="text-gray-500 mt-1">Continue your learning journey</p>
          </div>
          <Link href="/courses">
            <Button variant="gradient">
              <BookOpen className="mr-2 h-4 w-4" /> Browse Courses
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search your courses..."
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
          <option value="all">All Courses</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="DROPPED">Dropped</option>
        </select>
      </div>

      {/* Course Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <div className="h-40 bg-gray-200 rounded-t-2xl" />
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredEnrollments.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">No courses found</h3>
          <p className="text-gray-400 mb-4">Start learning by enrolling in a course</p>
          <Link href="/courses">
            <Button variant="gradient">Browse Courses</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnrollments.map((enrollment, i) => (
            <motion.div
              key={enrollment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/dashboard/courses/${enrollment.course_id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all group h-full">
                  <div className="h-2 bg-gradient-to-r from-primary-500 to-secondary-500"
                    style={{ width: `${enrollment.progress_percentage || 0}%` }} />
                  <div className="h-40 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-4xl relative">
                    📚
                    <Badge className="absolute top-3 left-3">
                      {enrollment.course?.level}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                      {enrollment.course?.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" /> {enrollment.course?.total_lessons} Lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {enrollment.course?.total_duration_minutes}min
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-bold text-primary-600">{enrollment.progress_percentage || 0}%</span>
                    </div>
                    <Progress value={enrollment.progress_percentage || 0} className="h-2 mb-4" />
                    <div className="flex items-center justify-between">
                      <Badge variant={
                        enrollment.status === 'COMPLETED' ? 'success' :
                        enrollment.status === 'ACTIVE' ? 'default' : 'secondary'
                      }>
                        {enrollment.status}
                      </Badge>
                      <Button variant="gradient" size="sm">
                        <Play className="mr-1 h-3 w-3" /> Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}