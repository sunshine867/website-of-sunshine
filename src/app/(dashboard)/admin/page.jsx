'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/auth-provider';
import { useApiQuery } from '@/hooks/use-api';
import { 
  Users, BookOpen, FileText, CreditCard, TrendingUp,
  Activity, ArrowRight, Globe, Star, Clock, AlertCircle
} from 'lucide-react';

// Add this line at the top after imports
 

export default function AdminDashboard() {
  const { user } = useAuth();

  // If user is not admin, show error
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700">Access Denied</h2>
          <p className="text-gray-500 mt-2">You need admin privileges to access this page.</p>
          <p className="text-sm text-gray-400 mt-1">Current role: {user?.role || 'Unknown'}</p>
          <Link href="/dashboard">
            <Button variant="gradient" className="mt-4">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: Users, label: 'Total Users', value: '2,456', change: '+12%', color: 'bg-blue-500', href: '/admin/users' },
    { icon: BookOpen, label: 'Active Courses', value: '24', change: '+5%', color: 'bg-green-500', href: '/admin/courses' },
    { icon: FileText, label: 'Exams', value: '48', change: '+18%', color: 'bg-purple-500', href: '/admin/exams' },
    { icon: CreditCard, label: 'Revenue', value: 'NPR 1.2M', change: '+22%', color: 'bg-yellow-500', href: '/admin/finance' },
  ];

  const quickActions = [
    { icon: Users, label: 'Manage Users', href: '/admin/users', color: 'bg-blue-500' },
    { icon: BookOpen, label: 'Manage Courses', href: '/admin/courses', color: 'bg-green-500' },
    { icon: FileText, label: 'Manage Exams', href: '/admin/exams', color: 'bg-purple-500' },
    { icon: Globe, label: 'ERP System', href: '/admin/erp', color: 'bg-orange-500' },
    { icon: CreditCard, label: 'Finance', href: '/admin/finance', color: 'bg-yellow-500' },
    { icon: Activity, label: 'Analytics', href: '/admin/analytics', color: 'bg-pink-500' },
    { icon: Star, label: 'Blog', href: '/admin/blog', color: 'bg-indigo-500' },
    { icon: Clock, label: 'Audit Logs', href: '/admin/audit', color: 'bg-teal-500' },
  ];

  const recentActivities = [
    { user: 'Ram Sharma', action: 'Enrolled in JLPT N3', time: '2 min ago', type: 'enrollment' },
    { user: 'Sita Poudel', action: 'Completed Mock Exam', time: '15 min ago', type: 'exam' },
    { user: 'Hari Thapa', action: 'Submitted application', time: '1 hour ago', type: 'application' },
    { user: 'Gita Devi', action: 'Made payment NPR 15,000', time: '2 hours ago', type: 'payment' },
    { user: 'Krishna Rai', action: 'Registered new account', time: '3 hours ago', type: 'registration' },
  ];

  const activityColors = {
    enrollment: 'bg-blue-100 text-blue-700',
    exam: 'bg-green-100 text-green-700',
    application: 'bg-purple-100 text-purple-700',
    payment: 'bg-yellow-100 text-yellow-700',
    registration: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              Welcome, {user?.firstName || 'Admin'}! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              {user?.role === 'SUPER_ADMIN' ? 'Super Admin Dashboard' : 'Admin Dashboard'}
            </p>
          </div>
          <Badge variant="success" className="text-sm">System Online</Badge>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={stat.href}>
                <Card className="hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />{stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-extrabold">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={i} href={action.href}>
                <Card className="text-center hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Link href="/admin/audit">
              <Button variant="ghost" size="sm">View All <ArrowRight className="ml-1 h-4 w-4" /></Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={activityColors[activity.type]}>{activity.type}</Badge>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}