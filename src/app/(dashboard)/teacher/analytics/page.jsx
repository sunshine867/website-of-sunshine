'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApiQuery } from '@/hooks/use-api';
import { analyticsApi } from '@/lib/api/analytics';
import {
  TrendingUp, Users, BookOpen, DollarSign, Star,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const enrollmentData = [
  { month: 'Jan', students: 45 },
  { month: 'Feb', students: 52 },
  { month: 'Mar', students: 61 },
  { month: 'Apr', students: 58 },
  { month: 'May', students: 72 },
  { month: 'Jun', students: 85 },
  { month: 'Jul', students: 78 },
];

const coursePerformance = [
  { name: 'N5 Course', students: 120, rating: 4.8 },
  { name: 'N4 Course', students: 85, rating: 4.6 },
  { name: 'N3 Course', students: 65, rating: 4.5 },
  { name: 'N2 Course', students: 40, rating: 4.3 },
];

export default function TeacherAnalyticsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">Analytics</h1>
        <p className="text-gray-500 mt-1">Track your teaching performance</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: '310', icon: Users, color: 'bg-blue-500', trend: '+12%', up: true },
          { label: 'Active Courses', value: '4', icon: BookOpen, color: 'bg-green-500', trend: '0%', up: true },
          { label: 'Avg Rating', value: '4.6', icon: Star, color: 'bg-yellow-500', trend: '+0.2', up: true },
          { label: 'Revenue', value: 'NPR 245K', icon: DollarSign, color: 'bg-purple-500', trend: '+18%', up: true },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={`text-xs font-medium flex items-center gap-1 ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#2563EB" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coursePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="students" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
