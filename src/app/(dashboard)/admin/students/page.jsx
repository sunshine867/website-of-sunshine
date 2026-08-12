'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { userApi } from '@/lib/api/user';
import { getInitials, formatDate } from '@/lib/utils';
import SearchInput from '@/components/shared/search-input';
import { Search, Filter, Mail, Phone, BookOpen, Eye, Download, UserCheck, UserX } from 'lucide-react';

export default function AdminStudentPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const { data: studentsData } = useApiQuery(
    ['admin-students', { search, status: statusFilter, level: levelFilter }],
    () => userApi.getAll({ search, role: 'STUDENT', status: statusFilter, level: levelFilter })
  );

  const updateStatusMutation = useApiMutation(
    ({ id, status }) => userApi.updateStatus(id, status),
    { successMessage: 'Status updated', invalidateQueries: 'admin-students' }
  );

  const students = studentsData?.data?.data || [];
  const pagination = studentsData?.data?.meta?.pagination;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Student Management</h1>
            <p className="text-gray-500 mt-1">View and manage all students</p>
          </div>
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Total Students', value: students.length, color: 'bg-blue-500' },
          { label: 'Active', value: students.filter(s => s.enrollment_status === 'ACTIVE').length, color: 'bg-green-500' },
          { label: 'Completed', value: students.filter(s => s.enrollment_status === 'COMPLETED').length, color: 'bg-purple-500' },
          { label: 'On Hold', value: students.filter(s => s.enrollment_status === 'ON_HOLD').length, color: 'bg-yellow-500' },
          { label: 'Dropped', value: students.filter(s => s.enrollment_status === 'DROPPED').length, color: 'bg-red-500' },
        ].map((stat, i) => (
          <Card key={i}><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{stat.value}</p><p className="text-xs text-gray-500">{stat.label}</p></CardContent></Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <SearchInput value={search} onChange={setSearch} placeholder="Search students..." className="flex-1" />
            <select className="border rounded-lg px-3 py-2 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="DROPPED">Dropped</option>
            </select>
            <select className="border rounded-lg px-3 py-2 text-sm" value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
              <option value="all">All Levels</option>
              <option value="N5">N5</option>
              <option value="N4">N4</option>
              <option value="N3">N3</option>
              <option value="N2">N2</option>
              <option value="N1">N1</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Student</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Contact</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Level</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Progress</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Joined</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {students.map((student, i) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar><AvatarFallback>{getInitials(student.first_name, student.last_name)}</AvatarFallback></Avatar>
                        <span className="font-medium">{student.first_name} {student.last_name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-1"><Mail className="h-3 w-3" /> {student.email}</div>
                        {student.phone && <div className="flex items-center gap-1"><Phone className="h-3 w-3" /> {student.phone}</div>}
                      </div>
                    </td>
                    <td className="p-4"><Badge variant="outline">{student.current_level || 'N/A'}</Badge></td>
                    <td className="p-4">
                      <div className="w-24">
                        <Progress value={student.progress_percentage || 0} className="h-1.5" />
                        <p className="text-xs text-right mt-1">{student.progress_percentage || 0}%</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={student.enrollment_status === 'ACTIVE' ? 'success' : student.enrollment_status === 'COMPLETED' ? 'info' : 'secondary'}>
                        {student.enrollment_status || 'ACTIVE'}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{formatDate(student.created_at)}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        {student.status === 'ACTIVE' ? (
                          <Button variant="ghost" size="sm" onClick={() => updateStatusMutation.mutate({ id: student.id, status: 'SUSPENDED' })}><UserX className="h-4 w-4 text-yellow-600" /></Button>
                        ) : (
                          <Button variant="ghost" size="sm" onClick={() => updateStatusMutation.mutate({ id: student.id, status: 'ACTIVE' })}><UserCheck className="h-4 w-4 text-green-600" /></Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
