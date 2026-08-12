'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { coursesApi } from '@/lib/api/courses';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import ConfirmDialog from '@/components/shared/confirm-dialog';

export default function AdminEditCoursePage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [showDelete, setShowDelete] = useState(false);
  const [formData, setFormData] = useState(null);

  const { data: courseData, isLoading } = useApiQuery(['admin-course', id], () => coursesApi.getById(id));

  const updateMutation = useApiMutation((data) => coursesApi.update(id, data), { successMessage: 'Course updated!' });
  const deleteMutation = useApiMutation(() => coursesApi.delete(id), { successMessage: 'Course deleted!', onSuccess: () => router.push('/admin/courses') });

  useEffect(() => {
    if (courseData?.data) setFormData(courseData.data);
  }, [courseData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading || !formData) return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/admin/courses" className="inline-flex items-center text-gray-500 hover:text-gray-700"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between"><h1 className="text-2xl font-extrabold">Edit Course</h1><Button variant="destructive" size="sm" onClick={() => setShowDelete(true)}><Trash2 className="mr-1 h-4 w-4" /> Delete</Button></div>
      </motion.div>
      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div><label className="text-sm font-medium mb-1.5 block">Title *</label><Input value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} required /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Description *</label><Textarea className="min-h-[200px]" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} required /></div>
            <div className="grid grid-cols-4 gap-4">
              <div><label className="text-sm font-medium mb-1.5 block">Level</label><select className="w-full h-11 rounded-lg border-2 px-4" value={formData.level} onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}><option value="N5">N5</option><option value="N4">N4</option><option value="N3">N3</option><option value="N2">N2</option><option value="N1">N1</option></select></div>
              <div><label className="text-sm font-medium mb-1.5 block">Type</label><select className="w-full h-11 rounded-lg border-2 px-4" value={formData.course_type} onChange={(e) => setFormData(prev => ({ ...prev, course_type: e.target.value }))}><option value="FREE">Free</option><option value="PAID">Paid</option><option value="SUBSCRIPTION">Subscription</option></select></div>
              <div><label className="text-sm font-medium mb-1.5 block">Price</label><Input type="number" value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">Status</label><select className="w-full h-11 rounded-lg border-2 px-4" value={formData.status} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option><option value="ARCHIVED">Archived</option></select></div>
            </div>
            <div className="flex items-center justify-between"><div><label className="font-medium">Featured</label><p className="text-sm text-gray-500">Show in featured section</p></div><Switch checked={formData.is_featured} onCheckedChange={(c) => setFormData(prev => ({ ...prev, is_featured: c }))} /></div>
            <div className="flex justify-end pt-4 border-t"><Button type="submit" variant="gradient" loading={updateMutation.isPending}><Save className="mr-2 h-4 w-4" /> Update Course</Button></div>
          </form>
        </CardContent>
      </Card>
      <ConfirmDialog open={showDelete} onOpenChange={setShowDelete} title="Delete Course" description="This action cannot be undone. All course data will be permanently deleted." confirmLabel="Delete" onConfirm={() => deleteMutation.mutate()} loading={deleteMutation.isPending} />
    </div>
  );
}