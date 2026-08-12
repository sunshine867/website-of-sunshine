'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building2, Plus, Users, Calendar, Edit, Trash2 } from 'lucide-react';

export default function SuperAdminOrganizationsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [orgName, setOrgName] = useState('');

  const organizations = [
    { id: 1, name: 'Japanese Education Kathmandu', users: 850, status: 'ACTIVE', created: '2026-01-01' },
    { id: 2, name: 'Japanese Education Pokhara', users: 320, status: 'ACTIVE', created: '2026-03-15' },
    { id: 3, name: 'Japanese Education Chitwan', users: 120, status: 'ACTIVE', created: '2026-05-20' },
    { id: 4, name: 'Japanese Education Bhaktapur', users: 60, status: 'SETUP', created: '2026-07-01' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Organizations</h1>
            <p className="text-gray-500 mt-1">Manage all organizations on the platform</p>
          </div>
          <Button variant="gradient" onClick={() => setShowCreate(true)}><Plus className="mr-2 h-4 w-4" /> Add Organization</Button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {organizations.map((org, i) => (
          <motion.div key={org.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <Building2 className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-1">{org.name}</h3>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {org.users}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {org.created}</span>
                </div>
                <Badge variant={org.status === 'ACTIVE' ? 'success' : 'warning'}>{org.status}</Badge>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1"><Edit className="mr-1 h-3 w-3" /> Edit</Button>
                  <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Organization</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium mb-1.5 block">Organization Name *</label><Input value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="Enter organization name" /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Admin Email *</label><Input type="email" placeholder="admin@organization.com" /></div>
            <Button variant="gradient" className="w-full" onClick={() => setShowCreate(false)}>Create Organization</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
