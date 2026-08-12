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
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { blogApi } from '@/lib/api/blog';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import ConfirmDialog from '@/components/shared/confirm-dialog';

export default function AdminBlogEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [showDelete, setShowDelete] = useState(false);
  const [formData, setFormData] = useState(null);
  const [tagInput, setTagInput] = useState('');

  const { data: postData, isLoading } = useApiQuery(['admin-blog', id], () => blogApi.getPostById(id));

  const updateMutation = useApiMutation(
    (data) => blogApi.updatePost(id, data),
    { successMessage: 'Post updated!', onSuccess: () => router.push('/admin/blog') }
  );

  const deleteMutation = useApiMutation(
    () => blogApi.deletePost(id),
    { successMessage: 'Post deleted!', onSuccess: () => router.push('/admin/blog') }
  );

  useEffect(() => {
    if (postData?.data) setFormData(postData.data);
  }, [postData]);

  if (isLoading || !formData) {
    return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" /></div>;
  }

  const addTag = () => {
    if (tagInput.trim() && !(formData.tags || []).includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/admin/blog" className="inline-flex items-center text-gray-500 hover:text-gray-700">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Edit Blog Post</h1>
          <Button variant="destructive" size="sm" onClick={() => setShowDelete(true)}>
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </Button>
        </div>
      </motion.div>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Title *</label>
              <Input value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Category</label>
                <select className="w-full h-11 rounded-lg border-2 px-4" value={formData.category || ''} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}>
                  <option value="">Select</option>
                  <option value="Japanese Learning">Japanese Learning</option>
                  <option value="JLPT Tips">JLPT Tips</option>
                  <option value="Study Abroad">Study Abroad</option>
                  <option value="Student Life">Student Life</option>
                  <option value="Culture">Culture</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Status</label>
                <select className="w-full h-11 rounded-lg border-2 px-4" value={formData.status} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}>
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Excerpt</label>
              <Textarea className="min-h-[80px]" value={formData.excerpt || ''} onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Content *</label>
              <Textarea className="min-h-[300px] font-mono text-sm" value={formData.content} onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Tags</label>
              <div className="flex gap-2 mb-2">
                <Input placeholder="Add tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
                <Button type="button" variant="outline" onClick={addTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(formData.tags || []).map((tag, i) => (
                  <Badge key={i} className="cursor-pointer" onClick={() => removeTag(tag)}>{tag} ✕</Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Switch checked={formData.is_featured} onCheckedChange={(c) => setFormData(prev => ({ ...prev, is_featured: c }))} />
              <span className="text-sm">Featured Post</span>
            </div>
            <div className="flex justify-end pt-4 border-t">
              <Button type="submit" variant="gradient" loading={updateMutation.isPending}>
                <Save className="mr-2 h-4 w-4" /> Update Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <ConfirmDialog open={showDelete} onOpenChange={setShowDelete} title="Delete Post" description="This action cannot be undone." confirmLabel="Delete" onConfirm={() => deleteMutation.mutate()} loading={deleteMutation.isPending} />
    </div>
  );
}