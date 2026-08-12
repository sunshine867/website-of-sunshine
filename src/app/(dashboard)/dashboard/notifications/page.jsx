'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { notificationApi } from '@/lib/api/notifications';
import { formatDate } from '@/lib/utils';
import {
  Bell, BookOpen, FileText, CreditCard, Plane,
  CheckCircle, Trash2, CheckCheck, Settings
} from 'lucide-react';

const notificationIcons = {
  COURSE: BookOpen,
  EXAM: FileText,
  PAYMENT: CreditCard,
  ERP: Plane,
  SYSTEM: Bell,
};

const notificationColors = {
  COURSE: 'bg-blue-100 text-blue-700',
  EXAM: 'bg-purple-100 text-purple-700',
  PAYMENT: 'bg-green-100 text-green-700',
  ERP: 'bg-orange-100 text-orange-700',
  SYSTEM: 'bg-gray-100 text-gray-700',
};

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  
  const { data: notificationsData } = useApiQuery(
    'notifications',
    () => notificationApi.getAll()
  );

  const markReadMutation = useApiMutation(
    (id) => notificationApi.markAsRead(id),
    { invalidateQueries: 'notifications' }
  );

  const markAllReadMutation = useApiMutation(
    () => notificationApi.markAllAsRead(),
    { invalidateQueries: 'notifications' }
  );

  const deleteMutation = useApiMutation(
    (id) => notificationApi.delete(id),
    { invalidateQueries: 'notifications' }
  );

  const notifications = notificationsData?.data?.data || [];
  const unreadCount = notifications.filter(n => !n.is_read).length;

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread' 
    ? notifications.filter(n => !n.is_read)
    : notifications.filter(n => n.type === activeTab.toUpperCase());

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Notifications</h1>
            <p className="text-gray-500 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={() => markAllReadMutation.mutate()}>
              <CheckCheck className="mr-2 h-4 w-4" /> Mark All Read
            </Button>
          )}
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">
            All
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </TabsTrigger>
          <TabsTrigger value="course">Courses</TabsTrigger>
          <TabsTrigger value="exam">Exams</TabsTrigger>
          <TabsTrigger value="payment">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredNotifications.map((notification, i) => {
                  const Icon = notificationIcons[notification.type] || Bell;
                  const colorClass = notificationColors[notification.type] || '';
                  
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors ${
                        !notification.is_read ? 'bg-primary-50/50' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-lg flex-shrink-0 ${colorClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className={`font-medium ${!notification.is_read ? 'text-gray-900' : 'text-gray-600'}`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500 mt-0.5">{notification.message}</p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {!notification.is_read && (
                              <div className="w-2 h-2 bg-primary-600 rounded-full" />
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-400">
                            {formatDate(notification.created_at)}
                          </span>
                          {!notification.is_read && (
                            <button
                              className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                              onClick={() => markReadMutation.mutate(notification.id)}
                            >
                              Mark as read
                            </button>
                          )}
                          <button
                            className="text-xs text-red-500 hover:text-red-600 font-medium"
                            onClick={() => deleteMutation.mutate(notification.id)}
                          >
                            <Trash2 className="h-3 w-3 inline mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                {filteredNotifications.length === 0 && (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No notifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
