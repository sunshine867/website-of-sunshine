'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatsCard from '@/components/dashboard/stats-card';
import ChartWidget from '@/components/dashboard/chart-widget';
import { Building2, Users, Globe, Server, Activity, Shield, TrendingUp } from 'lucide-react';

const orgData = [
  { name: 'Jan', organizations: 1, users: 150 },
  { name: 'Feb', organizations: 1, users: 280 },
  { name: 'Mar', organizations: 2, users: 450 },
  { name: 'Apr', organizations: 2, users: 620 },
  { name: 'May', organizations: 3, users: 850 },
  { name: 'Jun', organizations: 3, users: 1100 },
  { name: 'Jul', organizations: 4, users: 1350 },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Super Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">System-wide overview and management</p>
          </div>
          <Badge variant="success">System Healthy</Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Building2} label="Organizations" value="4" trend="+1" up color="bg-blue-500" />
        <StatsCard icon={Users} label="Total Users" value="1,350" trend="+18%" up color="bg-green-500" />
        <StatsCard icon={Server} label="Server Uptime" value="99.9%" trend="Stable" up color="bg-purple-500" />
        <StatsCard icon={Activity} label="API Requests" value="2.4M" trend="+12%" up color="bg-orange-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartWidget title="Platform Growth" type="area" data={orgData} dataKey="users" xKey="name" />
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> System Status</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Database', status: 'Operational', color: 'bg-green-500' },
              { label: 'Redis Cache', status: 'Operational', color: 'bg-green-500' },
              { label: 'Email Service', status: 'Operational', color: 'bg-green-500' },
              { label: 'File Storage', status: 'Operational', color: 'bg-green-500' },
              { label: 'AI Service', status: 'Degraded', color: 'bg-yellow-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-sm text-gray-500">{item.status}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
