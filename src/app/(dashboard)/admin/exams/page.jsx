// apps/web/src/app/(dashboard)/admin/exams/page.jsx

'use client';

 

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SimpleSelect } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
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
  FileText,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Calendar,
  Play,
  Pause,
  BarChart3,
  Award,
  AlertCircle,
  Star,
  Unlock,
  Lock,
} from 'lucide-react';

// Demo data - replace with API calls
const demoExams = [
  {
    id: '1',
    name: 'JFT-Basic Sample Exam 1',
    code: 'JFT-001',
    exam_type: 'JFT',
    level: 'A2',
    type: 'FREE',
    status: 'PUBLISHED',
    question_count: 40,
    total_marks: 250,
    passing_marks: 200,
    duration_minutes: 60,
    total_attempts: 1250,
    average_score: 72,
    sections: 4,
    created_at: '2026-01-15T00:00:00Z',
    creator: { full_name: 'Admin User' },
    description: 'Sample JFT Basic exam for practice'
  },
  {
    id: '2',
    name: 'JLPT N5 Sample Exam 1',
    code: 'JLPT-N5-001',
    exam_type: 'JLPT',
    level: 'N5',
    type: 'FREE',
    status: 'PUBLISHED',
    question_count: 35,
    total_marks: 180,
    passing_marks: 90,
    duration_minutes: 50,
    total_attempts: 2100,
    average_score: 78,
    sections: 3,
    created_at: '2026-02-10T00:00:00Z',
    creator: { full_name: 'Admin User' },
    description: 'JLPT N5 practice exam'
  },
  {
    id: '3',
    name: 'JLPT N4 Mock Exam 1',
    code: 'JLPT-N4-001',
    exam_type: 'JLPT',
    level: 'N4',
    type: 'PREMIUM',
    status: 'PUBLISHED',
    question_count: 40,
    total_marks: 200,
    passing_marks: 100,
    duration_minutes: 90,
    total_attempts: 850,
    average_score: 65,
    sections: 3,
    created_at: '2026-03-01T00:00:00Z',
    creator: { full_name: 'Admin User' },
    description: 'JLPT N4 mock exam'
  },
  {
    id: '4',
    name: 'JLPT N3 Practice Test',
    code: 'JLPT-N3-001',
    exam_type: 'JLPT',
    level: 'N3',
    type: 'PREMIUM',
    status: 'DRAFT',
    question_count: 45,
    total_marks: 225,
    passing_marks: 115,
    duration_minutes: 105,
    total_attempts: 0,
    average_score: 0,
    sections: 3,
    created_at: '2026-04-01T00:00:00Z',
    creator: { full_name: 'Admin User' },
    description: 'JLPT N3 practice test'
  },
  {
    id: '5',
    name: 'JFT-Basic Sample Exam 2',
    code: 'JFT-002',
    exam_type: 'JFT',
    level: 'A2',
    type: 'FREE',
    status: 'SCHEDULED',
    question_count: 40,
    total_marks: 250,
    passing_marks: 200,
    duration_minutes: 60,
    total_attempts: 0,
    average_score: 0,
    sections: 4,
    created_at: '2026-05-01T00:00:00Z',
    creator: { full_name: 'Admin User' },
    description: 'JFT Basic exam scheduled for next month'
  },
];

