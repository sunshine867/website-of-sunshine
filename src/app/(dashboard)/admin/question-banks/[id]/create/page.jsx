'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/shared/file-upload';
import { 
  ArrowLeft, Save, Eye, Plus, Trash2, GripVertical,
  Image, Music, Video, Mic
} from 'lucide-react';

const questionTypes = [
  { value: 'MCQ', label: 'Multiple Choice' },
  { value: 'MULTIPLE_RESPONSE', label: 'Multiple Response' },
  { value: 'TRUE_FALSE', label: 'True/False' },
  { value: 'FILL_BLANK', label: 'Fill in the Blank' },
  { value: 'SHORT_ANSWER', label: 'Short Answer' },
  { value: 'LONG_ANSWER', label: 'Long Answer / Essay' },
  { value: 'MATCHING', label: 'Matching' },
  { value: 'ORDERING', label: 'Ordering' },
  { value: 'AUDIO', label: 'Audio-Based' },
  { value: 'VIDEO', label: 'Video-Based' },
  { value: 'SPEAKING', label: 'Speaking' },
];

export default function CreateQuestionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState({
    question_type: 'MCQ',
    difficulty_level: 'MEDIUM',
    marks: 1,
    negative_marks: 0,
    topic: '',
    sub_topic: '',
    subject: '',
    question_text: '',
    question_text_english: '',
    question_text_japanese: '',
    question_text_nepali: '',
    estimated_time_seconds: 60,
    blooms_level: 'REMEMBER',
    explanation: '',
    tags: [],
    status: 'DRAFT',
    options: [
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
    ],
    pairs: [{ left: '', right: '' }, { left: '', right: '' }],
    correct_answer: '',
    media: [],
  });

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const addOption = () => {
    setFormData(prev => ({ ...prev, options: [...prev.options, { option_text: '', is_correct: false }] }));
  };

  const updateOption = (index, field, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const removeOption = (index) => {
    setFormData(prev => ({ ...prev, options: prev.options.filter((_, i) => i !== index) }));
  };

  const setCorrectOption = (index) => {
    if (formData.question_type === 'MCQ' || formData.question_type === 'TRUE_FALSE') {
      setFormData(prev => ({
        ...prev,
        options: prev.options.map((opt, i) => ({ ...opt, is_correct: i === index }))
      }));
    } else if (formData.question_type === 'MULTIPLE_RESPONSE') {
      updateOption(index, 'is_correct', !formData.options[index].is_correct);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));

  const handleSubmit = (e, publish = false) => {
    e.preventDefault();
    if (!formData.question_text.trim()) {
      toast({ title: 'Error', description: 'Question text is required', variant: 'destructive' });
      return;
    }
    const data = { ...formData };
    if (publish) data.status = 'PUBLISHED';
    toast({ title: 'Success!', description: publish ? 'Question published!' : 'Question saved as draft.' });
    router.push(`/admin/question-banks/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href={`/admin/question-banks/${id}`} className="inline-flex items-center text-gray-500 hover:text-gray-700">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Questions
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">Create New Question</h1>
        <p className="text-gray-500 mt-1">Add a question to the question bank</p>
      </motion.div>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            {/* Question Type & Settings */}
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1.5 block">Question Type *</label>
                <select className="w-full h-11 rounded-lg border-2 px-4" value={formData.question_type} onChange={(e) => updateField('question_type', e.target.value)}>
                  {questionTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Difficulty</label>
                <select className="w-full h-11 rounded-lg border-2 px-4" value={formData.difficulty_level} onChange={(e) => updateField('difficulty_level', e.target.value)}>
                  <option value="EASY">Easy</option><option value="MEDIUM">Medium</option><option value="HARD">Hard</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Marks</label>
                <Input type="number" value={formData.marks} onChange={(e) => updateField('marks', parseFloat(e.target.value) || 1)} min={0} step={0.5} />
              </div>
            </div>

            {/* Question Text */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Question Text *</label>
              <Tabs defaultValue="main">
                <TabsList className="mb-2">
                  <TabsTrigger value="main">Main</TabsTrigger>
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="japanese">Japanese</TabsTrigger>
                  <TabsTrigger value="nepali">Nepali</TabsTrigger>
                </TabsList>
                <TabsContent value="main">
                  <Textarea value={formData.question_text} onChange={(e) => updateField('question_text', e.target.value)} placeholder="Enter question text" className="min-h-[100px]" required />
                </TabsContent>
                <TabsContent value="english">
                  <Textarea value={formData.question_text_english} onChange={(e) => updateField('question_text_english', e.target.value)} placeholder="English translation" className="min-h-[100px]" />
                </TabsContent>
                <TabsContent value="japanese">
                  <Textarea value={formData.question_text_japanese} onChange={(e) => updateField('question_text_japanese', e.target.value)} placeholder="日本語" className="min-h-[100px]" />
                </TabsContent>
                <TabsContent value="nepali">
                  <Textarea value={formData.question_text_nepali} onChange={(e) => updateField('question_text_nepali', e.target.value)} placeholder="नेपाली" className="min-h-[100px]" />
                </TabsContent>
              </Tabs>
            </div>

            {/* Media Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block">Media (Images, Audio, Video)</label>
              <FileUpload onUpload={(files) => toast({ title: 'Uploaded!', description: `${files.length} file(s) added.` })} maxFiles={5} label="Drop media files here" />
            </div>

            {/* Options for MCQ/TrueFalse/MultipleResponse */}
            {['MCQ', 'TRUE_FALSE', 'MULTIPLE_RESPONSE'].includes(formData.question_type) && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Answer Options</label>
                  <Button type="button" variant="outline" size="sm" onClick={addOption}>
                    <Plus className="mr-1 h-3 w-3" /> Add Option
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <GripVertical className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-bold text-gray-400 w-6">{String.fromCharCode(65 + i)}</span>
                      <Input value={opt.option_text} onChange={(e) => updateOption(i, 'option_text', e.target.value)} placeholder={`Option ${String.fromCharCode(65 + i)}`} className="flex-1" />
                      <button type="button" onClick={() => setCorrectOption(i)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          opt.is_correct ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}>
                        {opt.is_correct ? '✓ Correct' : 'Correct?'}
                      </button>
                      <button type="button" onClick={() => removeOption(i)} className="text-gray-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fill in Blank Answer */}
            {formData.question_type === 'FILL_BLANK' && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Correct Answer *</label>
                <Input value={formData.correct_answer} onChange={(e) => updateField('correct_answer', e.target.value)} placeholder="Enter correct answer" />
              </div>
            )}

            {/* Topic & Tags */}
            <div className="grid grid-cols-3 gap-4">
              <div><label className="text-sm font-medium mb-1.5 block">Subject</label><Input value={formData.subject} onChange={(e) => updateField('subject', e.target.value)} placeholder="e.g., Japanese" /></div>
              <div><label className="text-sm font-medium mb-1.5 block">Topic</label><Input value={formData.topic} onChange={(e) => updateField('topic', e.target.value)} placeholder="e.g., Grammar" /></div>
              <div><label className="text-sm font-medium mb-1.5 block">Sub Topic</label><Input value={formData.sub_topic} onChange={(e) => updateField('sub_topic', e.target.value)} placeholder="e.g., Particles" /></div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Tags</label>
              <div className="flex gap-2 mb-2">
                <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Add tag..." />
                <Button type="button" variant="outline" onClick={addTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {formData.tags.map((tag, i) => (
                  <Badge key={i} className="cursor-pointer" onClick={() => removeTag(tag)}>{tag} ×</Badge>
                ))}
              </div>
            </div>

            {/* Explanation */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Explanation / Solution</label>
              <Textarea value={formData.explanation} onChange={(e) => updateField('explanation', e.target.value)} placeholder="Explain the answer..." className="min-h-[80px]" />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, false)}>
                <Save className="mr-2 h-4 w-4" /> Save as Draft
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="outline"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
                <Button type="submit" variant="gradient" onClick={(e) => handleSubmit(e, true)}>
                  <Save className="mr-2 h-4 w-4" /> Publish Question
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}