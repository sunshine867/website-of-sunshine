'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { examsApi } from '@/lib/api/exams';
import { ArrowLeft, Plus, Trash2, Save, GripVertical, Search } from 'lucide-react';
import ConfirmDialog from '@/components/shared/confirm-dialog';

export default function AdminEditExamPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [questionSearch, setQuestionSearch] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const { data: examData, isLoading } = useApiQuery(['admin-exam', id], () => examsApi.getById(id));
  const { data: questionBank } = useApiQuery(['question-bank', questionSearch], () => examsApi.getQuestionBank({ search: questionSearch, limit: 100 }));

  const updateMutation = useApiMutation(
    (data) => examsApi.update(id, data),
    { successMessage: 'Exam updated!', onSuccess: () => router.push('/admin/exams') }
  );

  const [formData, setFormData] = useState(null);
  const exam = examData?.data;

  useEffect(() => {
    if (exam) setFormData(exam);
  }, [exam]);

  if (isLoading || !formData) return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" /></div>;

  const addQuestion = (question) => {
    if (formData.questions?.find(q => q.id === question.id)) {
      toast({ title: 'Already added', description: 'This question is already in the exam', variant: 'destructive' });
      return;
    }
    setFormData(prev => ({ ...prev, questions: [...(prev.questions || []), question] }));
  };

  const removeQuestion = (questionId) => {
    setFormData(prev => ({ ...prev, questions: prev.questions?.filter(q => q.id !== questionId) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const questions = questionBank?.data?.data || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link href="/admin/exams" className="inline-flex items-center text-gray-500 hover:text-gray-700"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">Edit Exam</h1>
      </motion.div>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Title *</label>
                <Input value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Level</label>
                <select className="w-full h-11 rounded-lg border-2 px-4" value={formData.level} onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}>
                  <option value="N5">N5</option><option value="N4">N4</option><option value="N3">N3</option><option value="N2">N2</option><option value="N1">N1</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Duration (minutes)</label>
                <Input type="number" value={formData.duration_minutes} onChange={(e) => setFormData(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) || 0 }))} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Passing Marks</label>
                <Input type="number" value={formData.passing_marks} onChange={(e) => setFormData(prev => ({ ...prev, passing_marks: parseInt(e.target.value) || 0 }))} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Description</label>
              <Textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2"><Switch checked={formData.is_random_questions} onCheckedChange={(c) => setFormData(prev => ({ ...prev, is_random_questions: c }))} /><span className="text-sm">Random Questions</span></div>
              <div className="flex items-center gap-2"><Switch checked={formData.allow_pause} onCheckedChange={(c) => setFormData(prev => ({ ...prev, allow_pause: c }))} /><span className="text-sm">Allow Pause</span></div>
              <div className="flex items-center gap-2"><Switch checked={formData.show_results_immediately} onCheckedChange={(c) => setFormData(prev => ({ ...prev, show_results_immediately: c }))} /><span className="text-sm">Show Results</span></div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Questions ({formData.questions?.length || 0})</h3>
                <Button type="button" variant="outline" onClick={() => setShowQuestionBank(true)}><Plus className="mr-2 h-4 w-4" /> Add Questions</Button>
              </div>
              <div className="space-y-2">
                {formData.questions?.map((q, i) => (
                  <div key={q.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{q.question_text}</p>
                      <div className="flex gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">{q.question_type}</Badge>
                        <Badge variant="secondary" className="text-xs">{q.difficulty_level}</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeQuestion(q.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button type="submit" variant="gradient" loading={updateMutation.isPending}><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showQuestionBank} onOpenChange={setShowQuestionBank}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Question Bank</DialogTitle></DialogHeader>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search questions..." className="pl-10" value={questionSearch} onChange={(e) => setQuestionSearch(e.target.value)} />
          </div>
          <div className="space-y-2">
            {questions.map((q) => (
              <div key={q.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{q.question_text}</p>
                  <div className="flex gap-1 mt-1">
                    <Badge variant="outline" className="text-xs">{q.question_type}</Badge>
                    <Badge variant="secondary" className="text-xs">{q.difficulty_level}</Badge>
                    <Badge className="text-xs">{q.points || 1} pt</Badge>
                  </div>
                </div>
                <Button size="sm" onClick={() => { addQuestion(q); setShowQuestionBank(false); }}>Add</Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}