
'use client';

 

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/components/providers/auth-provider';
import StatsCard from '@/components/dashboard/stats-card';
import {
  BookOpen, FileText, Trophy, Clock, TrendingUp,
  Target, ArrowRight, Play, Star, Plane, CreditCard
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();

  const stats = [
    { icon: BookOpen, label: 'Enrolled Courses', value: 3, color: 'bg-blue-500' },
    { icon: FileText, label: 'Exams Taken', value: 12, color: 'bg-green-500' },
    { icon: Trophy, label: 'Average Score', value: '85%', color: 'bg-yellow-500' },
    { icon: Clock, label: 'Study Hours', value: '24h', color: 'bg-purple-500' },
  ];

  const courses = [
    { id: 1, title: 'JLPT N5 Complete Course', level: 'N5', progress: 75, lessons: 40 },
    { id: 2, title: 'Japanese Vocabulary Builder', level: 'N4', progress: 45, lessons: 30 },
    { id: 3, title: 'Kanji Mastery Course', level: 'N5', progress: 20, lessons: 25 },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's your learning overview</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <StatsCard icon={stat.icon} label={stat.label} value={stat.value} color={stat.color} />
          </motion.div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Current Courses</h2>
          <Link href="/student/courses"><Button variant="ghost" size="sm">View All <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, i) => (
            <motion.div key={course.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
              <Card className="overflow-hidden">
                <div className="h-2 bg-primary-500" style={{ width: `${course.progress}%` }} />
                <CardContent className="p-5">
                  <Badge className="mb-2">{course.level}</Badge>
                  <h3 className="font-bold mb-2">{course.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{course.lessons} Lessons</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <Link href={`/student/courses/${course.id}`}>
                    <Button variant="gradient" size="sm" className="w-full mt-4">
                      <Play className="mr-2 h-4 w-4" /> Continue Learning
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: 'Browse Courses', href: '/courses', color: 'bg-blue-500' },
          { icon: FileText, label: 'Take Mock Exam', href: '/student/exams', color: 'bg-green-500' },
          { icon: Target, label: 'Study Plan', href: '/student/progress', color: 'bg-purple-500' },
          { icon: Plane, label: 'Apply Abroad', href: '/student/study-abroad', color: 'bg-orange-500' },
        ].map((action, i) => {
          const Icon = action.icon;
          return (
            <Link key={i} href={action.href}>
              <Card className="text-center hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-medium text-sm">{action.label}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
