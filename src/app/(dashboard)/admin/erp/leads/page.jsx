'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { erpApi } from '@/lib/api/erp';
import { formatDate } from '@/lib/utils';
import SearchInput from '@/components/shared/search-input';
import StatusBadge from '@/components/shared/status-badge';
import EmptyState from '@/components/shared/empty-state';
import { Plus, Phone, Mail, Edit, Trash2, Users, Filter } from 'lucide-react';

const statusOptions = ['NEW', 'CONTACTED', 'INTERESTED', 'NOT_INTERESTED', 'CONVERTED'];
const sourceOptions = ['WEBSITE', 'FACEBOOK', 'INSTAGRAM', 'REFERRAL', 'WALK_IN', 'EVENT', 'OTHER'];

export default function AdminLeadsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast } = useToast();

  const { data: leadsData } = useApiQuery(['admin-leads', { search, status: statusFilter }], 
    () => erpApi.getLeads({ search, status: statusFilter })
  );

  const deleteMutation = useApiMutation(
    (id) => erpApi.deleteLead(id),
    { successMessage: 'Lead deleted', invalidateQueries: 'admin-leads' }
  );

  const leads = leadsData?.data?.data || [];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Lead Management</h1>
            <p className="text-gray-500 mt-1">Manage prospective student leads</p>
          </div>
          <Button variant="gradient" onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Lead
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Total Leads', value: leads.length, color: 'bg-blue-500' },
          { label: 'New', value: leads.filter(l => l.status === 'NEW').length, color: 'bg-yellow-500' },
          { label: 'Contacted', value: leads.filter(l => l.status === 'CONTACTED').length, color: 'bg-orange-500' },
          { label: 'Interested', value: leads.filter(l => l.status === 'INTERESTED').length, color: 'bg-green-500' },
          { label: 'Converted', value: leads.filter(l => l.status === 'CONVERTED').length, color: 'bg-purple-500' },
        ].map((stat, i) => (
          <Card key={i}><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{stat.value}</p><p className="text-xs text-gray-500">{stat.label}</p></CardContent></Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <SearchInput value={search} onChange={setSearch} placeholder="Search leads..." className="flex-1" />
            <select className="border rounded-lg px-3 py-2 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              {statusOptions.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {leads.length === 0 ? (
            <EmptyState icon={Users} title="No leads found" description="Add your first lead to get started" actionLabel="Add Lead" onAction={() => setShowCreateDialog(true)} />
          ) : (
            <div className="divide-y">
              {leads.map((lead, i) => (
                <div key={lead.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div>
                    <p className="font-medium">{lead.first_name} {lead.last_name}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{lead.source}</Badge>
                    <StatusBadge status={lead.status} />
                    <span className="text-xs text-gray-400">{formatDate(lead.created_at)}</span>
                    <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(lead.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
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
