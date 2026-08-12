'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useApiQuery } from '@/hooks/use-api';
import { getInitials, formatDate } from '@/lib/utils';
import { Search, Users, TrendingUp, BookOpen, Mail, Eye } from 'lucide-react';

 

export default function TeacherStudentsPage() {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');

  const { data: studentsData, isLoading } = useApiQuery(
    ['teacher-students', { search }],
    () => {/* API call to get teacher's students */}
  );

  const students = [
    { id: 1, name: 'Ram Sharma', email: 'ram@email.com', course: 'JLPT N5', progress: 75, avatar: null, joined: '2026-01-15', status: 'ACTIVE' },
    { id: 2, name: 'Sita Poudel', email: 'sita@email.com', course: 'JLPT N4', progress: 45, avatar: null, joined: '2026-02-20', status: 'ACTIVE' },
    { id: 3, name: 'Hari Thapa', email: 'hari@email.com', course: 'JLPT N3', progress: 90, avatar: null, joined: '2026-03-10', status: 'ACTIVE' },
    { id: 4, name: 'Gita Devi', email: 'gita@email.com', course: 'JLPT N5', progress: 30, avatar: null, joined: '2026-04-05', status: 'INACTIVE' },
    { id: 5, name: 'Krishna Rai', email: 'krishna@email.com', course: 'JLPT N2', progress: 60, avatar: null, joined: '2026-05-12', status: 'ACTIVE' },
  ].filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">My Students</h1>
            <p className="text-gray-500 mt-1">Manage and track your students</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: students.length, icon: Users, color: 'bg-blue-500' },
          { label: 'Active', value: students.filter(s => s.status === 'ACTIVE').length, icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Avg Progress', value: Math.round(students.reduce((s, st) => s + st.progress, 0) / students.length) + '%', icon: BookOpen, color: 'bg-purple-500' },
          { label: 'Courses', value: [...new Set(students.map(s => s.course))].length, icon: BookOpen, color: 'bg-orange-500' },
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search students..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Students List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {students.map((student, i) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{getInitials(student.name.split(' ')[0], student.name.split(' ')[1])}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <Badge variant="outline">{student.course}</Badge>
                  </div>
                  <div className="w-32">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{student.progress}%</span>
                    </div>
                    <Progress value={student.progress} className="h-1.5" />
                  </div>
                  <Badge variant={student.status === 'ACTIVE' ? 'success' : 'secondary'}>
                    {student.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Link href={`/dashboard/students/${student.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}