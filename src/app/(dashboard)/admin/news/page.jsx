'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { galleryApi } from '@/lib/api/gallery';
import { formatDate } from '@/lib/utils';
import { Plus, Edit, Trash2, Newspaper, Calendar } from 'lucide-react';
import ConfirmDialog from '@/components/shared/confirm-dialog';

// Add this line at the top after imports
 

export default function AdminNewsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [newNews, setNewNews] = useState({ title: '', content: '', category: 'Announcement' });
  const { toast } = useToast();

  const news = [
    { id: 1, title: 'New JLPT N3 Course Launched', content: 'We are excited to announce the launch of our comprehensive JLPT N3 preparation course.', category: 'Announcement', status: 'PUBLISHED', date: '2026-07-25' },
    { id: 2, title: 'Student Visa Success Rate 95%', content: 'Our students achieved 95% success rate in Japanese student visa applications.', category: 'Achievement', status: 'PUBLISHED', date: '2026-07-20' },
    { id: 3, title: 'Partnership with Tokyo University', content: 'We have signed an MoU with the University of Tokyo.', category: 'Partnership', status: 'PUBLISHED', date: '2026-07-15' },
    { id: 4, title: 'Upcoming Summer Workshop', content: 'Join our summer workshop on Japanese culture and language.', category: 'Event', status: 'DRAFT', date: '2026-07-28' },
  ];

  const handleCreate = () => {
    toast({ title: 'Created!', description: 'News item created.' });
    setShowCreate(false);
    setNewNews({ title: '', content: '', category: 'Announcement' });
  };

  const handleDelete = () => {
    toast({ title: 'Deleted!', description: 'News item deleted.' });
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">News Management</h1>
            <p className="text-gray-500 mt-1">Manage news and announcements</p>
          </div>
          <Button variant="gradient" onClick={() => setShowCreate(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add News
          </Button>
        </div>
      </motion.div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {news.map((item, i) => (
              <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Newspaper className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(item.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={item.status === 'PUBLISHED' ? 'success' : 'secondary'}>{item.status}</Badge>
                  <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => setDeleteId(item.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add News</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium mb-1.5 block">Title *</label><Input value={newNews.title} onChange={(e) => setNewNews(prev => ({ ...prev, title: e.target.value }))} placeholder="News title" /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Category</label><select className="w-full h-11 rounded-lg border-2 px-4" value={newNews.category} onChange={(e) => setNewNews(prev => ({ ...prev, category: e.target.value }))}><option>Announcement</option><option>Achievement</option><option>Partnership</option><option>Event</option><option>Scholarship</option></select></div>
            <div><label className="text-sm font-medium mb-1.5 block">Content *</label><Textarea className="min-h-[120px]" value={newNews.content} onChange={(e) => setNewNews(prev => ({ ...prev, content: e.target.value }))} placeholder="News content..." /></div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button variant="gradient" onClick={handleCreate}>Publish News</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} title="Delete News" description="This action cannot be undone." confirmLabel="Delete" onConfirm={handleDelete} />
    </div>
  );
}