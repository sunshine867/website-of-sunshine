'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useApiQuery } from '@/hooks/use-api';
import { erpApi } from '@/lib/api/erp';
import { formatDate } from '@/lib/utils';
import {
  Users, FileCheck, Building2, Globe, Search,
  Phone, Mail, ArrowRight, Plus
} from 'lucide-react';

export default function AdminERPPage() {
  const [activeTab, setActiveTab] = useState('leads');
  const [search, setSearch] = useState('');

  const leads = [
    { id: 1, name: 'Rajesh Hamal', email: 'rajesh@email.com', phone: '9841XXXXXX', country: 'Japan', source: 'WEBSITE', status: 'NEW', date: '2026-07-20' },
    { id: 2, name: 'Anita Sharma', email: 'anita@email.com', phone: '9842XXXXXX', country: 'USA', source: 'FACEBOOK', status: 'CONTACTED', date: '2026-07-19' },
    { id: 3, name: 'Bikram Thapa', email: 'bikram@email.com', phone: '9843XXXXXX', country: 'Australia', source: 'REFERRAL', status: 'INTERESTED', date: '2026-07-18' },
  ];

  const applications = [
    { id: 1, student: 'Ram Sharma', university: 'University of Tokyo', country: 'Japan', program: 'Computer Science', status: 'UNDER_REVIEW', date: '2026-07-15' },
    { id: 2, student: 'Sita Poudel', university: 'Kyoto University', country: 'Japan', program: 'Business', status: 'OFFER_RECEIVED', date: '2026-07-10' },
    { id: 3, student: 'Hari Thapa', university: 'Sydney University', country: 'Australia', program: 'Engineering', status: 'SUBMITTED', date: '2026-07-05' },
  ];

  const statusColors = {
    NEW: 'bg-blue-100 text-blue-700',
    CONTACTED: 'bg-yellow-100 text-yellow-700',
    INTERESTED: 'bg-green-100 text-green-700',
    NOT_INTERESTED: 'bg-red-100 text-red-700',
    CONVERTED: 'bg-purple-100 text-purple-700',
    SUBMITTED: 'bg-blue-100 text-blue-700',
    UNDER_REVIEW: 'bg-yellow-100 text-yellow-700',
    OFFER_RECEIVED: 'bg-green-100 text-green-700',
    OFFER_ACCEPTED: 'bg-green-200 text-green-800',
    REJECTED: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">ERP Management</h1>
            <p className="text-gray-500 mt-1">Manage leads, applications, and universities</p>
          </div>
          <Button variant="gradient">
            <Plus className="mr-2 h-4 w-4" /> Add Lead
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: leads.length, icon: Users, color: 'bg-blue-500' },
          { label: 'Applications', value: applications.length, icon: FileCheck, color: 'bg-green-500' },
          { label: 'Universities', value: '50+', icon: Building2, color: 'bg-purple-500' },
          { label: 'Countries', value: '8', icon: Globe, color: 'bg-orange-500' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="universities">Universities</TabsTrigger>
          <TabsTrigger value="visa">Visa Processing</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="mt-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search leads..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {leads.filter(l => l.name.toLowerCase().includes(search.toLowerCase())).map((lead, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{lead.country}</Badge>
                      <Badge>{lead.source}</Badge>
                      <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
                      <span className="text-xs text-gray-500">{formatDate(lead.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {applications.map((app, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div>
                      <p className="font-medium">{app.student}</p>
                      <p className="text-sm text-gray-500">{app.university} - {app.program}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{app.country}</Badge>
                      <Badge className={statusColors[app.status]}>{app.status}</Badge>
                      <span className="text-xs text-gray-500">{formatDate(app.date)}</span>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="universities" className="mt-6">
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>University management - add, edit, and manage partner universities</p>
              <Button variant="gradient" className="mt-4">
                <Plus className="mr-2 h-4 w-4" /> Add University
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visa" className="mt-6">
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <Globe className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Visa processing - track and manage student visa applications</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
