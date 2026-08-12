'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Megaphone, Calendar, Pin } from 'lucide-react';

const notices = [
  { id: 1, title: 'JLPT July 2026 Registration Open', content: 'Registration for JLPT July 2026 examination is now open. Last date for registration is June 15, 2026.', category: 'Exam', priority: 'HIGH', date: '2026-05-01', pinned: true },
  { id: 2, title: 'New Batch Starting - N5 Level', content: 'New Japanese language batch for N5 level starting from August 1, 2026. Limited seats available.', category: 'Course', priority: 'MEDIUM', date: '2026-07-15', pinned: true },
  { id: 3, title: 'Holiday Notice - Dashain Vacation', content: 'The institute will remain closed from October 10-20, 2026 for Dashain festival. Classes resume October 21.', category: 'General', priority: 'MEDIUM', date: '2026-09-25', pinned: false },
  { id: 4, title: 'Scholarship Application Deadline Extended', content: 'The deadline for MEXT scholarship applications has been extended to August 15, 2026.', category: 'Scholarship', priority: 'HIGH', date: '2026-07-20', pinned: false },
  { id: 5, title: 'Parent-Teacher Meeting', content: 'Quarterly parent-teacher meeting scheduled for July 30, 2026. All parents are requested to attend.', category: 'Event', priority: 'LOW', date: '2026-07-25', pinned: false },
  { id: 6, title: 'New Study Materials Available', content: 'Updated JLPT N3 and N4 study materials are now available in the library and online portal.', category: 'Resources', priority: 'LOW', date: '2026-07-10', pinned: false },
];

const priorityColors = {
  HIGH: 'bg-red-100 text-red-700 border-red-200',
  MEDIUM: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  LOW: 'bg-green-100 text-green-700 border-green-200',
};

export default function NoticesPage() {
  const pinnedNotices = notices.filter(n => n.pinned);
  const regularNotices = notices.filter(n => !n.pinned);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Megaphone className="h-16 w-16 mx-auto mb-4 text-white/80" />
            <h1 className="text-4xl font-extrabold mb-4">Notices & Announcements</h1>
            <p className="text-xl text-white/80">Stay updated with the latest information</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Pinned Notices */}
        {pinnedNotices.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Pin className="h-5 w-5 text-red-500" /> Pinned Notices
            </h2>
            <div className="space-y-4">
              {pinnedNotices.map((notice, i) => (
                <motion.div key={notice.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="border-l-4 border-l-primary-500 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge className={priorityColors[notice.priority]}>{notice.priority}</Badge>
                          <Badge variant="outline">{notice.category}</Badge>
                        </div>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {formatDate(notice.date)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{notice.title}</h3>
                      <p className="text-gray-600">{notice.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Notices */}
        <div>
          <h2 className="text-lg font-bold mb-4">All Notices</h2>
          <div className="space-y-4">
            {regularNotices.map((notice, i) => (
              <motion.div key={notice.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={priorityColors[notice.priority]}>{notice.priority}</Badge>
                        <Badge variant="outline">{notice.category}</Badge>
                      </div>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {formatDate(notice.date)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{notice.title}</h3>
                    <p className="text-gray-600">{notice.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
