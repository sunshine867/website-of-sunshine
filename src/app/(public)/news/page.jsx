'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Calendar } from 'lucide-react';

const newsItems = [
  { id: 1, title: 'New JLPT N3 Course Launched', excerpt: 'We are excited to announce the launch of our comprehensive JLPT N3 preparation course.', date: '2026-07-25', category: 'Announcement', image: '📢' },
  { id: 2, title: 'Student Visa Success Rate Reaches 95%', excerpt: 'Our students achieved a 95% success rate in Japanese student visa applications this year.', date: '2026-07-20', category: 'Achievement', image: '🎉' },
  { id: 3, title: 'Partnership with University of Tokyo', excerpt: 'We have signed an MoU with the University of Tokyo for student exchange programs.', date: '2026-07-15', category: 'Partnership', image: '🤝' },
  { id: 4, title: 'Scholarship Program for 2027 Intake', excerpt: 'Applications are now open for our scholarship program for the 2027 academic year.', date: '2026-07-10', category: 'Scholarship', image: '🎓' },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold mb-4">News & Updates</h1>
            <p className="text-xl text-white/80">Latest news from Japanese Education Platform</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {newsItems.map((news, i) => (
            <motion.div key={news.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="text-4xl flex-shrink-0">{news.image}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>{news.category}</Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {formatDate(news.date)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{news.title}</h3>
                      <p className="text-gray-500 text-sm">{news.excerpt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
