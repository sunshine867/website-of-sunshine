'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiQuery } from '@/hooks/use-api';
import { erpApi } from '@/lib/api/erp';
import StatsCard from '@/components/dashboard/stats-card';
import ChartWidget from '@/components/dashboard/chart-widget';
import RecentActivity from '@/components/dashboard/recent-activity';
import { Users, UserCheck, UserPlus, TrendingUp, Phone, Target } from 'lucide-react';

export default function AdminCRMPage() {
  const { data: stats } = useApiQuery('crm-stats', () => erpApi.getDashboardStats());

  const leadData = [
    { name: 'Mon', leads: 12, converted: 3 },
    { name: 'Tue', leads: 19, converted: 5 },
    { name: 'Wed', leads: 15, converted: 4 },
    { name: 'Thu', leads: 22, converted: 7 },
    { name: 'Fri', leads: 18, converted: 6 },
    { name: 'Sat', leads: 8, converted: 2 },
    { name: 'Sun', leads: 5, converted: 1 },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">CRM Dashboard</h1>
        <p className="text-gray-500 mt-1">Customer relationship management overview</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Users} label="Total Leads" value={stats?.totalLeads || 0} trend="+12%" up color="bg-blue-500" />
        <StatsCard icon={UserPlus} label="New This Week" value="24" trend="+8%" up color="bg-green-500" />
        <StatsCard icon={Target} label="Conversion Rate" value="32%" trend="+5%" up color="bg-purple-500" />
        <StatsCard icon={Phone} label="Follow-ups Due" value="15" trend="+3" up={false} color="bg-orange-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartWidget title="Lead Generation" type="bar" data={leadData} dataKey="leads" xKey="name" />
        <RecentActivity activities={[
          { user: 'Rajesh Hamal', action: 'New lead created', type: 'registration', time: '2 min ago' },
          { user: 'Anita Sharma', action: 'Contacted by counselor', type: 'enrollment', time: '15 min ago' },
          { user: 'Bikram Thapa', action: 'Application submitted', type: 'application', time: '1 hour ago' },
          { user: 'Sita Poudel', action: 'Payment received NPR 18,000', type: 'payment', time: '2 hours ago' },
          { user: 'Hari Thapa', action: 'Visa application filed', type: 'application', time: '3 hours ago' },
        ]} />
      </div>
    </div>
  );
}
