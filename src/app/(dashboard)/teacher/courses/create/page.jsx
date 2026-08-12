'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useApiMutation } from '@/hooks/use-api';
import { coursesApi } from '@/lib/api/courses';
import Link from 'next/link';
import { ArrowLeft, Save, Eye } from 'lucide-react';

export default function CreateCoursePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    level: 'N5',
    course_type: 'PAID',
    price: 0,
    total_lessons: 0,
    total_duration_minutes: 0,
    difficulty_level: 'BEGINNER',
    learning_outcomes: [''],
    prerequisites: [''],
    status: 'DRAFT'
  });

  const createMutation = useApiMutation(
    (data) => coursesApi.create(data),
    {
      successMessage: 'Course created successfully!',
      onSuccess: (data) => router.push(`/dashboard/courses/${data.data.id}`)
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
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
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/dashboard/courses" className="inline-flex items-center text-gray-500 hover:text-gray-700">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">Create New Course</h1>
        <p className="text-gray-500 mt-1">Fill in the course details</p>
      </motion.div>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Course Title *</label>
              <Input 
                placeholder="e.g., JLPT N5 Complete Course"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            {formData.course_type === 'PAID' && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Price (NPR)</label>
                <Input 
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-1.5 block">Short Description</label>
              <Input 
                placeholder="Brief description of the course"
                value={formData.short_description}
                onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Full Description *</label>
              <Textarea 
                placeholder="Detailed course description..."
                className="min-h-[150px]"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Total Lessons</label>
                <Input 
                  type="number"
                  value={formData.total_lessons}
                  onChange={(e) => setFormData(prev => ({ ...prev, total_lessons: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Duration (minutes)</label>
                <Input 
                  type="number"
                  value={formData.total_duration_minutes}
                  onChange={(e) => setFormData(prev => ({ ...prev, total_duration_minutes: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Difficulty Level</label>
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

            {/* Learning Outcomes */}
            <div>
              <label className="text-sm font-medium mb-2 block">Learning Outcomes</label>
              {formData.learning_outcomes.map((outcome, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input 
                    placeholder={`Outcome ${index + 1}`}
                    value={outcome}
                    onChange={(e) => updateArrayItem('learning_outcomes', index, e.target.value)}
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('learning_outcomes', index)}>
                    ✕
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('learning_outcomes')}>
                + Add Outcome
              </Button>
            </div>

            {/* Prerequisites */}
            <div>
              <label className="text-sm font-medium mb-2 block">Prerequisites</label>
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

            <div className="flex justify-between pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setFormData(prev => ({ ...prev, status: 'DRAFT' }))}>
                <Save className="mr-2 h-4 w-4" /> Save as Draft
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="outline">
                  <Eye className="mr-2 h-4 w-4" /> Preview
                </Button>
                <Button type="submit" variant="gradient" loading={createMutation.isPending}>
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
