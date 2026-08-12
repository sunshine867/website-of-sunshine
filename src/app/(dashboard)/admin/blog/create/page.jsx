'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useApiMutation } from '@/hooks/use-api';
import { blogApi } from '@/lib/api/blog';
import { ArrowLeft, Save, Eye, Image as ImageIcon } from 'lucide-react';


   // ✅ ADD THIS



export default function AdminBlogCreatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    status: 'DRAFT',
    is_featured: false,
    meta_title: '',
    meta_description: '',
  });
  const [tagInput, setTagInput] = useState('');

  const createMutation = useApiMutation(
    (data) => blogApi.createPost(data),
    {
      successMessage: 'Blog post created!',
      onSuccess: () => router.push('/admin/blog')
    }
  );

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleSubmit = (e, publish = false) => {
    e.preventDefault();
    const data = { ...formData };
    if (publish) {
      data.status = 'PUBLISHED';
    }
    createMutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/admin/blog" className="inline-flex items-center text-gray-500 hover:text-gray-700">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">Create Blog Post</h1>
        <p className="text-gray-500 mt-1">Write and publish a new blog post</p>
      </motion.div>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Title *</label>
              <Input 
                placeholder="Enter post title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Category</label>
                <select 
                  className="w-full h-11 rounded-lg border-2 px-4"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">Select category</option>
                  <option value="Japanese Learning">Japanese Learning</option>
                  <option value="JLPT Tips">JLPT Tips</option>
                  <option value="Study Abroad">Study Abroad</option>
                  <option value="Student Life">Student Life</option>
                  <option value="Culture">Culture</option>
                  <option value="News">News</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Featured Image URL</label>
                <Input 
                  placeholder="https://example.com/image.jpg"
                  value={formData.featured_image_url || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured_image_url: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Excerpt</label>
              <Textarea 
                placeholder="Short description for preview..."
                className="min-h-[80px]"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Content *</label>
              <Textarea 
                placeholder="Write your post content here... (HTML supported)"
                className="min-h-[300px] font-mono text-sm"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Tags</label>
              <div className="flex gap-2 mb-2">
                <Input 
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" variant="outline" onClick={addTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, i) => (
                  <Badge key={i} className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} ✕
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-bold mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Meta Title</label>
                  <Input 
                    placeholder="SEO title (defaults to post title)"
                    value={formData.meta_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Meta Description</label>
                  <Textarea 
                    placeholder="SEO description"
                    className="min-h-[60px]"
                    value={formData.meta_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={formData.is_featured}
                    onCheckedChange={(c) => setFormData(prev => ({ ...prev, is_featured: c }))}
                  />
                  <span className="text-sm">Featured Post</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, false)}>
                <Save className="mr-2 h-4 w-4" /> Save as Draft
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="outline">
                  <Eye className="mr-2 h-4 w-4" /> Preview
                </Button>
                <Button type="submit" variant="gradient" loading={createMutation.isPending} onClick={(e) => handleSubmit(e, true)}>
                  Publish Post
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}