'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { coursesApi } from '@/lib/api/courses';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Search, Plus, Edit, Trash2, Eye, Star, BookOpen, Users } from 'lucide-react';
import ConfirmDialog from '@/components/shared/confirm-dialog';
import LoadingSpinner from '@/components/shared/loading-spinner';


   // ✅ ADD THIS



export default function AdminCoursesPage() {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteId, setDeleteId] = useState(null);

  // Fetch ALL courses from backend (including drafts)
  const { data: coursesData, isLoading, refetch } = useApiQuery(
    ['admin-courses', { search, level: levelFilter, status: statusFilter }],
    () => coursesApi.getAll({ 
      search, 
      level: levelFilter, 
      status: statusFilter,
      includeAll: true,
      limit: 50 
    })
  );

  const deleteMutation = useApiMutation(
    (id) => coursesApi.delete(id),
    { 
      successMessage: 'Course deleted successfully', 
      invalidateQueries: 'admin-courses',
      onSuccess: () => setDeleteId(null)
    }
  );

  const courses = coursesData?.data?.data || [];
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(c => c.status === 'PUBLISHED').length;
  const draftCourses = courses.filter(c => c.status === 'DRAFT').length;
  const totalStudents = courses.reduce((sum, c) => sum + (c.total_enrollments || 0), 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Course Management</h1>
            <p className="text-gray-500 mt-1">Manage all courses on the platform</p>
          </div>
          <Link href="/admin/courses/create">
            <Button variant="gradient">
              <Plus className="mr-2 h-4 w-4" /> Create Course
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Courses', value: totalCourses, icon: BookOpen, color: 'bg-blue-500' },
          { label: 'Published', value: publishedCourses, icon: Eye, color: 'bg-green-500' },
          { label: 'Drafts', value: draftCourses, icon: Edit, color: 'bg-yellow-500' },
          { label: 'Total Students', value: totalStudents, icon: Users, color: 'bg-purple-500' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="border rounded-lg px-3 py-2 text-sm bg-white" value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          <option value="all">All Levels</option>
          <option value="N5">N5</option>
          <option value="N4">N4</option>
          <option value="N3">N3</option>
          <option value="N2">N2</option>
          <option value="N1">N1</option>
        </select>
        <select className="border rounded-lg px-3 py-2 text-sm bg-white" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">No courses found</p>
            <Link href="/admin/courses/create">
              <Button variant="gradient">Create Your First Course</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all">
                {/* Course image */}
                <div className="h-32 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-3xl relative">
                  📚
                  <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700">{course.level}</Badge>
                </div>

                <CardContent className="p-5">
                  {/* Status badges */}
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={course.status === 'PUBLISHED' ? 'success' : course.status === 'DRAFT' ? 'warning' : 'secondary'}>
                      {course.status}
                    </Badge>
                    <Badge variant="outline">{course.course_type}</Badge>
                    {course.is_featured && <Badge variant="default">Featured</Badge>}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.short_description || course.description}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{course.total_enrollments || 0} students</span>
                    <span>{course.total_lessons || 0} lessons</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-extrabold text-primary-600">
                      {course.price === 0 ? 'Free' : formatCurrency(course.price)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(course.created_at)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/admin/courses/${course.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="mr-1 h-3 w-3" /> Edit
                      </Button>
                    </Link>
                    {course.status === 'PUBLISHED' ? (
                      <Link href={`/courses/${course.slug}`} target="_blank">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    ) : null}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setDeleteId(course.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Course"
        description="Are you sure you want to delete this course? This action cannot be undone."
        confirmLabel="Delete Course"
        onConfirm={() => deleteMutation.mutate(deleteId)}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}