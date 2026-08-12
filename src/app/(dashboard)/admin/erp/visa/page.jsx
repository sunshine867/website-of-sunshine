'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApiQuery } from '@/hooks/use-api';
import { formatDate } from '@/lib/utils';
import SearchInput from '@/components/shared/search-input';
import StatusBadge from '@/components/shared/status-badge';
import EmptyState from '@/components/shared/empty-state';
import { Globe, Eye } from 'lucide-react';

export default function AdminVisaPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock visa data
  const visas = [
    { id: 1, student: 'Ram Sharma', country: 'Japan', type: 'Student', status: 'APPROVED', date: '2026-07-15' },
    { id: 2, student: 'Sita Poudel', country: 'Japan', type: 'Student', status: 'UNDER_REVIEW', date: '2026-07-10' },
    { id: 3, student: 'Hari Thapa', country: 'Australia', type: 'Student', status: 'PENDING', date: '2026-07-05' },
    { id: 4, student: 'Gita Devi', country: 'USA', type: 'Student', status: 'REJECTED', date: '2026-06-28' },
  ];

  const filtered = visas.filter(v => {
    const matchesSearch = v.student.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">Visa Processing</h1>
        <p className="text-gray-500 mt-1">Track student visa applications</p>
      </motion.div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: visas.length, color: 'bg-blue-500' },
          { label: 'Approved', value: visas.filter(v => v.status === 'APPROVED').length, color: 'bg-green-500' },
          { label: 'Under Review', value: visas.filter(v => v.status === 'UNDER_REVIEW').length, color: 'bg-yellow-500' },
          { label: 'Rejected', value: visas.filter(v => v.status === 'REJECTED').length, color: 'bg-red-500' },
        ].map((stat, i) => (
          <Card key={i}><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{stat.value}</p><p className="text-xs text-gray-500">{stat.label}</p></CardContent></Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <SearchInput value={search} onChange={setSearch} placeholder="Search by student name..." className="flex-1" />
            <select className="border rounded-lg px-3 py-2 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <EmptyState icon={Globe} title="No visa applications found" />
          ) : (
            <div className="divide-y">
              {filtered.map((visa, i) => (
                <div key={visa.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div>
                    <p className="font-medium">{visa.student}</p>
                    <p className="text-sm text-gray-500">{visa.type} Visa - {visa.country}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={visa.status} />
                    <span className="text-xs text-gray-400">{formatDate(visa.date)}</span>
                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
