// apps/web/src/app/(dashboard)/admin/exams/[id]/results/page.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Search,
  Download,
  Eye,
  Award,
  Users,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  RefreshCw,
  Filter,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  Mail,
  Phone,
  Star,
  Medal,
  Trophy,
} from 'lucide-react';
import { api } from '@/lib/api';

export default function ExamResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState(null);
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalResults, setTotalResults] = useState(0);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Get exam details
      const examRes = await api.get(`/exams/${id}`);
      setExam(examRes.data);

      // Get results with filters
      const params = new URLSearchParams({
        page,
        limit,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedGrade !== 'all' && { grade: selectedGrade }),
        ...(selectedStatus !== 'all' && { status: selectedStatus }),
      });
      const resultsRes = await api.get(`/exams/${id}/results?${params}`);
      setResults(resultsRes.data.data || []);
      setTotalResults(resultsRes.data.pagination?.total || 0);

      // Get stats
      const statsRes = await api.get(`/exams/${id}/stats`);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to fetch results:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load results',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, page, searchTerm, selectedGrade, selectedStatus]);

  // Get grade color
  const getGradeColor = (grade) => {
    const colors = {
      A: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      B: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      C: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      D: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      F: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[grade] || colors.F;
  };

  // Get rank icon
  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
    return <Star className="h-5 w-5 text-muted-foreground" />;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Exam Results</h1>
            <p className="text-muted-foreground">
              {exam?.name} - {exam?.code}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{stats.totalStudents || 0}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Passed</p>
                <p className="text-2xl font-bold text-green-600">{stats.passed || 0}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600">{stats.failed || 0}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">
                  {stats.averageScore ? `${stats.averageScore}%` : 'N/A'}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grade Distribution */}
      {stats.gradeDistribution && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {Object.entries(stats.gradeDistribution).map(([grade, count]) => (
                <div key={grade} className="flex items-center gap-2">
                  <Badge className={getGradeColor(grade)}>
                    Grade {grade}
                  </Badge>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedGrade} onValueChange={setSelectedGrade}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            <SelectItem value="A">Grade A</SelectItem>
            <SelectItem value="B">Grade B</SelectItem>
            <SelectItem value="C">Grade C</SelectItem>
            <SelectItem value="D">Grade D</SelectItem>
            <SelectItem value="F">Grade F</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="passed">Passed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Results Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time Taken</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium">No results found</p>
                      <p className="text-sm text-muted-foreground">
                        No students have taken this exam yet
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                results.map((result, index) => (
                  <TableRow key={result.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getRankIcon(result.rank)}
                        <span className="font-medium">{result.rank || index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{result.student?.full_name || 'Unknown'}</div>
                        <div className="text-sm text-muted-foreground">
                          {result.student?.email || 'No email'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {result.obtained_marks || 0} / {result.total_marks || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {result.percentage || 0}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {result.grade && (
                        <Badge className={getGradeColor(result.grade)}>
                          Grade {result.grade}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={result.is_passed ? 'default' : 'destructive'}
                        className={result.is_passed ? 'bg-green-600' : 'bg-red-600'}
                      >
                        {result.is_passed ? 'Passed' : 'Failed'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {Math.floor((result.time_taken_seconds || 0) / 60)}m 
                          {(result.time_taken_seconds || 0) % 60}s
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(result.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setSelectedResult(result);
                          setDetailDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalResults > limit && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalResults)} of {totalResults} results
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
              disabled={page * limit >= totalResults}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Result Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Result Details</DialogTitle>
            <DialogDescription>
              Detailed breakdown of student's performance
            </DialogDescription>
          </DialogHeader>
          {selectedResult && (
            <div className="space-y-4">
              {/* Student Info */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{selectedResult.student?.full_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedResult.student?.email}
                    </p>
                  </div>
                  <Badge
                    variant={selectedResult.is_passed ? 'default' : 'destructive'}
                    className={selectedResult.is_passed ? 'bg-green-600' : 'bg-red-600'}
                  >
                    {selectedResult.is_passed ? 'Passed' : 'Failed'}
                  </Badge>
                </div>
              </div>

              {/* Score Overview */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Score</p>
                    <p className="text-2xl font-bold">
                      {selectedResult.obtained_marks || 0} / {selectedResult.total_marks || 0}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Percentage</p>
                    <p className="text-2xl font-bold">
                      {selectedResult.percentage || 0}%
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Grade</p>
                    <p className="text-2xl font-bold">
                      {selectedResult.grade || 'N/A'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Stats Breakdown */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Correct</p>
                    <p className="font-semibold">{selectedResult.correct_count || 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Wrong</p>
                    <p className="font-semibold">{selectedResult.wrong_count || 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time Taken</p>
                    <p className="font-semibold">
                      {Math.floor((selectedResult.time_taken_seconds || 0) / 60)}m 
                      {(selectedResult.time_taken_seconds || 0) % 60}s
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Scores */}
              {selectedResult.section_scores && (
                <div>
                  <h4 className="font-medium mb-3">Section Scores</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedResult.section_scores).map(([section, score]) => (
                      <div key={section} className="flex items-center justify-between p-2 border rounded">
                        <span className="capitalize">{section.replace('_', ' ')}</span>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{score}%</span>
                          <Progress value={score} className="w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Teacher Feedback */}
              {selectedResult.teacher_feedback && (
                <div>
                  <h4 className="font-medium mb-3">Teacher Feedback</h4>
                  <Card>
                    <CardContent className="p-4">
                      <p>{selectedResult.teacher_feedback}</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
                  Close
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}