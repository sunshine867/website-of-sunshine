'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApiQuery } from '@/hooks/use-api';
import { coursesApi } from '@/lib/api/courses';
import { BookOpen, Clock, Star, Users, CheckCircle, ArrowLeft, ShoppingCart } from 'lucide-react';

export default function PublicCourseDetailPage() {
  const { slug } = useParams();
  const { data: courseData, isLoading } = useApiQuery(['course', slug], () => coursesApi.getBySlug(slug));
  const course = courseData?.data;

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" /></div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-gray-500">Course not found</h1><Link href="/courses"><Button variant="gradient" className="mt-4">Browse Courses</Button></Link></div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/courses" className="inline-flex items-center text-white/70 hover:text-white mb-6"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses</Link>
          <Badge className="mb-4 bg-white/20 text-white border-white/30">{course.level}</Badge>
          <h1 className="text-4xl font-extrabold mb-4">{course.title}</h1>
          <p className="text-xl text-white/80">{course.short_description || course.description}</p>
          <div className="flex items-center gap-6 mt-6 text-white/70">
            <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {course.total_lessons} Lessons</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.total_duration_minutes} min</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-300" /> {course.average_rating}</span>
            <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.total_enrollments} Students</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card><CardContent className="p-8"><h2 className="text-2xl font-bold mb-4">About This Course</h2><div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: course.description }} /></CardContent></Card>
            {course.learning_outcomes?.length > 0 && (
              <Card><CardContent className="p-8"><h2 className="text-2xl font-bold mb-4">What You'll Learn</h2><div className="grid grid-cols-2 gap-3">{course.learning_outcomes.map((outcome, i) => (<div key={i} className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span className="text-gray-600">{outcome}</span></div>))}</div></CardContent></Card>
            )}
            {course.lessons?.length > 0 && (
              <Card><CardContent className="p-8"><h2 className="text-2xl font-bold mb-4">Course Content</h2><div className="space-y-2">{course.lessons.map((lesson, i) => (<div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span><div><p className="font-medium">{lesson.title}</p><p className="text-xs text-gray-500">{lesson.lesson_type} • {lesson.duration_minutes} min</p></div></div>))}</div></CardContent></Card>
            )}
          </div>
          <div>
            <div className="sticky top-24">
              <Card><CardContent className="p-6 text-center"><p className="text-4xl font-extrabold text-primary-600 mb-4">{course.price === 0 ? 'Free' : `NPR ${course.price?.toLocaleString()}`}</p><Link href={`/register?course=${course.id}`}><Button variant="gradient" size="lg" className="w-full mb-3"><ShoppingCart className="mr-2 h-5 w-5" /> Enroll Now</Button></Link><Link href="/apply"><Button variant="outline" className="w-full">Get Free Counseling</Button></Link><div className="mt-6 space-y-3 text-left text-sm">{[{ icon: BookOpen, text: `${course.total_lessons} lessons` },{ icon: Clock, text: `${course.total_duration_minutes} minutes` },{ icon: Star, text: `${course.average_rating} rating` },{ icon: Users, text: `${course.total_enrollments} students` }].map((item, i) => (<div key={i} className="flex items-center gap-2 text-gray-600"><item.icon className="h-4 w-4" /><span>{item.text}</span></div>))}</div></CardContent></Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}