// apps/web/src/app/(dashboard)/admin/question-banks/page.jsx

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
  Download,
  Upload,
  RefreshCw,
  BookOpen,
  FileQuestion,
  CheckCircle,
  Clock,
  Sparkles,
  FileText,
  FolderOpen,
  Layers,
  Globe,
  Lock,
  Users,
  Calendar,
  Tag,
  AlertCircle,
  AlertTriangle,
  Wifi,
  WifiOff,
} from 'lucide-react';


   // ✅ ADD THIS

// Demo data - replace with API calls
const demoBanks = [
  {
    id: '1',
    name: 'JLPT N5-N1 Question Bank',
    code: 'JLPT-QB-001',
    description: 'Complete Japanese Language Proficiency Test questions covering all levels',
    exam_type: 'JLPT',
    language: 'ja',
    difficulty: 'all',
    total_questions: 2500,
    categories: 15,
    status: 'PUBLISHED',
    visibility: 'public',
    created_at: '2026-01-15T00:00:00Z',
    creator: { full_name: 'Admin User' },
    is_ai_generated: false,
  },
  {
    id: '2',
    name: 'TOPIK I & II Question Bank',
    code: 'TOPIK-QB-001',
    description: 'Test of Proficiency in Korean questions for all levels',
    exam_type: 'TOPIK',
    language: 'ko',
    difficulty: 'intermediate',
    total_questions: 1800,
    categories: 12,
    status: 'PUBLISHED',
    visibility: 'shared',
    created_at: '2026-02-20T00:00:00Z',
    creator: { full_name: 'Admin User' },
    is_ai_generated: false,
  },
  {
    id: '3',
    name: 'IELTS Academic Question Bank',
    code: 'IELTS-QB-001',
    description: 'IELTS Academic test preparation questions',
    exam_type: 'IELTS',
    language: 'en',
    difficulty: 'advanced',
    total_questions: 3200,
    categories: 20,
    status: 'PUBLISHED',
    visibility: 'public',
    created_at: '2026-03-10T00:00:00Z',
    creator: { full_name: 'Admin User' },
    is_ai_generated: true,
  },
  {
    id: '4',
    name: 'AI Generated JLPT N3 Questions',
    code: 'AI-JLPT-N3-001',
    description: 'AI-generated questions for JLPT N3 practice',
    exam_type: 'JLPT',
    language: 'ja',
    difficulty: 'intermediate',
    total_questions: 500,
    categories: 8,
    status: 'DRAFT',
    visibility: 'private',
    created_at: '2026-04-05T00:00:00Z',
    creator: { full_name: 'AI System' },
    is_ai_generated: true,
  },
  {
    id: '5',
    name: 'Nursing Entrance Exam Bank',
    code: 'NURSING-QB-001',
    description: 'Nursing and medical entrance questions',
    exam_type: 'NURSING',
    language: 'en',
    difficulty: 'advanced',
    total_questions: 1500,
    categories: 10,
    status: 'ARCHIVED',
    visibility: 'private',
    created_at: '2026-05-12T00:00:00Z',
    creator: { full_name: 'Admin User' },
    is_ai_generated: false,
  },
];

