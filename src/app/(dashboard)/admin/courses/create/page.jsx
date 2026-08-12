'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useApiMutation } from '@/hooks/use-api';
import { coursesApi } from '@/lib/api/courses';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Upload } from 'lucide-react';

   // ✅ ADD THIS

export default function AdminCreateCoursePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    level: 'N5',
    course_type: 'PAID',
    module_type: 'GENERAL',
    price: 0,
    discount_price: 0,
    currency: 'NPR',
    total_lessons: 0,
    total_duration_minutes: 0,
    difficulty_level: 'BEGINNER',
    language: 'japanese',
    is_featured: false,
    is_published: false,
    status: 'DRAFT',
    learning_outcomes: [''],
    prerequisites: [''],
    target_audience: [''],
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
  });

  const createMutation = useApiMutation(
    (data) => coursesApi.create(data),
    {
      successMessage: 'Course created successfully!',
      onSuccess: () => router.push('/admin/courses')
    }
  );

  const handleSubmit = (e, publish = false) => {
    e.preventDefault();
    const data = { ...formData };
    if (publish) {
      data.status = 'PUBLISHED';
      data.is_published = true;
    }
    createMutation.mutate(data);
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const updateArrayItem = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/admin/courses" className="inline-flex items-center text-gray-500 hover:text-gray-700">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">Create New Course</h1>
        <p className="text-gray-500 mt-1">Add a new course to the platform</p>
      </motion.div>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-bold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Course Title *</label>
                  <Input 
                    placeholder="Enter course title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Short Description</label>
                  <Input 
                    placeholder="Brief description (shown in course cards)"
                    value={formData.short_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Full Description *</label>
                  <Textarea 
                    placeholder="Detailed course description..."
                    className="min-h-[200px]"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-bold mb-4">Course Details</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Level *</label>
                  <select 
                    className="w-full h-11 rounded-lg border-2 px-4"
                    value={formData.level}
                    onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                  >
                    <option value="N5">N5 - Beginner</option>
                    <option value="N4">N4 - Elementary</option>
                    <option value="N3">N3 - Intermediate</option>
                    <option value="N2">N2 - Upper Intermediate</option>
                    <option value="N1">N1 - Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Course Type *</label>
                  <select 
                    className="w-full h-11 rounded-lg border-2 px-4"
                    value={formData.course_type}
                    onChange={(e) => setFormData(prev => ({ ...prev, course_type: e.target.value }))}
                  >
                    <option value="FREE">Free</option>
                    <option value="PAID">Paid</option>
                    <option value="SUBSCRIPTION">Subscription</option>
                    <option value="SCHOLARSHIP">Scholarship</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Module Type</label>
                  <select 
                    className="w-full h-11 rounded-lg border-2 px-4"
                    value={formData.module_type}
                    onChange={(e) => setFormData(prev => ({ ...prev, module_type: e.target.value }))}
                  >
                    <option value="GENERAL">General</option>
                    <option value="VOCABULARY">Vocabulary</option>
                    <option value="GRAMMAR">Grammar</option>
                    <option value="KANJI">Kanji</option>
                    <option value="READING">Reading</option>
                    <option value="LISTENING">Listening</option>
                    <option value="SPEAKING">Speaking</option>
                    <option value="BUSINESS">Business Japanese</option>
                  </select>
                </div>
              </div>

              {formData.course_type !== 'FREE' && (
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Price</label>
                    <Input 
                      type="number" placeholder="0"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Discount Price</label>
                    <Input 
                      type="number" placeholder="0"
                      value={formData.discount_price}
                      onChange={(e) => setFormData(prev => ({ ...prev, discount_price: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Currency</label>
                    <select 
                      className="w-full h-11 rounded-lg border-2 px-4"
                      value={formData.currency}
                      onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                    >
                      <option value="NPR">NPR</option>
                      <option value="USD">USD</option>
                      <option value="JPY">JPY</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Total Lessons</label>
                  <Input 
                    type="number" placeholder="0"
                    value={formData.total_lessons}
                    onChange={(e) => setFormData(prev => ({ ...prev, total_lessons: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Duration (minutes)</label>
                  <Input 
                    type="number" placeholder="0"
                    value={formData.total_duration_minutes}
                    onChange={(e) => setFormData(prev => ({ ...prev, total_duration_minutes: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Difficulty</label>
                  <select 
                    className="w-full h-11 rounded-lg border-2 px-4"
                    value={formData.difficulty_level}
                    onChange={(e) => setFormData(prev => ({ ...prev, difficulty_level: e.target.value }))}
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Toggle Options */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Featured Course</label>
                  <p className="text-sm text-gray-500">Show this course in featured section</p>
                </div>
                <Switch 
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                />
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-bold mb-4">Learning Outcomes</h2>
              {formData.learning_outcomes.map((outcome, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input 
                    placeholder={`Outcome ${index + 1}`}
                    value={outcome}
                    onChange={(e) => updateArrayItem('learning_outcomes', index, e.target.value)}
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('learning_outcomes', index)}>✕</Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('learning_outcomes')}>+ Add Outcome</Button>
            </div>

            {/* Prerequisites */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-bold mb-4">Prerequisites</h2>
              {formData.prerequisites.map((prereq, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input 
                    placeholder={`Prerequisite ${index + 1}`}
                    value={prereq}
                    onChange={(e) => updateArrayItem('prerequisites', index, e.target.value)}
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('prerequisites', index)}>✕</Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('prerequisites')}>+ Add Prerequisite</Button>
            </div>

            {/* Target Audience */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-bold mb-4">Target Audience</h2>
              {formData.target_audience.map((audience, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input 
                    placeholder={`Target audience ${index + 1}`}
                    value={audience}
                    onChange={(e) => updateArrayItem('target_audience', index, e.target.value)}
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('target_audience', index)}>✕</Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('target_audience')}>+ Add Target Audience</Button>
            </div>

            {/* SEO Section */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-bold mb-4">SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Meta Title</label>
                  <Input 
                    placeholder="SEO title"
                    value={formData.meta_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Meta Description</label>
                  <Textarea 
                    placeholder="SEO description"
                    value={formData.meta_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Meta Keywords (comma separated)</label>
                  <Input 
                    placeholder="keyword1, keyword2, keyword3"
                    value={formData.meta_keywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, meta_keywords: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, false)}>
                <Save className="mr-2 h-4 w-4" /> Save as Draft
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="outline">
                  <Eye className="mr-2 h-4 w-4" /> Preview
                </Button>
                <Button type="submit" variant="gradient" loading={createMutation.isPending} onClick={(e) => handleSubmit(e, true)}>
                  Publish Course
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}