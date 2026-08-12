
'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  GripVertical,
  Clock,
  Users,
  FileText,
  Settings,
  List,
  Search,
  Check,
  X,
  Calendar,
  Award,
  Brain,
  Sparkles
} from 'lucide-react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import { useApiMutation } from '@/hooks/use-api';
import { examsApi } from '@/lib/api/exams';

export default function AdminCreateExamPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('settings');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);

  // Exam settings
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    code: '',
    description: '',
    instructions: '',
    exam_type: 'PRACTICE',
    level: 'N5',
    total_questions: 10,
    total_marks: 100,
    passing_marks: 40,
    duration_minutes: 60,
    max_attempts: 3,
    start_date: '',
    end_date: '',
    is_public: false,
    is_random_questions: false,
    is_random_options: false,
    allow_pause: true,
    allow_resume: true,
    auto_submit_on_timeout: true,
    show_results_immediately: true,
    is_certificate_enabled: false,
    status: 'DRAFT',
    questions: []
  });

  const createMutation = useApiMutation(
    (data) => examsApi.create(data),
    {
      successMessage: 'Exam created successfully!',
      onSuccess: () => router.push('/admin/exams')
    }
  );

  const handleSubmit = async (e, publish = false) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      const examData = {
        ...formData,
        questions: selectedQuestions.map(q => q.id),
        status: publish ? 'PUBLISHED' : 'DRAFT'
      };
      
      // Use either the API mutation or direct API call
      await createMutation.mutate(examData);
      toast.success(`Exam ${publish ? 'published' : 'saved as draft'} successfully`);
      
    } catch (error) {
      toast.error(error.message || 'Failed to create exam');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addQuestion = (question) => {
    if (!selectedQuestions.find(q => q.id === question.id)) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const removeQuestion = (questionId) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== questionId));
  };

  const moveQuestion = (fromIndex, toIndex) => {
    const newQuestions = [...selectedQuestions];
    const [moved] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, moved);
    setSelectedQuestions(newQuestions);
  };

  // Sample questions for demo
  const sampleQuestions = [
    { id: 'q1', question_text: 'What is the capital of Japan?', question_type: 'single_choice', difficulty: 'easy', marks: 1 },
    { id: 'q2', question_text: 'Which particle is used to mark the subject?', question_type: 'single_choice', difficulty: 'intermediate', marks: 1 },
    { id: 'q3', question_text: 'Translate: ありがとう', question_type: 'single_choice', difficulty: 'easy', marks: 1 },
    { id: 'q4', question_text: 'What is the correct conjugation?', question_type: 'multiple_choice', difficulty: 'hard', marks: 2 },
    { id: 'q5', question_text: 'Is this statement correct?', question_type: 'true_false', difficulty: 'intermediate', marks: 1 },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/exams" className="inline-flex items-center text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Exams
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Exam</h1>
            <p className="text-muted-foreground">
              Build your exam with sections and questions
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={(e) => handleSubmit(e, false)}
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button 
            onClick={(e) => handleSubmit(e, true)} 
            disabled={isSubmitting}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Creating...' : 'Publish Exam'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="questions">
            Questions ({selectedQuestions.length})
          </TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Exam Title *</Label>
                  <Input
                    value={formData.title || formData.name}
                    onChange={(e) => setFormData({...formData, title: e.target.value, name: e.target.value})}
                    placeholder="e.g., JLPT N5 Mock Test"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Exam Code</Label>
                  <Input
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="e.g., JLPT_N5_001"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the exam..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Instructions</Label>
                  <Textarea
                    value={formData.instructions}
                    onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                    placeholder="Exam instructions for students..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Exam Type</Label>
                    <select 
                      className="w-full h-11 rounded-lg border-2 px-4"
                      value={formData.exam_type}
                      onChange={(e) => setFormData({...formData, exam_type: e.target.value})}
                    >
                      <option value="PRACTICE">Practice</option>
                      <option value="MOCK">Mock</option>
                      <option value="CHAPTER_TEST">Chapter Test</option>
                      <option value="FINAL">Final</option>
                      <option value="PLACEMENT">Placement</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Level</Label>
                    <select 
                      className="w-full h-11 rounded-lg border-2 px-4"
                      value={formData.level}
                      onChange={(e) => setFormData({...formData, level: e.target.value})}
                    >
                      <option value="N5">N5 - Beginner</option>
                      <option value="N4">N4 - Elementary</option>
                      <option value="N3">N3 - Intermediate</option>
                      <option value="N2">N2 - Upper Intermediate</option>
                      <option value="N1">N1 - Advanced</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Exam Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Duration (minutes) *</Label>
                    <Input
                      type="number"
                      value={formData.duration_minutes}
                      onChange={(e) => setFormData({...formData, duration_minutes: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Total Questions</Label>
                    <Input
                      type="number"
                      value={formData.total_questions}
                      onChange={(e) => setFormData({...formData, total_questions: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Total Marks</Label>
                    <Input
                      type="number"
                      value={formData.total_marks}
                      onChange={(e) => setFormData({...formData, total_marks: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Passing Marks</Label>
                    <Input
                      type="number"
                      value={formData.passing_marks}
                      onChange={(e) => setFormData({...formData, passing_marks: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Max Attempts</Label>
                  <Input
                    type="number"
                    value={formData.max_attempts}
                    onChange={(e) => setFormData({...formData, max_attempts: parseInt(e.target.value)})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="datetime-local"
                      value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="datetime-local"
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Exam Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-medium">Question Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Random Questions</Label>
                          <p className="text-xs text-gray-500">Shuffle question order for each attempt</p>
                        </div>
                        <Switch
                          checked={formData.is_random_questions}
                          onCheckedChange={(checked) => setFormData({...formData, is_random_questions: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Random Options</Label>
                          <p className="text-xs text-gray-500">Shuffle answer options for each attempt</p>
                        </div>
                        <Switch
                          checked={formData.is_random_options}
                          onCheckedChange={(checked) => setFormData({...formData, is_random_options: checked})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Student Experience</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Allow Pause</Label>
                          <p className="text-xs text-gray-500">Students can pause the exam</p>
                        </div>
                        <Switch
                          checked={formData.allow_pause}
                          onCheckedChange={(checked) => setFormData({...formData, allow_pause: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Allow Resume</Label>
                          <p className="text-xs text-gray-500">Students can resume paused exams</p>
                        </div>
                        <Switch
                          checked={formData.allow_resume}
                          onCheckedChange={(checked) => setFormData({...formData, allow_resume: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Auto Submit on Timeout</Label>
                          <p className="text-xs text-gray-500">Auto-submit when time runs out</p>
                        </div>
                        <Switch
                          checked={formData.auto_submit_on_timeout}
                          onCheckedChange={(checked) => setFormData({...formData, auto_submit_on_timeout: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Show Results Immediately</Label>
                          <p className="text-xs text-gray-500">Show results after submission</p>
                        </div>
                        <Switch
                          checked={formData.show_results_immediately}
                          onCheckedChange={(checked) => setFormData({...formData, show_results_immediately: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Enable Certificates</Label>
                          <p className="text-xs text-gray-500">Award certificates to passing students</p>
                        </div>
                        <Switch
                          checked={formData.is_certificate_enabled}
                          onCheckedChange={(checked) => setFormData({...formData, is_certificate_enabled: checked})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Questions Tab */}
        <TabsContent value="questions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-lg">
                {selectedQuestions.length} questions selected
              </Badge>
              <Badge variant="outline" className="text-lg">
                Total Marks: {selectedQuestions.reduce((sum, q) => sum + (q.marks || 1), 0)}
              </Badge>
            </div>
            <Button onClick={() => setShowQuestionDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Questions
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead className="w-12">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedQuestions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No questions added yet. Click "Add Questions" to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    selectedQuestions.map((q, index) => (
                      <TableRow key={q.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="max-w-md truncate">{q.question_text}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{q.question_type.replace('_', ' ')}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{q.difficulty}</Badge>
                        </TableCell>
                        <TableCell>{q.marks || 1}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600"
                            onClick={() => removeQuestion(q.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Exam Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h3 className="text-xl font-semibold">{formData.title || formData.name || 'Untitled Exam'}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.description || 'No description provided'}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Badge variant="outline" className="bg-white">
                      <Clock className="h-3 w-3 mr-1" />
                      Duration: {formData.duration_minutes} min
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      <Award className="h-3 w-3 mr-1" />
                      Passing: {formData.passing_marks}%
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      <FileText className="h-3 w-3 mr-1" />
                      {selectedQuestions.length} questions
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      <Users className="h-3 w-3 mr-1" />
                      {formData.max_attempts} attempts
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Sample Questions</h4>
                  {selectedQuestions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                      <FileText className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <p>No questions to preview</p>
                      <p className="text-sm">Add questions from the Questions tab</p>
                    </div>
                  ) : (
                    selectedQuestions.slice(0, 3).map((q, index) => (
                      <div key={q.id} className="p-4 border rounded-lg bg-white">
                        <p className="font-medium">
                          {index + 1}. {q.question_text}
                        </p>
                        <div className="mt-2 space-y-1">
                          <div className="ml-6 text-sm text-gray-600">A. Sample option 1</div>
                          <div className="ml-6 text-sm text-gray-600">B. Sample option 2</div>
                          <div className="ml-6 text-sm text-gray-600">C. Sample option 3</div>
                          <div className="ml-6 text-sm text-gray-600">D. Sample option 4</div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Badge variant="outline">{q.question_type.replace('_', ' ')}</Badge>
                          <Badge variant="secondary">{q.difficulty}</Badge>
                          <Badge variant="outline">{q.marks} marks</Badge>
                        </div>
                      </div>
                    ))
                  )}
                  {selectedQuestions.length > 3 && (
                    <p className="text-center text-muted-foreground">
                      + {selectedQuestions.length - 3} more questions
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Questions Dialog */}
      <Dialog open={showQuestionDialog} onOpenChange={setShowQuestionDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Questions from Question Bank</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search questions..." className="pl-9" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="single_choice">Single Choice</SelectItem>
                  <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                  <SelectItem value="true_false">True/False</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Question list from bank */}
            <div className="space-y-2">
              {sampleQuestions.map((question) => (
                <div key={question.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div>
                    <p className="font-medium">{question.question_text}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">{question.question_type.replace('_', ' ')}</Badge>
                      <Badge variant="secondary">{question.difficulty}</Badge>
                      <Badge variant="outline">{question.marks} marks</Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      addQuestion(question);
                      toast.success('Question added to exam');
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
