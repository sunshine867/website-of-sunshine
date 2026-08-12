'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ChartWidget from '@/components/dashboard/chart-widget';
import { Server, Cpu, HardDrive, Database, Activity, Wifi } from 'lucide-react';

const cpuData = [
  { name: '00:00', value: 35 }, { name: '04:00', value: 28 }, { name: '08:00', value: 55 },
  { name: '12:00', value: 72 }, { name: '16:00', value: 65 }, { name: '20:00', value: 45 },
];

const memoryData = [
  { name: '00:00', value: 60 }, { name: '04:00', value: 58 }, { name: '08:00', value: 68 },
  { name: '12:00', value: 78 }, { name: '16:00', value: 75 }, { name: '20:00', value: 70 },
];

export default function SystemHealthPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">System Health</h1>
        <p className="text-gray-500 mt-1">Monitor system performance and resources</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Cpu, label: 'CPU Usage', value: '45%', color: 'bg-blue-500' },
          { icon: HardDrive, label: 'Memory', value: '72%', color: 'bg-green-500' },
          { icon: Database, label: 'Disk Space', value: '58%', color: 'bg-purple-500' },
          { icon: Wifi, label: 'Network', value: 'Normal', color: 'bg-orange-500' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}><CardContent className="p-6"><div className="flex items-center gap-4"><div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}><Icon className="h-5 w-5 text-white" /></div><div><p className="text-2xl font-bold">{stat.value}</p><p className="text-xs text-gray-500">{stat.label}</p></div></div></CardContent></Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartWidget title="CPU Usage (24h)" type="area" data={cpuData} dataKey="value" xKey="name" height={250} />
        <ChartWidget title="Memory Usage (24h)" type="area" data={memoryData} dataKey="value" xKey="name" height={250} />
      </div>

      <Card>
        <CardHeader><CardTitle>Service Status</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: 'API Server', status: 'Running', uptime: '15d 4h 32m', healthy: true },
            { name: 'Database', status: 'Connected', uptime: '15d 4h 30m', healthy: true },
            { name: 'Redis', status: 'Connected', uptime: '15d 4h 31m', healthy: true },
            { name: 'Queue Worker', status: 'Running', uptime: '15d 4h 28m', healthy: true },
            { name: 'File Storage', status: 'Connected', uptime: '15d 4h 29m', healthy: true },
          ].map((service, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${service.healthy ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{service.status}</span>
                <span>Uptime: {service.uptime}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
