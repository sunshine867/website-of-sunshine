'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiQuery } from '@/hooks/use-api';
import { analyticsApi } from '@/lib/api/analytics';
import {
  Users, BookOpen, FileText, DollarSign, TrendingUp,
  Globe, Activity, ArrowUpRight
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const COLORS = ['#2563EB', '#0EA5E9', '#7C3AED', '#10B981', '#F59E0B'];

const monthlyUsers = [
  { month: 'Jan', students: 120, teachers: 5 },
  { month: 'Feb', students: 145, teachers: 8 },
  { month: 'Mar', students: 180, teachers: 10 },
  { month: 'Apr', students: 210, teachers: 12 },
  { month: 'May', students: 250, teachers: 15 },
  { month: 'Jun', students: 290, teachers: 18 },
  { month: 'Jul', students: 310, teachers: 20 },
];

const revenueByCourse = [
  { name: 'N5 Course', value: 450000 },
  { name: 'N4 Course', value: 320000 },
  { name: 'N3 Course', value: 280000 },
  { name: 'N2 Course', value: 180000 },
  { name: 'N1 Course', value: 90000 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">Platform Analytics</h1>
        <p className="text-gray-500 mt-1">Comprehensive platform insights</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '2,456', icon: Users, color: 'bg-blue-500', trend: '+18%' },
          { label: 'Active Courses', value: '24', icon: BookOpen, color: 'bg-green-500', trend: '+5%' },
          { label: 'Total Revenue', value: 'NPR 1.2M', icon: DollarSign, color: 'bg-purple-500', trend: '+22%' },
          { label: 'Exams Taken', value: '1,890', icon: FileText, color: 'bg-orange-500', trend: '+15%' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />{stat.trend}
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
          <CardHeader><CardTitle>User Growth</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyUsers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#2563EB" strokeWidth={2} />
                <Line type="monotone" dataKey="teachers" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Revenue by Course</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={revenueByCourse} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {revenueByCourse.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `NPR ${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
