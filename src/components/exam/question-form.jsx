'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/shared/file-upload';
import RichTextEditor from '@/components/shared/rich-text-editor';
import { 
  Plus, Trash2, GripVertical, Image, Music, Video, 
  FileText, Globe, Save, Eye, Upload, Mic 
} from 'lucide-react';

const questionTypes = [
  { value: 'MCQ', label: 'Multiple Choice' },
  { value: 'MULTIPLE_RESPONSE', label: 'Multiple Response' },
  { value: 'TRUE_FALSE', label: 'True/False' },
  { value: 'FILL_BLANK', label: 'Fill in the Blank' },
  { value: 'SHORT_ANSWER', label: 'Short Answer' },
  { value: 'LONG_ANSWER', label: 'Long Answer / Essay' },
  { value: 'MATCHING', label: 'Matching' },
  { value: 'ORDERING', label: 'Ordering / Sequencing' },
  { value: 'HOTSPOT', label: 'Hotspot' },
  { value: 'AUDIO', label: 'Audio-Based' },
  { value: 'VIDEO', label: 'Video-Based' },
  { value: 'SPEAKING', label: 'Speaking Assessment' },
];

export default function QuestionForm({ 
  initialData = null, 
  questionBankId, 
  onSubmit, 
  onCancel,
  loading = false 
}) {
  const [formData, setFormData] = useState({
    question_type: initialData?.question_type || 'MCQ',
    question_text: initialData?.question_text || '',
    question_text_english: initialData?.question_text_english || '',
    question_text_japanese: initialData?.question_text_japanese || '',
    question_text_nepali: initialData?.question_text_nepali || '',
    difficulty_level: initialData?.difficulty_level || 'MEDIUM',
    marks: initialData?.marks || 1,
    negative_marks: initialData?.negative_marks || 0,
    topic: initialData?.topic || '',
    sub_topic: initialData?.sub_topic || '',
    tags: initialData?.tags || [],
    estimated_time_seconds: initialData?.estimated_time_seconds || 60,
    blooms_level: initialData?.blooms_level || 'REMEMBER',
    explanation: initialData?.explanation || '',
    options: initialData?.options || [
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
    ],
    pairs: initialData?.pairs || [{ left: '', right: '' }, { left: '', right: '' }],
    media: initialData?.media || [],
    status: initialData?.status || 'DRAFT',
  });
  const [tagInput, setTagInput] = useState('');
  const { toast } = useToast();

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, { option_text: '', is_correct: false }]
    }));
  };

  const updateOption = (index, field, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const removeOption = (index) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const setCorrectOption = (index) => {
    if (formData.question_type === 'MCQ' || formData.question_type === 'TRUE_FALSE') {
      const newOptions = formData.options.map((opt, i) => ({
        ...opt,
        is_correct: i === index
      }));
      setFormData(prev => ({ ...prev, options: newOptions }));
    } else if (formData.question_type === 'MULTIPLE_RESPONSE') {
      updateOption(index, 'is_correct', !formData.options[index].is_correct);
    }
  };

  const addPair = () => {
    setFormData(prev => ({
      ...prev,
      pairs: [...prev.pairs, { left: '', right: '' }]
    }));
  };

  const updatePair = (index, field, value) => {
    const newPairs = [...formData.pairs];
    newPairs[index] = { ...newPairs[index], [field]: value };
    setFormData(prev => ({ ...prev, pairs: newPairs }));
  };

  const removePair = (index) => {
    setFormData(prev => ({
      ...prev,
      pairs: prev.pairs.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const addMedia = (files) => {
    const newMedia = files.map(file => ({
      media_type: file.type.startsWith('image/') ? 'IMAGE' :
                  file.type.startsWith('audio/') ? 'AUDIO' :
                  file.type.startsWith('video/') ? 'VIDEO' : 'OTHER',
      file_name: file.name,
      file_size: file.size,
      mime_type: file.type,
      media_url: URL.createObjectURL(file),
    }));
    setFormData(prev => ({ ...prev, media: [...prev.media, ...newMedia] }));
  };

  const removeMedia = (index) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.question_text.trim()) {
      toast({ title: 'Error', description: 'Question text is required', variant: 'destructive' });
      return;
    }

    if (['MCQ', 'MULTIPLE_RESPONSE', 'TRUE_FALSE'].includes(formData.question_type)) {
      const hasCorrect = formData.options.some(opt => opt.is_correct);
      if (!hasCorrect) {
        toast({ title: 'Error', description: 'Please mark at least one correct answer', variant: 'destructive' });
        return;
      }
    }

    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-5">
          <h3 className="font-bold text-lg">Question Details</h3>

          {/* Question Type & Difficulty */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-medium mb-1.5 block">Question Type *</label>
              <select className="w-full h-11 rounded-lg border-2 px-4" value={formData.question_type} onChange={(e) => updateField('question_type', e.target.value)}>
                {questionTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Difficulty *</label>
              <select className="w-full h-11 rounded-lg border-2 px-4" value={formData.difficulty_level} onChange={(e) => updateField('difficulty_level', e.target.value)}>
                <option value="EASY">Easy</option><option value="MEDIUM">Medium</option><option value="HARD">Hard</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Marks *</label>
              <Input type="number" value={formData.marks} onChange={(e) => updateField('marks', parseFloat(e.target.value) || 1)} min={0} step={0.5} />
            </div>
          </div>

          {/* Question Text (Multilingual) */}
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
                <Textarea value={formData.question_text_english} onChange={(e) => updateField('question_text_english', e.target.value)} placeholder="English translation (optional)" className="min-h-[100px]" />
              </TabsContent>
              <TabsContent value="japanese">
                <Textarea value={formData.question_text_japanese} onChange={(e) => updateField('question_text_japanese', e.target.value)} placeholder="日本語の質問文（任意）" className="min-h-[100px]" />
              </TabsContent>
              <TabsContent value="nepali">
                <Textarea value={formData.question_text_nepali} onChange={(e) => updateField('question_text_nepali', e.target.value)} placeholder="नेपाली अनुवाद (वैकल्पिक)" className="min-h-[100px]" />
              </TabsContent>
            </Tabs>
          </div>

          {/* Media Section */}
          <div>
            <label className="text-sm font-medium mb-2 block">Question Media (Images, Audio, Video)</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {formData.media.map((media, i) => (
                <div key={i} className="relative group">
                  {media.media_type === 'IMAGE' && (
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  {media.media_type === 'AUDIO' && (
                    <div className="w-24 h-24 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Music className="h-8 w-8 text-blue-500" />
                    </div>
                  )}
                  {media.media_type === 'VIDEO' && (
                    <div className="w-24 h-24 bg-red-50 rounded-lg flex items-center justify-center">
                      <Video className="h-8 w-8 text-red-500" />
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1 truncate max-w-[96px]">{media.file_name}</p>
                  <button onClick={() => removeMedia(i)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100">×</button>
                </div>
              ))}
            </div>
            <FileUpload onUpload={addMedia} accept={{ 'image/*': [], 'audio/*': [], 'video/*': [] }} maxFiles={5} label="Drop media files here" />
          </div>

          {/* Options (for choice-based questions) */}
          {['MCQ', 'MULTIPLE_RESPONSE', 'TRUE_FALSE'].includes(formData.question_type) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Answer Options</label>
                <Button type="button" variant="outline" size="sm" onClick={addOption}>
                  <Plus className="mr-1 h-3 w-3" /> Add Option
                </Button>
              </div>
              <div className="space-y-2">
                {formData.options.map((option, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
                    <span className="text-sm font-bold text-gray-400 w-6">{String.fromCharCode(65 + i)}</span>
                    <Input
                      value={option.option_text}
                      onChange={(e) => updateOption(i, 'option_text', e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => setCorrectOption(i)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        option.is_correct
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {option.is_correct ? '✓ Correct' : 'Correct?'}
                    </button>
                    <button type="button" onClick={() => removeOption(i)} className="text-gray-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matching Pairs */}
          {formData.question_type === 'MATCHING' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Matching Pairs</label>
                <Button type="button" variant="outline" size="sm" onClick={addPair}>
                  <Plus className="mr-1 h-3 w-3" /> Add Pair
                </Button>
              </div>
              <div className="space-y-2">
                {formData.pairs.map((pair, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Input value={pair.left} onChange={(e) => updatePair(i, 'left', e.target.value)} placeholder="Left item" />
                    <span className="text-gray-400">→</span>
                    <Input value={pair.right} onChange={(e) => updatePair(i, 'right', e.target.value)} placeholder="Right item" />
                    <button type="button" onClick={() => removePair(i)} className="text-gray-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fill in Blank - Correct Answer */}
          {formData.question_type === 'FILL_BLANK' && (
            <div>
              <label className="text-sm font-medium mb-1.5 block">Correct Answer *</label>
              <Input value={formData.correct_answer || ''} onChange={(e) => updateField('correct_answer', e.target.value)} placeholder="Enter the correct answer" required />
            </div>
          )}

          {/* Topic & Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Topic</label>
              <Input value={formData.topic} onChange={(e) => updateField('topic', e.target.value)} placeholder="e.g., Japanese Grammar" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Sub Topic</label>
              <Input value={formData.sub_topic} onChange={(e) => updateField('sub_topic', e.target.value)} placeholder="e.g., Particles" />
            </div>
          </div>

          {/* Tags */}
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

          {/* Additional Settings */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Negative Marks</label>
              <Input type="number" value={formData.negative_marks} onChange={(e) => updateField('negative_marks', parseFloat(e.target.value) || 0)} min={0} step={0.25} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Time (seconds)</label>
              <Input type="number" value={formData.estimated_time_seconds} onChange={(e) => updateField('estimated_time_seconds', parseInt(e.target.value) || 60)} min={10} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Bloom's Level</label>
              <select className="w-full h-11 rounded-lg border-2 px-4" value={formData.blooms_level} onChange={(e) => updateField('blooms_level', e.target.value)}>
                <option value="REMEMBER">Remember</option><option value="UNDERSTAND">Understand</option><option value="APPLY">Apply</option><option value="ANALYZE">Analyze</option><option value="EVALUATE">Evaluate</option><option value="CREATE">Create</option>
              </select>
            </div>
          </div>

          {/* Explanation */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Explanation / Solution</label>
            <Textarea value={formData.explanation} onChange={(e) => updateField('explanation', e.target.value)} placeholder="Explain the correct answer..." className="min-h-[80px]" />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Status</label>
            <select className="w-full h-11 rounded-lg border-2 px-4" value={formData.status} onChange={(e) => updateField('status', e.target.value)}>
              <option value="DRAFT">Draft</option><option value="PENDING">Pending Review</option><option value="PUBLISHED">Published</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="button" variant="outline">
            <Eye className="mr-1 h-4 w-4" /> Preview
          </Button>
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="outline" onClick={(e) => { updateField('status', 'DRAFT'); }}>
            <Save className="mr-1 h-4 w-4" /> Save as Draft
          </Button>
          <Button type="submit" variant="gradient" loading={loading}>
            <Save className="mr-1 h-4 w-4" /> Save & Publish
          </Button>
        </div>
      </div>
    </form>
  );
}