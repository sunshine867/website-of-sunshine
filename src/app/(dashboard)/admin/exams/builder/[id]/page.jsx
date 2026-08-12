'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { examsApi } from '@/lib/api/exams';
import {
  ArrowLeft, Save, Eye, Plus, Trash2, GripVertical,
  Search, Filter, ChevronDown, ChevronUp, Copy,
  Settings, Clock, Target, Shuffle, Layers, Sparkles,
  FileText, Image, Music, Video, CheckCircle, X
} from 'lucide-react';

// Question Bank Selector Component
function QuestionBankSelector({ onSelect, selectedQuestions, onRemove }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [previewQuestion, setPreviewQuestion] = useState(null);

  const questions = demoQuestions.filter(q => {
    const matchesSearch = q.question_text?.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'ALL' || q.question_type === typeFilter;
    const matchesDifficulty = difficultyFilter === 'ALL' || q.difficulty_level === difficultyFilter;
    return matchesSearch && matchesType && matchesDifficulty;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search questions..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="border rounded-lg px-3 py-1.5 text-sm" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="ALL">All Types</option>
          <option value="MCQ">MCQ</option>
          <option value="TRUE_FALSE">True/False</option>
          <option value="FILL_BLANK">Fill Blank</option>
          <option value="AUDIO">Audio</option>
          <option value="VIDEO">Video</option>
        </select>
        <select className="border rounded-lg px-3 py-1.5 text-sm" value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
          <option value="ALL">All Levels</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
      </div>

      {/* Question List */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {questions.map((q) => {
          const isSelected = selectedQuestions.some(sq => sq.id === q.id);
          return (
            <div
              key={q.id}
              className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex-1 min-w-0" onClick={() => isSelected ? onRemove(q.id) : onSelect(q)}>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">{q.question_type}</Badge>
                  <Badge className={`text-xs ${
                    q.difficulty_level === 'EASY' ? 'bg-green-100 text-green-700' :
                    q.difficulty_level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>{q.difficulty_level}</Badge>
                  <Badge variant="secondary" className="text-xs">{q.marks} pts</Badge>
                </div>
                <p className="text-sm line-clamp-2">{q.question_text}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <Button variant="ghost" size="sm" onClick={() => setPreviewQuestion(q)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => isSelected ? onRemove(q.id) : onSelect(q)}>
                  {isSelected ? <X className="h-4 w-4 text-red-500" /> : <Plus className="h-4 w-4 text-green-500" />}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewQuestion} onOpenChange={() => setPreviewQuestion(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Question Preview</DialogTitle></DialogHeader>
          {previewQuestion && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge>{previewQuestion.question_type}</Badge>
                <Badge variant="secondary">{previewQuestion.difficulty_level}</Badge>
                <Badge>{previewQuestion.marks} pts</Badge>
              </div>
              <h3 className="text-lg font-semibold">{previewQuestion.question_text}</h3>
              {previewQuestion.media && (
                <div className="flex gap-2">
                  {previewQuestion.media.map((m, i) => (
                    <Badge key={i} variant="outline" className="flex items-center gap-1">
                      {m.media_type === 'AUDIO' ? <Music className="h-3 w-3" /> :
                       m.media_type === 'VIDEO' ? <Video className="h-3 w-3" /> :
                       <Image className="h-3 w-3" />}
                      {m.media_type}
                    </Badge>
                  ))}
                </div>
              )}
              {previewQuestion.options && (
                <div className="space-y-2">
                  {previewQuestion.options.map((opt, i) => (
                    <div key={i} className={`p-3 rounded-lg ${opt.is_correct ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                      <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt.option_text}
                      {opt.is_correct && <CheckCircle className="inline h-4 w-4 text-green-500 ml-2" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Section Component
function ExamSection({ section, index, onUpdate, onRemove, onReorder }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card className={`border-2 ${expanded ? '' : 'border-gray-200'}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          <Input
            value={section.title}
            onChange={(e) => onUpdate(index, 'title', e.target.value)}
            placeholder="Section Title"
            className="flex-1 font-bold"
          />
          <Badge>{section.questions?.length || 0} Questions</Badge>
          <Badge variant="secondary">{section.total_marks || 0} Marks</Badge>
          <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="mt-4 pl-8 space-y-2">
                {section.questions?.map((q, qi) => (
                  <div key={q.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                    <span className="text-sm font-bold text-gray-400">{qi + 1}.</span>
                    <span className="flex-1 text-sm truncate">{q.question_text}</span>
                    <Badge variant="outline" className="text-xs">{q.question_type}</Badge>
                    <Badge className="text-xs">{q.marks} pts</Badge>
                    <Button variant="ghost" size="sm" onClick={() => {
                      const newQuestions = section.questions.filter((_, i) => i !== qi);
                      onUpdate(index, 'questions', newQuestions);
                    }}>
                      <X className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>
                ))}
                {(!section.questions || section.questions.length === 0) && (
                  <p className="text-sm text-gray-400 text-center py-4">Drag questions here or use the question bank</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

// AI Exam Generator Component
function AIExamGenerator({ onGenerate }) {
  const [config, setConfig] = useState({
    topic: '',
    totalQuestions: 40,
    easyPercent: 30,
    mediumPercent: 50,
    hardPercent: 20,
    totalMarks: 100,
    durationMinutes: 60,
    includeTypes: ['MCQ', 'TRUE_FALSE', 'FILL_BLANK'],
  });

  const handleGenerate = () => {
    onGenerate?.(config);
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary-600" />
          <h3 className="font-bold">AI Auto-Generate Exam</h3>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Topic / Subject</label>
          <Input value={config.topic} onChange={(e) => setConfig(prev => ({ ...prev, topic: e.target.value }))} placeholder="e.g., Japanese Grammar N4" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Total Questions: {config.totalQuestions}</label>
            <Slider value={[config.totalQuestions]} onValueChange={([v]) => setConfig(prev => ({ ...prev, totalQuestions: v }))} min={5} max={100} step={5} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Total Marks: {config.totalMarks}</label>
            <Slider value={[config.totalMarks]} onValueChange={([v]) => setConfig(prev => ({ ...prev, totalMarks: v }))} min={10} max={500} step={10} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Duration: {config.durationMinutes} min</label>
            <Slider value={[config.durationMinutes]} onValueChange={([v]) => setConfig(prev => ({ ...prev, durationMinutes: v }))} min={10} max={180} step={5} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Difficulty Distribution</label>
          <div className="flex gap-4 text-sm">
            <div className="flex-1">
              <span className="text-green-600">Easy: {config.easyPercent}%</span>
              <Slider value={[config.easyPercent]} onValueChange={([v]) => setConfig(prev => ({ ...prev, easyPercent: v, mediumPercent: 100 - v - prev.hardPercent }))} min={0} max={100} />
            </div>
            <div className="flex-1">
              <span className="text-yellow-600">Medium: {config.mediumPercent}%</span>
              <Slider value={[config.mediumPercent]} onValueChange={([v]) => setConfig(prev => ({ ...prev, mediumPercent: v, easyPercent: 100 - v - prev.hardPercent }))} min={0} max={100} />
            </div>
            <div className="flex-1">
              <span className="text-red-600">Hard: {config.hardPercent}%</span>
              <Slider value={[config.hardPercent]} onValueChange={([v]) => setConfig(prev => ({ ...prev, hardPercent: v, mediumPercent: 100 - v - prev.easyPercent }))} min={0} max={100} />
            </div>
          </div>
        </div>

        <Button variant="gradient" className="w-full" onClick={handleGenerate}>
          <Sparkles className="mr-2 h-4 w-4" /> Generate Exam
        </Button>
      </CardContent>
    </Card>
  );
}

// Main Exam Builder Page
export default function ExamBuilderPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('builder');
  const [showQuestionBank, setShowQuestionBank] = useState(false);

  const [examData, setExamData] = useState({
    title: 'New Exam',
    description: '',
    instructions: '',
    exam_type: 'PRACTICE',
    total_marks: 100,
    passing_marks: 40,
    duration_minutes: 60,
    max_attempts: 3,
    randomize_questions: false,
    randomize_options: false,
    show_results_immediately: true,
    allow_pause: true,
    sections: [
      {
        title: 'Section A',
        description: '',
        questions: [],
        total_marks: 50,
      },
      {
        title: 'Section B',
        description: '',
        questions: [],
        total_marks: 50,
      },
    ],
    settings: {
      proctoring: false,
      ip_restriction: false,
      browser_lockdown: false,
    },
  });

  const addSection = () => {
    setExamData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: `Section ${prev.sections.length + 1}`, questions: [], total_marks: 0 }]
    }));
  };

  const updateSection = (index, field, value) => {
    const newSections = [...examData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setExamData(prev => ({ ...prev, sections: newSections }));
  };

  const removeSection = (index) => {
    setExamData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const addQuestionToSection = (question, sectionIndex) => {
    const newSections = [...examData.sections];
    if (!newSections[sectionIndex].questions.find(q => q.id === question.id)) {
      newSections[sectionIndex].questions.push(question);
      newSections[sectionIndex].total_marks = newSections[sectionIndex].questions.reduce((s, q) => s + (q.marks || 0), 0);
      setExamData(prev => ({ ...prev, sections: newSections }));
      toast({ description: `Added to ${newSections[sectionIndex].title}` });
    }
  };

  const handleAIGenerate = (config) => {
    toast({ title: 'AI Generated!', description: `Exam with ${config.totalQuestions} questions created.` });
  };

  const handleSave = () => {
    toast({ title: 'Saved!', description: 'Exam saved successfully.' });
  };

  const totalQuestions = examData.sections.reduce((s, sec) => s + (sec.questions?.length || 0), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/exams" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <Input
              value={examData.title}
              onChange={(e) => setExamData(prev => ({ ...prev, title: e.target.value }))}
              className="text-2xl font-extrabold border-none shadow-none px-0 h-auto focus:ring-0"
            />
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{totalQuestions} Questions</span>
              <span>•</span>
              <span>{examData.total_marks} Marks</span>
              <span>•</span>
              <span>{examData.duration_minutes} Minutes</span>
              <Badge>{examData.exam_type}</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-1 h-4 w-4" /> Preview
          </Button>
          <Button variant="gradient" onClick={handleSave}>
            <Save className="mr-1 h-4 w-4" /> Save Exam
          </Button>
        </div>
      </div>

      {/* Exam Settings Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-400" />
              <Input type="number" value={examData.passing_marks} onChange={(e) => setExamData(prev => ({ ...prev, passing_marks: parseInt(e.target.value) || 0 }))} className="w-20 h-8 text-sm" />
              <span className="text-sm text-gray-500">Passing Marks</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <Input type="number" value={examData.duration_minutes} onChange={(e) => setExamData(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) || 0 }))} className="w-20 h-8 text-sm" />
              <span className="text-sm text-gray-500">Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Shuffle className="h-4 w-4 text-gray-400" />
              <Switch checked={examData.randomize_questions} onCheckedChange={(v) => setExamData(prev => ({ ...prev, randomize_questions: v }))} />
              <span className="text-sm text-gray-500">Randomize</span>
            </div>
            <div className="border-l pl-4">
              <Button variant="outline" size="sm" onClick={() => setShowQuestionBank(true)}>
                <Search className="mr-1 h-3 w-3" /> Question Bank
              </Button>
            </div>
            <div className="border-l pl-4">
              <Button variant="outline" size="sm" onClick={() => setActiveTab('ai')}>
                <Sparkles className="mr-1 h-3 w-3" /> AI Generate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sections Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">Exam Sections</h2>
            <Button variant="outline" size="sm" onClick={addSection}>
              <Plus className="mr-1 h-3 w-3" /> Add Section
            </Button>
          </div>

          {examData.sections.map((section, i) => (
            <ExamSection
              key={i}
              section={section}
              index={i}
              onUpdate={updateSection}
              onRemove={removeSection}
            />
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Exam Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Exam Type</label>
                <select className="w-full h-9 rounded-lg border px-3 text-sm" value={examData.exam_type} onChange={(e) => setExamData(prev => ({ ...prev, exam_type: e.target.value }))}>
                  <option value="PRACTICE">Practice</option>
                  <option value="MOCK">Mock Test</option>
                  <option value="REAL">Real Exam</option>
                  <option value="ADAPTIVE">Adaptive</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Max Attempts</label>
                <Input type="number" value={examData.max_attempts} onChange={(e) => setExamData(prev => ({ ...prev, max_attempts: parseInt(e.target.value) || 1 }))} min={1} max={10} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Results Immediately</span>
                <Switch checked={examData.show_results_immediately} onCheckedChange={(v) => setExamData(prev => ({ ...prev, show_results_immediately: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Allow Pause</span>
                <Switch checked={examData.allow_pause} onCheckedChange={(v) => setExamData(prev => ({ ...prev, allow_pause: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Proctoring</span>
                <Switch checked={examData.settings.proctoring} onCheckedChange={(v) => setExamData(prev => ({ ...prev, settings: { ...prev.settings, proctoring: v } }))} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Browser Lockdown</span>
                <Switch checked={examData.settings.browser_lockdown} onCheckedChange={(v) => setExamData(prev => ({ ...prev, settings: { ...prev.settings, browser_lockdown: v } }))} />
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold text-sm mb-3">Exam Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Sections</span><span className="font-bold">{examData.sections.length}</span></div>
                <div className="flex justify-between"><span>Total Questions</span><span className="font-bold">{totalQuestions}</span></div>
                <div className="flex justify-between"><span>Total Marks</span><span className="font-bold">{examData.total_marks}</span></div>
                <div className="flex justify-between"><span>Duration</span><span className="font-bold">{examData.duration_minutes} min</span></div>
                <div className="flex justify-between"><span>Passing</span><span className="font-bold">{examData.passing_marks} marks</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Question Bank Dialog */}
      <Dialog open={showQuestionBank} onOpenChange={setShowQuestionBank}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Question Bank</DialogTitle></DialogHeader>
          <QuestionBankSelector
            onSelect={(q) => {
              if (examData.sections.length > 0) {
                addQuestionToSection(q, 0);
              }
            }}
            selectedQuestions={examData.sections.flatMap(s => s.questions)}
            onRemove={(qId) => {
              const newSections = examData.sections.map(s => ({
                ...s,
                questions: s.questions.filter(q => q.id !== qId)
              }));
              setExamData(prev => ({ ...prev, sections: newSections }));
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Demo questions for the builder
const demoQuestions = [
  { id: '1', question_type: 'MCQ', difficulty_level: 'EASY', marks: 1, question_text: 'What is the capital of Japan?', options: [{ option_text: 'Tokyo', is_correct: true }, { option_text: 'Seoul', is_correct: false }, { option_text: 'Beijing', is_correct: false }, { option_text: 'Bangkok', is_correct: false }], topic: 'Geography' },
  { id: '2', question_type: 'MCQ', difficulty_level: 'MEDIUM', marks: 2, question_text: 'Which particle marks the subject in Japanese?', options: [{ option_text: 'が', is_correct: true }, { option_text: 'を', is_correct: false }, { option_text: 'に', is_correct: false }, { option_text: 'で', is_correct: false }], topic: 'Grammar' },
  { id: '3', question_type: 'TRUE_FALSE', difficulty_level: 'EASY', marks: 1, question_text: 'Mount Fuji is in Japan.', options: [{ option_text: 'True', is_correct: true }, { option_text: 'False', is_correct: false }], topic: 'Culture' },
  { id: '4', question_type: 'FILL_BLANK', difficulty_level: 'MEDIUM', marks: 2, question_text: '私は日本語を______います。', correct_answer: '勉強して', topic: 'Grammar' },
  { id: '5', question_type: 'AUDIO', difficulty_level: 'HARD', marks: 3, question_text: 'Listen and answer the question.', media: [{ media_type: 'AUDIO', media_url: '/audio/sample.mp3' }], options: [{ option_text: 'Food', is_correct: true }, { option_text: 'Weather', is_correct: false }, { option_text: 'Travel', is_correct: false }, { option_text: 'Work', is_correct: false }], topic: 'Listening' },
  { id: '6', question_type: 'MCQ', difficulty_level: 'EASY', marks: 1, question_text: 'What does "ありがとう" mean?', options: [{ option_text: 'Thank you', is_correct: true }, { option_text: 'Sorry', is_correct: false }, { option_text: 'Hello', is_correct: false }, { option_text: 'Goodbye', is_correct: false }], topic: 'Vocabulary' },
  { id: '7', question_type: 'MULTIPLE_RESPONSE', difficulty_level: 'MEDIUM', marks: 2, question_text: 'Select all Japanese writing systems.', options: [{ option_text: 'Hiragana', is_correct: true }, { option_text: 'Katakana', is_correct: true }, { option_text: 'Kanji', is_correct: true }, { option_text: 'Hangul', is_correct: false }], topic: 'Writing' },
  { id: '8', question_type: 'MATCHING', difficulty_level: 'HARD', marks: 3, question_text: 'Match words with meanings', pairs: [{ left: '犬', right: 'Dog' }, { left: '猫', right: 'Cat' }], topic: 'Vocabulary' },
];