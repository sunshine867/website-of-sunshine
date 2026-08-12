'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { coursesApi } from '@/lib/api/courses';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Edit, Trash2, GripVertical, Play, FileText } from 'lucide-react';

export default function LessonManagementPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [lessonForm, setLessonForm] = useState({ title: '', description: '', lesson_type: 'VIDEO', duration_minutes: 30, video_url: '', content_text: '', is_preview: false });

  const { data: courseData } = useApiQuery(['course', id], () => coursesApi.getById(id));
  const course = courseData?.data;

  const addLessonMutation = useApiMutation(
    (data) => coursesApi.addLesson(id, data),
    { successMessage: 'Lesson added!', invalidateQueries: ['course', id], onSuccess: () => { setShowAddLesson(false); resetForm(); } }
  );

  const updateLessonMutation = useApiMutation(
    (data) => coursesApi.updateLesson(editingLesson?.id, data),
    { successMessage: 'Lesson updated!', invalidateQueries: ['course', id], onSuccess: () => { setEditingLesson(null); resetForm(); } }
  );

  const deleteLessonMutation = useApiMutation(
    (lessonId) => coursesApi.deleteLesson(lessonId),
    { successMessage: 'Lesson deleted!', invalidateQueries: ['course', id] }
  );

  const resetForm = () => {
    setLessonForm({ title: '', description: '', lesson_type: 'VIDEO', duration_minutes: 30, video_url: '', content_text: '', is_preview: false });
  };

  const openEdit = (lesson) => {
    setEditingLesson(lesson);
    setLessonForm({
      title: lesson.title || '',
      description: lesson.description || '',
      lesson_type: lesson.lesson_type || 'VIDEO',
      duration_minutes: lesson.duration_minutes || 30,
      video_url: lesson.video_url || '',
      content_text: lesson.content_text || '',
      is_preview: lesson.is_preview || false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLesson) {
      updateLessonMutation.mutate(lessonForm);
    } else {
      addLessonMutation.mutate(lessonForm);
    }
  };

  const lessons = course?.lessons || [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href={`/dashboard/courses/${id}`} className="inline-flex items-center text-gray-500 hover:text-gray-700">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Course
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Lesson Management</h1>
            <p className="text-gray-500 mt-1">{course?.title}</p>
          </div>
          <Button variant="gradient" onClick={() => { setEditingLesson(null); resetForm(); setShowAddLesson(true); }}>
            <Plus className="mr-2 h-4 w-4" /> Add Lesson
          </Button>
        </div>
      </motion.div>

      <Card>
        <CardContent className="p-0">
          {lessons.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No lessons yet. Add your first lesson!</p>
            </div>
          ) : (
            <div className="divide-y">
              {lessons.map((lesson, i) => (
                <div key={lesson.id} className="flex items-center gap-3 p-4 hover:bg-gray-50">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                  <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{lesson.title}</p>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="outline" className="text-xs">{lesson.lesson_type}</Badge>
                      <Badge variant="secondary" className="text-xs">{lesson.duration_minutes} min</Badge>
                      {lesson.is_preview && <Badge className="text-xs bg-yellow-100 text-yellow-700">Preview</Badge>}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(lesson)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteLessonMutation.mutate(lesson.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showAddLesson || !!editingLesson} onOpenChange={(open) => { if (!open) { setShowAddLesson(false); setEditingLesson(null); } }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{editingLesson ? 'Edit Lesson' : 'Add New Lesson'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="text-sm font-medium mb-1.5 block">Title *</label><Input value={lessonForm.title} onChange={(e) => setLessonForm(prev => ({ ...prev, title: e.target.value }))} required /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Description</label><Textarea value={lessonForm.description} onChange={(e) => setLessonForm(prev => ({ ...prev, description: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium mb-1.5 block">Type</label><select className="w-full h-11 rounded-lg border-2 px-4" value={lessonForm.lesson_type} onChange={(e) => setLessonForm(prev => ({ ...prev, lesson_type: e.target.value }))}><option value="VIDEO">Video</option><option value="TEXT">Text</option><option value="QUIZ">Quiz</option><option value="ASSIGNMENT">Assignment</option></select></div>
              <div><label className="text-sm font-medium mb-1.5 block">Duration (min)</label><Input type="number" value={lessonForm.duration_minutes} onChange={(e) => setLessonForm(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) || 0 }))} /></div>
            </div>
            {lessonForm.lesson_type === 'VIDEO' && <div><label className="text-sm font-medium mb-1.5 block">Video URL</label><Input value={lessonForm.video_url} onChange={(e) => setLessonForm(prev => ({ ...prev, video_url: e.target.value }))} placeholder="https://www.youtube.com/embed/..." /></div>}
            {lessonForm.lesson_type === 'TEXT' && <div><label className="text-sm font-medium mb-1.5 block">Content</label><Textarea className="min-h-[200px]" value={lessonForm.content_text} onChange={(e) => setLessonForm(prev => ({ ...prev, content_text: e.target.value }))} /></div>}
            <div className="flex items-center gap-2"><input type="checkbox" checked={lessonForm.is_preview} onChange={(e) => setLessonForm(prev => ({ ...prev, is_preview: e.target.checked }))} /><span className="text-sm">Allow preview</span></div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => { setShowAddLesson(false); setEditingLesson(null); }}>Cancel</Button>
              <Button type="submit" variant="gradient" loading={addLessonMutation.isPending || updateLessonMutation.isPending}>{editingLesson ? 'Update' : 'Add'} Lesson</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}