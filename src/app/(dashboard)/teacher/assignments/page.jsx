'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FileUpload from '@/components/shared/file-upload';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ClipboardList, Plus, Clock, CheckCircle, FileText, Upload, Eye, Calendar } from 'lucide-react';

export default function AssignmentsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const { toast } = useToast();

  const assignments = [
    { id: 1, title: 'Write a paragraph about your family in Japanese', course: 'JLPT N5', dueDate: '2026-08-15', status: 'PENDING', maxScore: 100, submissions: 18 },
    { id: 2, title: 'Kanji writing practice - Set 1', course: 'JLPT N4', dueDate: '2026-08-10', status: 'SUBMITTED', score: 85, maxScore: 100 },
    { id: 3, title: 'Listening comprehension exercise', course: 'JLPT N4', dueDate: '2026-08-05', status: 'GRADED', score: 92, maxScore: 100 },
    { id: 4, title: 'Grammar worksheet - Particles', course: 'JLPT N5', dueDate: '2026-07-30', status: 'GRADED', score: 78, maxScore: 100 },
    { id: 5, title: 'Speaking practice recording', course: 'JLPT N3', dueDate: '2026-08-20', status: 'PENDING', maxScore: 100, submissions: 12 },
  ];

  const handleCreateAssignment = () => {
    toast({ title: 'Created!', description: 'Assignment created successfully.' });
    setShowCreate(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Assignments</h1>
            <p className="text-gray-500 mt-1">Manage and submit assignments</p>
          </div>
          <Button variant="gradient" onClick={() => setShowCreate(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Assignment
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: assignments.length, color: 'bg-blue-500' },
          { label: 'Pending', value: assignments.filter(a => a.status === 'PENDING').length, color: 'bg-yellow-500' },
          { label: 'Submitted', value: assignments.filter(a => a.status === 'SUBMITTED').length, color: 'bg-green-500' },
          { label: 'Graded', value: assignments.filter(a => a.status === 'GRADED').length, color: 'bg-purple-500' },
        ].map((stat, i) => (
          <Card key={i}><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{stat.value}</p><p className="text-xs text-gray-500">{stat.label}</p></CardContent></Card>
        ))}
      </div>

      <div className="space-y-4">
        {assignments.map((assignment, i) => (
          <motion.div key={assignment.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      assignment.status === 'GRADED' ? 'bg-green-100' :
                      assignment.status === 'SUBMITTED' ? 'bg-blue-100' : 'bg-yellow-100'
                    }`}>
                      <ClipboardList className={`h-6 w-6 ${
                        assignment.status === 'GRADED' ? 'text-green-600' :
                        assignment.status === 'SUBMITTED' ? 'text-blue-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{assignment.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {assignment.course}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Due: {assignment.dueDate}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Max: {assignment.maxScore} pts</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      assignment.status === 'GRADED' ? 'success' :
                      assignment.status === 'SUBMITTED' ? 'default' : 'warning'
                    }>
                      {assignment.status}
                    </Badge>
                    {assignment.score && (
                      <p className="text-lg font-bold text-primary-600 mt-2">{assignment.score}/{assignment.maxScore}</p>
                    )}
                    {assignment.submissions !== undefined && (
                      <p className="text-sm text-gray-500 mt-1">{assignment.submissions} submissions</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  {assignment.status === 'PENDING' ? (
                    <>
                      <Button variant="gradient" size="sm"><Upload className="mr-1 h-4 w-4" /> Submit</Button>
                      <Button variant="outline" size="sm"><Eye className="mr-1 h-4 w-4" /> View Details</Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm"><Eye className="mr-1 h-4 w-4" /> View Submission</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Create Assignment</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium mb-1.5 block">Title *</label><Input placeholder="Assignment title" /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Course *</label><select className="w-full h-11 rounded-lg border-2 px-4"><option>JLPT N5</option><option>JLPT N4</option><option>JLPT N3</option></select></div>
            <div><label className="text-sm font-medium mb-1.5 block">Instructions</label><Textarea placeholder="Assignment instructions..." className="min-h-[100px]" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium mb-1.5 block">Due Date</label><Input type="date" /></div>
              <div><label className="text-sm font-medium mb-1.5 block">Max Score</label><Input type="number" defaultValue="100" /></div>
            </div>
            <FileUpload label="Attach files (optional)" />
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button variant="gradient" onClick={handleCreateAssignment}>Create Assignment</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
