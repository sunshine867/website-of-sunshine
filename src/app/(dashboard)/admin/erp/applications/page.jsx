'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApiQuery } from '@/hooks/use-api';
import { erpApi } from '@/lib/api/erp';
import { formatDate } from '@/lib/utils';
import SearchInput from '@/components/shared/search-input';
import StatusBadge from '@/components/shared/status-badge';
import EmptyState from '@/components/shared/empty-state';
import { FileCheck, Eye, Building2, Globe } from 'lucide-react';

export default function AdminApplicationsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: appData } = useApiQuery(['admin-applications', { search, status: statusFilter }],
    () => erpApi.getApplications({ search, status: statusFilter })
  );

  const applications = appData?.data?.data || [];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Applications</h1>
            <p className="text-gray-500 mt-1">Manage student applications</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Total', value: applications.length, color: 'bg-blue-500' },
          { label: 'Submitted', value: applications.filter(a => a.status === 'SUBMITTED').length, color: 'bg-yellow-500' },
          { label: 'Under Review', value: applications.filter(a => a.status === 'UNDER_REVIEW').length, color: 'bg-orange-500' },
          { label: 'Offer Received', value: applications.filter(a => a.status === 'OFFER_RECEIVED').length, color: 'bg-green-500' },
          { label: 'Rejected', value: applications.filter(a => a.status === 'REJECTED').length, color: 'bg-red-500' },
        ].map((stat, i) => (
          <Card key={i}><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{stat.value}</p><p className="text-xs text-gray-500">{stat.label}</p></CardContent></Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <SearchInput value={search} onChange={setSearch} placeholder="Search applications..." className="flex-1" />
            <select className="border rounded-lg px-3 py-2 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="OFFER_RECEIVED">Offer Received</option>
              <option value="OFFER_ACCEPTED">Offer Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {applications.length === 0 ? (
            <EmptyState icon={FileCheck} title="No applications found" description="Applications will appear here" />
          ) : (
            <div className="divide-y">
              {applications.map((app, i) => (
                <div key={app.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div>
                    <p className="font-medium">{app.student?.profile?.first_name} {app.student?.profile?.last_name}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {app.university?.name}</span>
                      <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> {app.university?.country?.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={app.status} />
                    <span className="text-xs text-gray-400">{formatDate(app.created_at)}</span>
                    <Link href={`/admin/erp/applications/${app.id}`}>
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                    </Link>
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
