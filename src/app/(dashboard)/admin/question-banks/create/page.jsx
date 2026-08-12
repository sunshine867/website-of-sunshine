// apps/web/src/app/(dashboard)/admin/question-banks/create/page.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  ArrowLeft,
  Save,
  X,
  Plus,
  Layers,
  BookOpen,
  FileText,
  Tag,
  Globe,
  Lock,
  Users,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';


 



const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(200),
  code: z.string().min(2, 'Code must be at least 2 characters').max(50),
  description: z.string().max(1000).optional(),
  languageId: z.string().uuid('Please select a language'),
  subjectId: z.string().uuid('Please select a subject').optional(),
  courseId: z.string().uuid('Please select a course').optional(),
  levelId: z.string().uuid('Please select a level').optional(),
  chapterId: z.string().optional(),
  topicId: z.string().optional(),
  difficulty: z.enum(['beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced', 'expert']).optional(),
  visibility: z.enum(['private', 'shared', 'public']).default('private'),
});

// ✅ DEFAULT EXPORT
export default function CreateQuestionBankPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [languages, setLanguages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      visibility: 'private',
      difficulty: 'intermediate',
    },
  });

  // Fetch languages and subjects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [languagesRes, subjectsRes] = await Promise.all([
          api.get('/exam/languages'),
          api.get('/exam/subjects'),
        ]);
        setLanguages(languagesRes.data || []);
        setSubjects(subjectsRes.data || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch courses when subject changes
  const subjectId = form.watch('subjectId');
  useEffect(() => {
    if (subjectId) {
      api.get(`/exam/subjects/${subjectId}/courses`)
        .then(res => setCourses(res.data || []))
        .catch(console.error);
    }
  }, [subjectId]);

  // Fetch levels when course changes
  const courseId = form.watch('courseId');
  useEffect(() => {
    if (courseId) {
      api.get(`/exam/courses/${courseId}/levels`)
        .then(res => setLevels(res.data || []))
        .catch(console.error);
    }
  }, [courseId]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const payload = {
        ...data,
        tags,
        status: 'draft',
      };
      const response = await api.post('/question-banks', payload);
      toast.success('Question bank created successfully');
      router.push(`/admin/question-banks/${response.data.id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create question bank');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Question Bank</h1>
            <p className="text-muted-foreground">
              Organize questions by subject, level, and topic
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Creating...' : 'Create Bank'}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Enter the core details of your question bank
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., JLPT N5 Vocabulary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Code *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., JLPT_N5_VOCAB" />
                      </FormControl>
                      <FormDescription>
                        Unique identifier for this question bank
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe what this question bank contains..."
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="elementary">Elementary</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="upper_intermediate">Upper Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Hierarchy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Subject Hierarchy
                </CardTitle>
                <CardDescription>
                  Organize your questions by subject and level
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="languageId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.id} value={lang.id}>
                              {lang.flag_emoji} {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subjectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.id}>
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="levelId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem key={level.id} value={level.id}>
                              {level.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="chapterId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chapter</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Chapter name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="topicId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topic</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Topic name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags & Visibility */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Tags & Visibility
                </CardTitle>
                <CardDescription>
                  Add tags for easy searching and control who can see this bank
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add tags and press Enter..."
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {tags.length === 0 && (
                      <span className="text-sm text-muted-foreground">No tags added yet</span>
                    )}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visibility</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="private">
                            <div className="flex items-center gap-2">
                              <Lock className="h-4 w-4" />
                              Private (Only You)
                            </div>
                          </SelectItem>
                          <SelectItem value="shared">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Shared (Your Branch)
                            </div>
                          </SelectItem>
                          <SelectItem value="public">
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4" />
                              Public (Everyone)
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Control who can access this question bank
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* AI Generation Option */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  AI Generation
                </CardTitle>
                <CardDescription>
                  Let AI help you generate questions for this bank
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30">
                  <div>
                    <p className="font-medium">Generate questions with AI</p>
                    <p className="text-sm text-muted-foreground">
                      After creating the bank, use AI to automatically generate questions
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      toast.info('You can generate questions after creating the bank using the AI tab');
                    }}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}