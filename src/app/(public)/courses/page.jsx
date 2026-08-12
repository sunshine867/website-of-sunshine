'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useApiQuery } from '@/hooks/use-api';
import { coursesApi } from '@/lib/api/courses';
import { Search, Filter, Star, Clock, BookOpen, ArrowRight } from 'lucide-react';

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const { data, isLoading } = useApiQuery(['courses', { search, level: levelFilter, type: typeFilter }], 
    () => coursesApi.getAll({ search, level: levelFilter, course_type: typeFilter })
  );

  const courses = data?.data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-extrabold mb-4">Japanese Language Courses</h1>
            <p className="text-xl text-white/80 mb-8">From N5 beginner to N1 advanced</p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search courses..."
                className="pl-12 h-14 text-gray-900 text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="h-5 w-5 text-gray-500" />
          {['all', 'N5', 'N4', 'N3', 'N2', 'N1'].map(level => (
            <Badge
              key={level}
              variant={levelFilter === level ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setLevelFilter(level)}
            >
              {level === 'all' ? 'All Levels' : level}
            </Badge>
          ))}
          <div className="w-px h-6 bg-gray-300 mx-2" />
          {['all', 'FREE', 'PAID', 'SUBSCRIPTION'].map(type => (
            <Badge
              key={type}
              variant={typeFilter === type ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setTypeFilter(type)}
            >
              {type === 'all' ? 'All Types' : type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-2xl" />
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/courses/${course.slug}`}>
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-all group">
                    <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-400 flex items-center justify-center text-6xl relative overflow-hidden">
                      <span className="relative z-10">📚</span>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900">
                        {course.level}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {course.short_description || course.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" /> {course.total_lessons} Lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> {course.total_duration_minutes}min
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" /> {course.average_rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-extrabold text-primary-600">
                          {course.price === 0 ? 'Free' : `NPR ${course.price?.toLocaleString()}`}
                        </span>
                        <Button variant="gradient" size="sm">
                          View Course <ArrowRight className="ml-1 h-4 w-4" />
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
    </div>
  );
}
