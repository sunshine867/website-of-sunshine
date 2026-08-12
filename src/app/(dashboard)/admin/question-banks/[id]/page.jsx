'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Search, Plus, Edit, Trash2, Copy, Eye,
  Filter, Download, Upload, Sparkles, FileText,
  Image, Music, Video, CheckCircle, Clock, AlertCircle,
  Grid3X3, List, BarChart3
} from 'lucide-react';
import ConfirmDialog from '@/components/shared/confirm-dialog';

// Demo questions in the bank
const demoQuestions = [
  {
    id: 'q1', question_type: 'MCQ', difficulty_level: 'EASY', marks: 1,
    question_text: 'What is the capital of Japan?',
    options: [
      { option_text: 'Tokyo', is_correct: true },
      { option_text: 'Seoul', is_correct: false },
      { option_text: 'Beijing', is_correct: false },
      { option_text: 'Bangkok', is_correct: false },
    ],
    topic: 'Geography', subject: 'General Knowledge', status: 'PUBLISHED',
    total_attempts: 450, success_rate: 92, created_at: '2026-01-15',
  },
  {
    id: 'q2', question_type: 'MCQ', difficulty_level: 'MEDIUM', marks: 2,
    question_text: 'Which particle marks the subject in Japanese?',
    options: [
      { option_text: 'を', is_correct: false },
      { option_text: 'が', is_correct: true },
      { option_text: 'に', is_correct: false },
      { option_text: 'で', is_correct: false },
    ],
    topic: 'Grammar', subject: 'Japanese', status: 'PUBLISHED',
    total_attempts: 320, success_rate: 78, created_at: '2026-02-20',
  },
  {
    id: 'q3', question_type: 'TRUE_FALSE', difficulty_level: 'EASY', marks: 1,
    question_text: 'Mount Fuji is the highest mountain in Japan.',
    options: [
      { option_text: 'True', is_correct: true },
      { option_text: 'False', is_correct: false },
    ],
    topic: 'Culture', subject: 'Japanese', status: 'PUBLISHED',
    total_attempts: 600, success_rate: 95, created_at: '2026-03-10',
  },
  {
    id: 'q4', question_type: 'FILL_BLANK', difficulty_level: 'MEDIUM', marks: 2,
    question_text: 'Complete: 私は日本語を______います。',
    correct_answer: '勉強して',
    topic: 'Grammar', subject: 'Japanese', status: 'PUBLISHED',
    total_attempts: 280, success_rate: 65, created_at: '2026-04-05',
  },
  {
    id: 'q5', question_type: 'AUDIO', difficulty_level: 'HARD', marks: 3,
    question_text: 'Listen to the audio and answer: What is the speaker talking about?',
    media: [{ media_type: 'AUDIO', media_url: '/audio/jft-q1.mp3' }],
    options: [
      { option_text: 'Weather', is_correct: false },
      { option_text: 'Food', is_correct: true },
      { option_text: 'Travel', is_correct: false },
      { option_text: 'Work', is_correct: false },
    ],
    topic: 'Listening', subject: 'Japanese', status: 'PUBLISHED',
    total_attempts: 150, success_rate: 55, created_at: '2026-05-12',
  },
  {
    id: 'q6', question_type: 'MCQ', difficulty_level: 'EASY', marks: 1,
    question_text: 'What does "ありがとう" mean?',
    options: [
      { option_text: 'Thank you', is_correct: true },
      { option_text: 'Sorry', is_correct: false },
      { option_text: 'Hello', is_correct: false },
      { option_text: 'Goodbye', is_correct: false },
    ],
    topic: 'Vocabulary', subject: 'Japanese', status: 'DRAFT',
    total_attempts: 0, success_rate: 0, created_at: '2026-06-01',
  },
  {
    id: 'q7', question_type: 'MULTIPLE_RESPONSE', difficulty_level: 'MEDIUM', marks: 2,
    question_text: 'Which of the following are Japanese writing systems? (Select all)',
    options: [
      { option_text: 'Hiragana', is_correct: true },
      { option_text: 'Katakana', is_correct: true },
      { option_text: 'Kanji', is_correct: true },
      { option_text: 'Hangul', is_correct: false },
    ],
    topic: 'Writing', subject: 'Japanese', status: 'PUBLISHED',
    total_attempts: 200, success_rate: 72, created_at: '2026-06-15',
  },
  {
    id: 'q8', question_type: 'MATCHING', difficulty_level: 'HARD', marks: 3,
    question_text: 'Match the Japanese words with their English meanings',
    pairs: [
      { left: '犬', right: 'Dog' },
      { left: '猫', right: 'Cat' },
      { left: '鳥', right: 'Bird' },
    ],
    topic: 'Vocabulary', subject: 'Japanese', status: 'DRAFT',
    total_attempts: 0, success_rate: 0, created_at: '2026-07-01',
  },
];

const questionTypes = ['ALL', 'MCQ', 'TRUE_FALSE', 'FILL_BLANK', 'MULTIPLE_RESPONSE', 'MATCHING', 'AUDIO', 'VIDEO', 'SPEAKING'];
const difficultyLevels = ['ALL', 'EASY', 'MEDIUM', 'HARD'];
const statusFilters = ['ALL', 'PUBLISHED', 'DRAFT', 'ARCHIVED'];

export default function QuestionBankDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('list');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [bankToDelete, setBankToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const { toast } = useToast();

  const bank = { 
    id: id, 
    name: 'JLPT N5-N1 Question Bank', 
    exam_type: 'JLPT', 
    language: 'ja', 
    total_questions: demoQuestions.length,
    description: 'Complete Japanese Language Proficiency Test questions from N5 to N1',
    code: 'JLPT-BANK-001',
    difficulty: 'All Levels',
    visibility: 'Public'
  };

  const filteredQuestions = demoQuestions.filter(q => {
    const matchesSearch = q.question_text.toLowerCase().includes(search.toLowerCase()) ||
                         q.topic?.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'ALL' || q.question_type === typeFilter;
    const matchesDifficulty = difficultyFilter === 'ALL' || q.difficulty_level === difficultyFilter;
    const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter;
    return matchesSearch && matchesType && matchesDifficulty && matchesStatus;
  });

  const toggleSelect = (qId) => {
    setSelectedQuestions(prev => prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]);
  };

  const selectAll = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(filteredQuestions.map(q => q.id));
    }
  };

  const bulkDelete = () => {
    toast({ title: 'Deleted!', description: `${selectedQuestions.length} questions deleted.` });
    setSelectedQuestions([]);
  };

  const handleDeleteQuestion = async () => {
    setDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: 'Deleted!', description: 'Question has been deleted.' });
      setDeleteDialogOpen(false);
      setBankToDelete(null);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete question.', variant: 'destructive' });
    } finally {
      setDeleting(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: 'Published!', description: `${bank.name} has been published.` });
      setPublishDialogOpen(false);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to publish bank.', variant: 'destructive' });
    } finally {
      setPublishing(false);
    }
  };

  const handleDeleteBank = async () => {
    setDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: 'Deleted!', description: `${bank.name} has been deleted.` });
      setDeleteDialogOpen(false);
      router.push('/admin/question-banks');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete bank.', variant: 'destructive' });
    } finally {
      setDeleting(false);
    }
  };

  const typeIcons = {
    MCQ: <FileText className="h-4 w-4" />,
    TRUE_FALSE: <CheckCircle className="h-4 w-4" />,
    FILL_BLANK: <Edit className="h-4 w-4" />,
    MULTIPLE_RESPONSE: <List className="h-4 w-4" />,
    MATCHING: <Grid3X3 className="h-4 w-4" />,
    AUDIO: <Music className="h-4 w-4" />,
    VIDEO: <Video className="h-4 w-4" />,
    SPEAKING: <Music className="h-4 w-4" />,
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/admin/question-banks" className="hover:text-primary-600">Question Banks</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{bank.name}</span>
      </div>

      {/* Bank Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-extrabold">{bank.name}</h1>
                  <Badge>{bank.exam_type}</Badge>
                  <Badge variant="success">ACTIVE</Badge>
                </div>
                <p className="text-gray-500">{bank.description}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span><strong>{bank.total_questions}</strong> Questions</span>
                  <span>Language: {bank.language?.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/question-banks/${id}/create`}>
                  <Button variant="default">
                    <Plus className="mr-2 h-4 w-4" /> Add Question
                  </Button>
                </Link>
                
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" /> Bulk Import
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="questions">
        <TabsList>
          <TabsTrigger value="questions">
            <FileText className="h-4 w-4 mr-2" /> Questions ({filteredQuestions.length})
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Filter className="h-4 w-4 mr-2" /> Categories
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Edit className="h-4 w-4 mr-2" /> Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="mt-4">
          {/* Filters */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search questions..." 
                    className="pl-10" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                  />
                </div>
                <select 
                  className="border rounded-lg px-3 py-1.5 text-sm bg-white" 
                  value={typeFilter} 
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  {questionTypes.map(t => (
                    <option key={t} value={t}>
                      {t === 'ALL' ? 'All Types' : t.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
                <select 
                  className="border rounded-lg px-3 py-1.5 text-sm bg-white" 
                  value={difficultyFilter} 
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                  {difficultyLevels.map(d => (
                    <option key={d} value={d}>
                      {d === 'ALL' ? 'All Difficulty' : d}
                    </option>
                  ))}
                </select>
                <select 
                  className="border rounded-lg px-3 py-1.5 text-sm bg-white" 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statusFilters.map(s => (
                    <option key={s} value={s}>
                      {s === 'ALL' ? 'All Status' : s}
                    </option>
                  ))}
                </select>
                <div className="flex gap-1 border-l pl-3">
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'ghost'} 
                    size="sm" 
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                    size="sm" 
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedQuestions.length > 0 && (
                <div className="flex items-center gap-3 mt-3 pt-3 border-t">
                  <span className="text-sm font-medium">{selectedQuestions.length} selected</span>
                  <Button variant="outline" size="sm" onClick={bulkDelete}>
                    <Trash2 className="mr-1 h-3 w-3" /> Delete Selected
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="mr-1 h-3 w-3" /> Clone Selected
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Questions List */}
          {viewMode === 'list' ? (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="flex items-center gap-3 p-3 bg-gray-50">
                    <input 
                      type="checkbox" 
                      checked={selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0} 
                      onChange={selectAll} 
                      className="w-4 h-4" 
                    />
                    <span className="text-sm font-medium text-gray-500">Select All ({filteredQuestions.length})</span>
                  </div>

                  {filteredQuestions.map((q, i) => (
                    <motion.div 
                      key={q.id} 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: i * 0.02 }}
                      className={`flex items-start gap-3 p-4 hover:bg-gray-50 ${selectedQuestions.includes(q.id) ? 'bg-primary-50' : ''}`}
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedQuestions.includes(q.id)} 
                        onChange={() => toggleSelect(q.id)} 
                        className="w-4 h-4 mt-1" 
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            {typeIcons[q.question_type]} {q.question_type?.replace(/_/g, ' ')}
                          </Badge>
                          <Badge className={`text-xs ${
                            q.difficulty_level === 'EASY' ? 'bg-green-100 text-green-700' :
                            q.difficulty_level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                          }`}>{q.difficulty_level}</Badge>
                          <Badge variant="secondary" className="text-xs">{q.marks} pts</Badge>
                          <Badge className={`text-xs ${
                            q.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                            q.status === 'DRAFT' ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>{q.status}</Badge>
                        </div>
                        
                        <p className="text-sm font-medium mb-1">{q.question_text}</p>
                        
                        {q.options && (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {q.options.map((opt, j) => (
                              <span key={j} className={`text-xs px-2 py-0.5 rounded-full ${
                                opt.is_correct ? 'bg-green-100 text-green-700 font-medium' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {String.fromCharCode(65 + j)}. {opt.option_text}
                                {opt.is_correct && ' ✓'}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 flex-wrap">
                          <span>Topic: {q.topic}</span>
                          <span>Subject: {q.subject}</span>
                          {q.total_attempts > 0 && <span>Attempts: {q.total_attempts}</span>}
                          {q.success_rate > 0 && <span>Success: {q.success_rate}%</span>}
                        </div>
                      </div>

                      <div className="flex gap-1 flex-shrink-0">
                        <Button variant="ghost" size="sm" title="Preview"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" title="Edit"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" title="Clone"><Copy className="h-4 w-4" /></Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Delete" 
                          onClick={() => {
                            setBankToDelete(q);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredQuestions.map((q, i) => (
                <Card key={q.id} className={`hover:shadow-lg transition-all ${selectedQuestions.includes(q.id) ? 'ring-2 ring-primary-500' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <input 
                        type="checkbox" 
                        checked={selectedQuestions.includes(q.id)} 
                        onChange={() => toggleSelect(q.id)} 
                        className="w-4 h-4" 
                      />
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">{q.question_type}</Badge>
                        <Badge className={`text-xs ${q.difficulty_level === 'EASY' ? 'bg-green-100 text-green-700' : q.difficulty_level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{q.difficulty_level}</Badge>
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-3 line-clamp-3">{q.question_text}</p>
                    {q.options && (
                      <div className="space-y-1 mb-3">
                        {q.options.slice(0, 4).map((opt, j) => (
                          <div key={j} className={`text-xs p-1.5 rounded ${opt.is_correct ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}>
                            {String.fromCharCode(65 + j)}. {opt.option_text}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>{q.topic}</span>
                      <span>{q.marks} pts</span>
                    </div>
                    <div className="flex gap-1 mt-2 pt-2 border-t">
                      <Button variant="ghost" size="sm" className="flex-1"><Edit className="h-3 w-3 mr-1" /> Edit</Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-1 text-red-500"
                        onClick={() => {
                          setBankToDelete(q);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-3 w-3 mr-1" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="categories" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Category Tree</h3>
              <div className="space-y-4">
                {['JLPT', 'JFT', 'General'].map(cat => (
                  <div key={cat}>
                    <h4 className="font-semibold text-primary-600 mb-2">{cat}</h4>
                    <div className="flex flex-wrap gap-2 ml-4">
                      {cat === 'JLPT' && ['Vocabulary', 'Grammar', 'Kanji', 'Reading', 'Listening'].map(t => (
                        <Badge key={t} variant="outline" className="cursor-pointer hover:bg-gray-100">{t}</Badge>
                      ))}
                      {cat === 'JFT' && ['Script & Vocabulary', 'Conversation', 'Listening', 'Reading'].map(t => (
                        <Badge key={t} variant="outline" className="cursor-pointer hover:bg-gray-100">{t}</Badge>
                      ))}
                      {cat === 'General' && ['Geography', 'Culture', 'History'].map(t => (
                        <Badge key={t} variant="outline" className="cursor-pointer hover:bg-gray-100">{t}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Question Bank Analytics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Questions', value: demoQuestions.length },
                  { label: 'Published', value: demoQuestions.filter(q => q.status === 'PUBLISHED').length },
                  { label: 'Drafts', value: demoQuestions.filter(q => q.status === 'DRAFT').length },
                  { label: 'Avg Success Rate', value: '72%' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bank Settings</CardTitle>
              <CardDescription>
                Manage your question bank settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Bank Name</Label>
                <Input value={bank.name} disabled />
              </div>
              <div className="space-y-2">
                <Label>Bank Code</Label>
                <Input value={bank.code} disabled />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={bank.description || ''} disabled rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Input value={bank.difficulty || ''} disabled />
              </div>
              <div className="space-y-2">
                <Label>Visibility</Label>
                <Input value={bank.visibility || ''} disabled />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => router.push(`/admin/question-banks/${id}/edit`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Settings
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setBankToDelete(bank);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Bank
                </Button>
                <Button
                  variant="default"
                  onClick={() => setPublishDialogOpen(true)}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Publish Bank
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Question Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {bankToDelete?.name || 'Question'}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {bankToDelete?.name ? 'question bank' : 'question'}? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={bankToDelete?.name ? handleDeleteBank : handleDeleteQuestion} 
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Publish Bank Dialog */}
      <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Question Bank</DialogTitle>
            <DialogDescription>
              Publishing this bank will make all its questions available for exams.
              Are you sure you want to publish "{bank.name}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPublishDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePublish} disabled={publishing}>
              {publishing ? 'Publishing...' : 'Publish Bank'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}