export default function QuestionBanksPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState(demoBanks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bankToDelete, setBankToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Stats
  const stats = {
    total: banks.length,
    published: banks.filter(b => b.status === 'PUBLISHED').length,
    draft: banks.filter(b => b.status === 'DRAFT').length,
    archived: banks.filter(b => b.status === 'ARCHIVED').length,
    ai_generated: banks.filter(b => b.is_ai_generated).length,
    total_questions: banks.reduce((sum, b) => sum + (b.total_questions || 0), 0),
  };

  // Check online status
  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Filter banks
  const filteredBanks = banks.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bank.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (bank.description && bank.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || bank.status === selectedStatus;
    const matchesLanguage = selectedLanguage === 'all' || bank.language === selectedLanguage;
    const matchesDifficulty = selectedDifficulty === 'all' || bank.difficulty === selectedDifficulty;
    return matchesSearch && matchesStatus && matchesLanguage && matchesDifficulty;
  });

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      DRAFT: 'bg-yellow-100 text-yellow-800',
      PUBLISHED: 'bg-green-100 text-green-800',
      ARCHIVED: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || colors.DRAFT;
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      elementary: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      upper_intermediate: 'bg-orange-100 text-orange-800',
      advanced: 'bg-red-100 text-red-800',
      expert: 'bg-purple-100 text-purple-800',
      all: 'bg-gray-100 text-gray-800',
    };
    return colors[difficulty] || colors.intermediate;
  };

  // Get visibility icon
  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'public':
        return <Globe className="h-4 w-4" />;
      case 'shared':
        return <Users className="h-4 w-4" />;
      default:
        return <Lock className="h-4 w-4" />;
    }
  };

  // Get language flag
  const getLanguageFlag = (language) => {
    const flags = {
      ja: '🇯🇵',
      ko: '🇰🇷',
      en: '🇬🇧',
      ne: '🇳🇵',
      zh: '🇨🇳',
      es: '🇪🇸',
      fr: '🇫🇷',
      de: '🇩🇪',
    };
    return flags[language] || '📚';
  };

  // Handle delete
  const handleDelete = async () => {
    if (!bankToDelete) return;
    try {
      setDeleting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBanks(banks.filter(b => b.id !== bankToDelete.id));
      toast({
        title: 'Success',
        description: 'Question bank deleted successfully',
      });
      setDeleteDialogOpen(false);
      setBankToDelete(null);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete bank',
      });
    } finally {
      setDeleting(false);
    }
  };

  // Handle duplicate
  const handleDuplicate = async (id) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const bankToCopy = banks.find(b => b.id === id);
      if (bankToCopy) {
        const newBank = {
          ...bankToCopy,
          id: String(Date.now()),
          name: `${bankToCopy.name} (Copy)`,
          code: `${bankToCopy.code}-COPY`,
          created_at: new Date().toISOString(),
          status: 'DRAFT',
        };
        setBanks([...banks, newBank]);
        toast({
          title: 'Success',
          description: 'Question bank duplicated successfully',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to duplicate bank',
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
        <div className="grid gap-4 md:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  // Offline state
  if (!isOnline) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-96">
            <WifiOff className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Internet Connection</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              Please check your internet connection and try again.
            </p>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </CardContent>
        </Card>
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
              Question Banks
            </h1>
            <p className="text-muted-foreground">
              Manage all question banks and their questions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {}}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Link href="/admin/question-banks/create">
              <Button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-lg transition-shadow">
                <Plus className="mr-2 h-4 w-4" />
                New Bank
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Banks</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
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
                <p className="text-sm text-muted-foreground">Total Questions</p>
                <p className="text-2xl font-bold">{stats.total_questions.toLocaleString()}</p>
              </div>
              <FileQuestion className="h-8 w-8 text-muted-foreground" />
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
                placeholder="Search banks by name, code, or description..."
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
              <option value="ARCHIVED">Archived</option>
            </SimpleSelect>
            <SimpleSelect 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-[150px]"
            >
              <option value="all">All Languages</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="en">English</option>
              <option value="ne">Nepali</option>
              <option value="zh">Chinese</option>
            </SimpleSelect>
            <SimpleSelect 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-[150px]"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="elementary">Elementary</option>
              <option value="intermediate">Intermediate</option>
              <option value="upper_intermediate">Upper Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </SimpleSelect>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Bank Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBanks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium">No question banks found</p>
                      <p className="text-sm text-muted-foreground">
                        Create your first question bank to get started
                      </p>
                      <Link href="/admin/question-banks/create">
                        <Button className="mt-4">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Question Bank
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredBanks.map((bank) => (
                  <TableRow key={bank.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{bank.name}</div>
                        {bank.description && (
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {bank.description}
                          </div>
                        )}
                        {bank.is_ai_generated && (
                          <Badge variant="secondary" className="mt-1">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI Generated
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{bank.code}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getLanguageFlag(bank.language)}</span>
                        <span>{bank.language?.toUpperCase()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {bank.difficulty && (
                        <Badge className={getDifficultyColor(bank.difficulty)}>
                          {bank.difficulty}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{bank.total_questions || 0}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(bank.status)}>
                        {bank.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getVisibilityIcon(bank.visibility)}
                        <span className="text-sm capitalize">{bank.visibility}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {new Date(bank.created_at).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          by {bank.creator?.full_name || 'Unknown'}
                        </span>
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
                            onClick={() => router.push(`/admin/question-banks/${bank.id}`)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push(`/admin/question-banks/${bank.id}/edit`)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Bank
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push(`/admin/question-banks/${bank.id}/questions`)}
                          >
                            <FileQuestion className="mr-2 h-4 w-4" />
                            Manage Questions
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(bank.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => {
                              setBankToDelete(bank);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Bank
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
            <DialogTitle>Delete Question Bank</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{bankToDelete?.name}"? 
              This action cannot be undone and will remove all questions in this bank.
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
              {deleting ? 'Deleting...' : 'Delete Bank'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}