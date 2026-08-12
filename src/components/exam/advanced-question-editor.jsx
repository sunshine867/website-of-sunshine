// apps/web/src/components/exam/advanced-question-editor.jsx

'use client';

import React, { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  AudioWaveform,
  Video,
  FileText,
  CheckCircle,
  XCircle,
  MoveUp,
  MoveDown,
  Link2,
  Upload,
  X,
  Loader2,
  Save,
  Copy,
  Sparkles,
  BookOpen,
  Globe,
  Languages,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { api } from '@/lib/api';

// Import RichTextEditor
import { RichTextEditor } from '@/components/ui/rich-text-editor';

// Import Google Form Attachment
import GoogleFormAttachment from '@/components/exam/google-form-attachment';

// ============================================
// MEDIA UPLOAD COMPONENT
// ============================================
const MediaUploadInline = ({ onUpload, onRemove, media = [], label = 'Media', multiple = true }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkType, setLinkType] = useState('image');

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    try {
      setUploading(true);
      setUploadProgress(0);

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/media/upload', formData, {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
          },
        });

        const mediaData = {
          id: `${Date.now()}-${Math.random()}`,
          type: file.type,
          url: response.data.url,
          name: file.name,
          size: file.size,
          file: file,
        };

        onUpload?.(mediaData);
      }

      toast.success(`Uploaded ${files.length} file(s)`);
    } catch (error) {
      toast.error('Failed to upload file');
      console.error(error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleLinkSubmit = () => {
    if (!linkUrl) {
      toast.error('Please enter a URL');
      return;
    }

    const mediaData = {
      id: `${Date.now()}-${Math.random()}`,
      type: linkType === 'image' ? 'image/link' : 
            linkType === 'audio' ? 'audio/link' : 
            linkType === 'video' ? 'video/link' : 'application/link',
      url: linkUrl,
      name: linkUrl.split('/').pop() || 'Link',
      size: 0,
      isLink: true,
    };

    onUpload?.(mediaData);
    setLinkUrl('');
    setShowLinkDialog(false);
    toast.success('Link added successfully');
  };

  const getMediaIcon = (type) => {
    if (type.startsWith('image/') || type === 'image/link') return ImageIcon;
    if (type.startsWith('audio/') || type === 'audio/link') return AudioWaveform;
    if (type.startsWith('video/') || type === 'video/link') return Video;
    return FileText;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-3">
      {media.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {media.map((item) => {
            const Icon = getMediaIcon(item.type);
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border text-sm"
              >
                <Icon className="h-4 w-4" />
                <span className="truncate max-w-[150px]">{item.name}</span>
                {item.isLink && <Badge variant="outline" className="text-xs">Link</Badge>}
                {item.size > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(item.size)}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onRemove?.(item.id)}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <input
            type="file"
            id={`file-upload-${label}`}
            multiple={multiple}
            accept="image/*,audio/*,video/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={uploading}
          />
          <Button variant="outline" size="sm" disabled={uploading}>
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-1" />
                Upload Files
              </>
            )}
          </Button>
        </div>

        <Button variant="outline" size="sm" onClick={() => setShowLinkDialog(true)}>
          <Link2 className="h-4 w-4 mr-1" />
          Add Link
        </Button>

        {uploading && (
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{uploadProgress}%</span>
          </div>
        )}
      </div>

      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Media from URL</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Media Type</Label>
              <Select value={linkType} onValueChange={setLinkType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com/media.jpg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleLinkSubmit}>Add Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ============================================
// OPTION EDITOR
// ============================================
const OptionEditor = ({
  option,
  index,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  onSetCorrect,
  isCorrect,
  isFirst,
  isLast,
  totalOptions,
}) => {
  const [showMedia, setShowMedia] = useState(false);

  return (
    <div
      className={cn(
        'border rounded-lg p-4 transition-colors',
        isCorrect
          ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20'
          : 'border-gray-200 hover:border-gray-300'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 flex items-center gap-2 pt-1">
          <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
          <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
            {String.fromCharCode(65 + index)}
          </Badge>
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <RichTextEditor
            value={option.text}
            onChange={(html) => onUpdate('text', html)}
            placeholder={`Option ${String.fromCharCode(65 + index)}`}
            minHeight="60px"
          />

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setShowMedia(!showMedia)}
            >
              <ImageIcon className="h-3 w-3 mr-1" />
              Media ({option.media?.length || 0})
            </Button>
            {showMedia && (
              <div className="flex-1">
                <MediaUploadInline
                  media={option.media || []}
                  onUpload={(mediaData) => {
                    const newMedia = [...(option.media || []), mediaData];
                    onUpdate('media', newMedia);
                  }}
                  onRemove={(id) => {
                    const newMedia = (option.media || []).filter((m) => m.id !== id);
                    onUpdate('media', newMedia);
                  }}
                  label={`option-${index}`}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 flex flex-col items-end gap-1">
          <Button
            variant={isCorrect ? 'default' : 'outline'}
            size="sm"
            className={cn('h-7 px-2 text-xs', isCorrect && 'bg-green-600 hover:bg-green-700')}
            onClick={onSetCorrect}
          >
            {isCorrect ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <XCircle className="h-3 w-3 mr-1" />
            )}
            {isCorrect ? 'Correct' : 'Mark'}
          </Button>

          <div className="flex gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onMoveUp}
              disabled={isFirst}
            >
              <MoveUp className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onMoveDown}
              disabled={isLast}
            >
              <MoveDown className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-red-500 hover:text-red-600"
              onClick={onRemove}
              disabled={totalOptions <= 2}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN ADVANCED QUESTION EDITOR
// ============================================
const AdvancedQuestionEditor = ({
  initialData,
  onSave,
  onCancel,
  questionBankId,
  onSaveAndNew,
}) => {
  const [question, setQuestion] = useState({
    // Subject & Topic Selection
    language_id: initialData?.language_id || '',
    subject_id: initialData?.subject_id || '',
    course_id: initialData?.course_id || '',
    level_id: initialData?.level_id || '',
    chapter_id: initialData?.chapter_id || '',
    topic_id: initialData?.topic_id || '',
    // Question content
    question_text: initialData?.question_text || '',
    question_type: initialData?.question_type || 'single_choice',
    difficulty: initialData?.difficulty || 'intermediate',
    marks: initialData?.marks || 1,
    negative_marks: initialData?.negative_marks || 0,
    time_seconds: initialData?.time_seconds || 60,
    explanation: initialData?.explanation || '',
    hint: initialData?.hint || '',
    media: initialData?.media || [],
    options: initialData?.options || [
      { id: '1', text: '', is_correct: false, media: [] },
      { id: '2', text: '', is_correct: false, media: [] },
      { id: '3', text: '', is_correct: false, media: [] },
      { id: '4', text: '', is_correct: false, media: [] },
    ],
    tags: initialData?.tags || [],
    status: initialData?.status || 'draft',
  });

  // Google Form state
  const [googleForm, setGoogleForm] = useState(initialData?.google_form || null);

  const [saving, setSaving] = useState(false);
  const [savingAndNew, setSavingAndNew] = useState(false);
  
  // Dropdown data
  const [languages, setLanguages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dropdown data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [langRes, subRes] = await Promise.all([
          api.get('/exam/languages'),
          api.get('/exam/subjects'),
        ]);
        setLanguages(langRes.data || []);
        setSubjects(subRes.data || []);
      } catch (error) {
        console.error('Failed to fetch dropdown data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch courses when subject changes
  useEffect(() => {
    if (question.subject_id) {
      api.get(`/exam/subjects/${question.subject_id}/courses`)
        .then(res => setCourses(res.data || []))
        .catch(console.error);
    }
  }, [question.subject_id]);

  // Fetch levels when course changes
  useEffect(() => {
    if (question.course_id) {
      api.get(`/exam/courses/${question.course_id}/levels`)
        .then(res => setLevels(res.data || []))
        .catch(console.error);
    }
  }, [question.course_id]);

  // ============================================
  // OPTION HANDLERS
  // ============================================
  const addOption = () => {
    if (question.options.length >= 10) {
      toast.error('Maximum 10 options allowed');
      return;
    }
    setQuestion({
      ...question,
      options: [
        ...question.options,
        { id: `${Date.now()}-${Math.random()}`, text: '', is_correct: false, media: [] },
      ],
    });
  };

  const removeOption = (id) => {
    if (question.options.length <= 2) {
      toast.error('At least 2 options required');
      return;
    }
    setQuestion({
      ...question,
      options: question.options.filter((opt) => opt.id !== id),
    });
  };

  const updateOption = (id, field, value) => {
    setQuestion({
      ...question,
      options: question.options.map((opt) =>
        opt.id === id ? { ...opt, [field]: value } : opt
      ),
    });
  };

  const setCorrectAnswer = (id) => {
    const isMultipleChoice = question.question_type === 'multiple_choice';
    setQuestion({
      ...question,
      options: question.options.map((opt) => ({
        ...opt,
        is_correct: isMultipleChoice 
          ? opt.id === id ? !opt.is_correct : opt.is_correct
          : opt.id === id,
      })),
    });
  };

  const moveOption = (id, direction) => {
    const index = question.options.findIndex((opt) => opt.id === id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= question.options.length) return;

    const newOptions = [...question.options];
    [newOptions[index], newOptions[newIndex]] = [
      newOptions[newIndex],
      newOptions[index],
    ];
    setQuestion({ ...question, options: newOptions });
  };

  // ============================================
  // MEDIA HANDLERS
  // ============================================
  const handleQuestionMediaUpload = (mediaData) => {
    setQuestion({
      ...question,
      media: [...question.media, mediaData],
    });
  };

  const removeQuestionMedia = (id) => {
    setQuestion({
      ...question,
      media: question.media.filter((m) => m.id !== id),
    });
  };

  // ============================================
  // GOOGLE FORM HANDLERS
  // ============================================
  const handleGoogleFormAttach = (form) => {
    setGoogleForm(form);
    toast.success('Google Form attached successfully!');
  };

  const handleGoogleFormRemove = () => {
    setGoogleForm(null);
    toast.success('Google Form removed');
  };

  // ============================================
  // VALIDATION
  // ============================================
  const validateQuestion = () => {
    if (!question.question_text || question.question_text === '<p></p>') {
      toast.error('Please enter question text');
      return false;
    }

    const hasEmptyOption = question.options.some(
      (opt) => !opt.text || opt.text === '<p></p>'
    );
    if (hasEmptyOption) {
      toast.error('Please fill in all options');
      return false;
    }

    if (!question.options.some((opt) => opt.is_correct)) {
      toast.error('Please select at least one correct answer');
      return false;
    }

    return true;
  };

  // ============================================
  // SAVE HANDLERS
  // ============================================
  const handleSave = async () => {
    if (!validateQuestion()) return;

    try {
      setSaving(true);
      const payload = {
        ...question,
        question_bank_id: questionBankId,
        options: question.options.map((opt) => ({
          option_text: opt.text,
          is_correct: opt.is_correct,
          media: opt.media || [],
        })),
        media: question.media || [],
        google_form: googleForm,
      };

      await onSave?.(payload);
      toast.success('Question saved successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to save question');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAndNew = async () => {
    if (!validateQuestion()) return;

    try {
      setSavingAndNew(true);
      const payload = {
        ...question,
        question_bank_id: questionBankId,
        options: question.options.map((opt) => ({
          option_text: opt.text,
          is_correct: opt.is_correct,
          media: opt.media || [],
        })),
        media: question.media || [],
        google_form: googleForm,
      };

      await onSave?.(payload);
      toast.success('Question saved! Creating another...');
      
      // Reset form for new question (keep subject/topic context)
      setQuestion({
        ...question,
        question_text: '',
        question_type: 'single_choice',
        difficulty: 'intermediate',
        marks: 1,
        negative_marks: 0,
        time_seconds: 60,
        explanation: '',
        hint: '',
        media: [],
        options: [
          { id: '1', text: '', is_correct: false, media: [] },
          { id: '2', text: '', is_correct: false, media: [] },
          { id: '3', text: '', is_correct: false, media: [] },
          { id: '4', text: '', is_correct: false, media: [] },
        ],
        tags: [],
        status: 'draft',
      });
      setGoogleForm(null);
      
      if (onSaveAndNew) onSaveAndNew();
    } catch (error) {
      toast.error(error.message || 'Failed to save question');
    } finally {
      setSavingAndNew(false);
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-background z-10 py-4 border-b">
        <div>
          <h2 className="text-2xl font-bold">
            {initialData ? 'Edit Question' : 'Create Question'}
          </h2>
          <p className="text-muted-foreground text-sm">
            Add rich content, images, audio, video, and Google Forms
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSaveAndNew} disabled={savingAndNew}>
            {savingAndNew ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Save & Add New
              </>
            )}
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Question
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Subject & Topic Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Subject & Topic
            </CardTitle>
            <CardDescription>
              Select the language, subject, course, and topic for this question
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Language */}
              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={question.language_id}
                  onValueChange={(value) =>
                    setQuestion({ ...question, language_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.id} value={lang.id}>
                        {lang.flag_emoji} {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select
                  value={question.subject_id}
                  onValueChange={(value) =>
                    setQuestion({ ...question, subject_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((sub) => (
                      <SelectItem key={sub.id} value={sub.id}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Course */}
              <div className="space-y-2">
                <Label>Course</Label>
                <Select
                  value={question.course_id}
                  onValueChange={(value) =>
                    setQuestion({ ...question, course_id: value })
                  }
                  disabled={!question.subject_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Level */}
              <div className="space-y-2">
                <Label>Level</Label>
                <Select
                  value={question.level_id}
                  onValueChange={(value) =>
                    setQuestion({ ...question, level_id: value })
                  }
                  disabled={!question.course_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.id} value={level.id}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Chapter */}
              <div className="space-y-2">
                <Label>Chapter</Label>
                <Input
                  value={question.chapter_id}
                  onChange={(e) =>
                    setQuestion({ ...question, chapter_id: e.target.value })
                  }
                  placeholder="Chapter name"
                />
              </div>

              {/* Topic */}
              <div className="space-y-2">
                <Label>Topic</Label>
                <Input
                  value={question.topic_id}
                  onChange={(e) =>
                    setQuestion({ ...question, topic_id: e.target.value })
                  }
                  placeholder="Topic name"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Content */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span>Question Content</span>
              <Badge variant="outline">{question.question_type}</Badge>
            </CardTitle>
            <CardDescription>Enter the question text and add media</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Question Type</Label>
                <Select
                  value={question.question_type}
                  onValueChange={(value) =>
                    setQuestion({ ...question, question_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single_choice">Single Choice</SelectItem>
                    <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                    <SelectItem value="true_false">True/False</SelectItem>
                    <SelectItem value="fill_blank">Fill in the Blank</SelectItem>
                    <SelectItem value="essay">Essay</SelectItem>
                    <SelectItem value="matching">Matching</SelectItem>
                    <SelectItem value="ordering">Ordering</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select
                  value={question.difficulty}
                  onValueChange={(value) =>
                    setQuestion({ ...question, difficulty: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="elementary">Elementary</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="upper_intermediate">Upper Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Marks</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  value={question.marks}
                  onChange={(e) =>
                    setQuestion({ ...question, marks: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Time (seconds)</Label>
                <Input
                  type="number"
                  min="0"
                  value={question.time_seconds}
                  onChange={(e) =>
                    setQuestion({
                      ...question,
                      time_seconds: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <Label>Question Text *</Label>
              <RichTextEditor
                value={question.question_text}
                onChange={(html) =>
                  setQuestion({ ...question, question_text: html })
                }
                placeholder="Type your question here..."
                minHeight="120px"
              />
            </div>

            {/* Question Media */}
            <div className="space-y-2">
              <Label>Question Media</Label>
              <MediaUploadInline
                media={question.media}
                onUpload={handleQuestionMediaUpload}
                onRemove={removeQuestionMedia}
                label="question"
              />
            </div>

            {/* Hint & Explanation */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hint (Optional)</Label>
                <RichTextEditor
                  value={question.hint}
                  onChange={(html) =>
                    setQuestion({ ...question, hint: html })
                  }
                  placeholder="Add a hint..."
                  minHeight="60px"
                />
              </div>
              <div className="space-y-2">
                <Label>Negative Marks</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  value={question.negative_marks}
                  onChange={(e) =>
                    setQuestion({
                      ...question,
                      negative_marks: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Explanation (Optional)</Label>
              <RichTextEditor
                value={question.explanation}
                onChange={(html) =>
                  setQuestion({ ...question, explanation: html })
                }
                placeholder="Explain the correct answer..."
                minHeight="80px"
              />
            </div>
          </CardContent>
        </Card>

        {/* ============================================ */}
        {/* GOOGLE FORM INTEGRATION */}
        {/* ============================================ */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-blue-600" />
              Google Form Integration
            </CardTitle>
            <CardDescription>
              Attach a Google Form to this question for interactive assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GoogleFormAttachment
              questionId={question.id || 'new'}
              existingForm={googleForm}
              onAttach={handleGoogleFormAttach}
              onRemove={handleGoogleFormRemove}
            />
          </CardContent>
        </Card>

        {/* Options - WITH SCROLL SYSTEM */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Answer Options</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {question.options.filter((o) => o.is_correct).length} correct
                </Badge>
                <Button variant="outline" size="sm" onClick={addOption}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Option
                </Button>
              </div>
            </div>
            <CardDescription>
              Each option supports rich text and media (images, audio, video)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4 border rounded-lg p-4">
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <OptionEditor
                    key={option.id}
                    option={option}
                    index={index}
                    isCorrect={option.is_correct}
                    isFirst={index === 0}
                    isLast={index === question.options.length - 1}
                    totalOptions={question.options.length}
                    onUpdate={(field, value) => updateOption(option.id, field, value)}
                    onRemove={() => removeOption(option.id)}
                    onMoveUp={() => moveOption(option.id, 'up')}
                    onMoveDown={() => moveOption(option.id, 'down')}
                    onSetCorrect={() => setCorrectAnswer(option.id)}
                  />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Tags & Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Tags & Status</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tags</Label>
              <Input
                placeholder="Add tags separated by commas"
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
              />
              {question.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={question.status}
                onValueChange={(value) =>
                  setQuestion({ ...question, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedQuestionEditor;