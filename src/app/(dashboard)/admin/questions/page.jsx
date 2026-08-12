// apps/web/src/app/(dashboard)/admin/questions/page.jsx

'use client';

 

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
// ✅ ADD THESE IMPORTS
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Eye,
  Filter,
  RefreshCw,
  FileQuestion,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  FileText,
  FolderOpen,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

// ✅ DEFAULT EXPORT
export default function QuestionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    pending_review: 0,
    ai_generated: 0,
  });

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedType !== 'all' && { questionType: selectedType }),
        ...(selectedDifficulty !== 'all' && { difficulty: selectedDifficulty }),
        ...(selectedStatus !== 'all' && { status: selectedStatus }),
      });

      const response = await api.get(`/questions?${params}`);
      setQuestions(response.data.data || []);
      setTotalQuestions(response.data.pagination?.total || 0);

      // Fetch stats
      const statsResponse = await api.get('/questions/stats');
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [page, searchTerm, selectedType, selectedDifficulty, selectedStatus]);

  // Delete question
  const handleDelete = async () => {
    if (!questionToDelete) return;
    try {
      setDeleting(true);
      await api.delete(`/questions/${questionToDelete.id}`);
      toast.success('Question deleted successfully');
      fetchQuestions();
      setDeleteDialogOpen(false);
      setQuestionToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete question');
    } finally {
      setDeleting(false);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      published: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      pending_review: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    };
    return colors[status] || colors.draft;
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      elementary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      upper_intermediate: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      expert: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    };
    return colors[difficulty] || colors.intermediate;
  };

  // Loading skeleton
  if (loading && questions.length === 0) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-64 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Questions</h1>
          <p className="text-muted-foreground">
            Manage all questions across all question banks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchQuestions}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={() => router.push('/admin/questions/create')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Questions</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileQuestion className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-green-600">{stats.published}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
              </div>
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Generated</p>
                <p className="text-2xl font-bold text-blue-600">{stats.ai_generated}</p>
              </div>
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending_review}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions by text or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="single_choice">Single Choice</SelectItem>
            <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
            <SelectItem value="true_false">True/False</SelectItem>
            <SelectItem value="fill_blank">Fill Blank</SelectItem>
            <SelectItem value="essay">Essay</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="elementary">Elementary</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="pending_review">Pending Review</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FileQuestion className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium">No questions found</p>
                      <p className="text-sm text-muted-foreground">
                        Create your first question to get started
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => router.push('/admin/questions/create')}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Question
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                questions.map((q, index) => (
                  <TableRow key={q.id}>
                    <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate">{q.question_text}</div>
                      {q.code && (
                        <div className="text-xs text-muted-foreground">{q.code}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{q.question_type}</Badge>
                    </TableCell>
                    <TableCell>
                      {q.difficulty && (
                        <Badge className={getDifficultyColor(q.difficulty)}>
                          {q.difficulty}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(q.status)}>
                        {q.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {q.bank?.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(q.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => router.push(`/admin/questions/${q.id}`)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push(`/admin/questions/${q.id}/edit`)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => {
                              setQuestionToDelete(q);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalQuestions > limit && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalQuestions)} of {totalQuestions} questions
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => p + 1)}
              disabled={page * limit >= totalQuestions}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* ✅ Delete Dialog - NOW WORKS */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Question</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete Question'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