export default function ExamsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState(demoExams);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Stats
  const stats = {
    total: exams.length,
    published: exams.filter(e => e.status === 'PUBLISHED').length,
    draft: exams.filter(e => e.status === 'DRAFT').length,
    scheduled: exams.filter(e => e.status === 'SCHEDULED').length,
    free: exams.filter(e => e.type === 'FREE').length,
    premium: exams.filter(e => e.type === 'PREMIUM').length,
    total_attempts: exams.reduce((sum, e) => sum + (e.total_attempts || 0), 0),
  };

  // Filter exams
  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || exam.status === selectedStatus;
    const matchesType = selectedType === 'all' || exam.type === selectedType;
    const matchesLevel = selectedLevel === 'all' || exam.level === selectedLevel;
    return matchesSearch && matchesStatus && matchesType && matchesLevel;
  });

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      DRAFT: 'bg-yellow-100 text-yellow-800',
      PUBLISHED: 'bg-green-100 text-green-800',
      SCHEDULED: 'bg-blue-100 text-blue-800',
      ARCHIVED: 'bg-gray-100 text-gray-800',
      IN_PROGRESS: 'bg-purple-100 text-purple-800',
      COMPLETED: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || colors.DRAFT;
  };

  // Get type badge
  const getTypeBadge = (type) => {
    if (type === 'FREE') {
      return <Badge variant="success" className="bg-green-100 text-green-800"><Unlock className="h-3 w-3 mr-1" /> Free</Badge>;
    }
    return <Badge variant="warning" className="bg-yellow-100 text-yellow-800"><Star className="h-3 w-3 mr-1" /> Premium</Badge>;
  };

  // Handle delete
  const handleDelete = async () => {
    if (!examToDelete) return;
    try {
      setDeleting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setExams(exams.filter(e => e.id !== examToDelete.id));
      toast({
        title: 'Success',
        description: 'Exam deleted successfully',
      });
      setDeleteDialogOpen(false);
      setExamToDelete(null);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete exam',
      });
    } finally {
      setDeleting(false);
    }
  };

  // Handle publish
  const handlePublish = async (id) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setExams(exams.map(e => 
        e.id === id ? { ...e, status: 'PUBLISHED' } : e
      ));
      toast({
        title: 'Success',
        description: 'Exam published successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to publish exam',
      });
    }
  };

  // Handle unpublish
  const handleUnpublish = async (id) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setExams(exams.map(e => 
        e.id === id ? { ...e, status: 'DRAFT' } : e
      ));
      toast({
        title: 'Success',
        description: 'Exam unpublished successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to unpublish exam',
      });
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-64 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Exam Management
            </h1>
            <p className="text-muted-foreground">
              Manage all exams and their configurations
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {}}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Link href="/admin/exams/create">
              <Button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-lg transition-shadow">
                <Plus className="mr-2 h-4 w-4" />
                Create Exam
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Exams</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
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
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
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
                <p className="text-sm text-muted-foreground">Free Exams</p>
                <p className="text-2xl font-bold text-green-600">{stats.free}</p>
              </div>
              <Unlock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Premium Exams</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.premium}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exams by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <SimpleSelect 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-[150px]"
            >
              <option value="all">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="ARCHIVED">Archived</option>
            </SimpleSelect>
            <SimpleSelect 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-[150px]"
            >
              <option value="all">All Types</option>
              <option value="FREE">Free</option>
              <option value="PREMIUM">Premium</option>
            </SimpleSelect>
            <SimpleSelect 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-[150px]"
            >
              <option value="all">All Levels</option>
              <option value="A2">A2 (JFT)</option>
              <option value="N5">N5</option>
              <option value="N4">N4</option>
              <option value="N3">N3</option>
              <option value="N2">N2</option>
              <option value="N1">N1</option>
            </SimpleSelect>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Exams Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExams.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium">No exams found</p>
                      <p className="text-sm text-muted-foreground">
                        Create your first exam to get started
                      </p>
                      <Link href="/admin/exams/create">
                        <Button className="mt-4">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Exam
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredExams.map((exam, index) => (
                  <TableRow key={exam.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{exam.name}</div>
                        {exam.description && (
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {exam.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{exam.code}</Badge>
                    </TableCell>
                    <TableCell>{getTypeBadge(exam.type)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{exam.level}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{exam.question_count || 0}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{exam.duration_minutes || 0} min</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(exam.status)}>
                        {exam.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{exam.total_attempts || 0}</span>
                        {exam.average_score > 0 && (
                          <span className="text-xs text-muted-foreground">
                            Avg: {exam.average_score}%
                          </span>
                        )}
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
                          <DropdownMenuItem onClick={() => router.push(`/admin/exams/${exam.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/exams/${exam.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Exam
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          {exam.status === 'DRAFT' && (
                            <DropdownMenuItem onClick={() => handlePublish(exam.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Publish
                            </DropdownMenuItem>
                          )}
                          {exam.status === 'PUBLISHED' && (
                            <DropdownMenuItem onClick={() => handleUnpublish(exam.id)}>
                              <Pause className="mr-2 h-4 w-4" />
                              Unpublish
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => {
                              setExamToDelete(exam);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Exam
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

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Exam</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{examToDelete?.name}"? 
              This action cannot be undone and will remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete Exam'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
