'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useApiQuery } from '@/hooks/use-api';
import { analyticsApi } from '@/lib/api/analytics';
import { formatDate } from '@/lib/utils';
import { Search, Shield, Filter, Eye } from 'lucide-react';

export default function AdminAuditPage() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const { data: auditData } = useApiQuery(['audit-logs', { search, action: actionFilter }],
    () => analyticsApi.getAuditLogs({ search, action: actionFilter })
  );

  const logs = auditData?.data?.data || [];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">Audit Logs</h1>
        <p className="text-gray-500 mt-1">Track all system activities and changes</p>
      </motion.div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search audit logs..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="border rounded-lg px-3 py-2 text-sm" value={actionFilter} onChange={(e) => setActionFilter(e.target.value)}>
              <option value="all">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="LOGIN">Login</option>
              <option value="LOGOUT">Logout</option>
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
                  <th className="text-left p-4 text-sm font-medium text-gray-500">User</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Action</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Entity</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">IP Address</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-500">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {logs.map((log, i) => (
                  <tr key={log.id || i} className="hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-medium text-sm">{log.performer?.first_name} {log.performer?.last_name}</p>
                      <p className="text-xs text-gray-500">{log.performer?.role}</p>
                    </td>
                    <td className="p-4"><Badge variant="outline">{log.action}</Badge></td>
                    <td className="p-4 text-sm">{log.entity_type}</td>
                    <td className="p-4 text-sm text-gray-500">{log.ip_address}</td>
                    <td className="p-4 text-sm text-gray-500">{formatDate(log.created_at)}</td>
                    <td className="p-4 text-right">
                      <button className="text-primary-600 hover:text-primary-700"><Eye className="h-4 w-4" /></button>
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
