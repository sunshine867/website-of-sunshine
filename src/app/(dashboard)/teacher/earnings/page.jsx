'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { DollarSign, TrendingUp, Download, CreditCard, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const earningsData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 61000 },
  { month: 'May', amount: 55000 },
  { month: 'Jun', amount: 72000 },
  { month: 'Jul', amount: 68000 },
];

const transactions = [
  { id: 1, student: 'Ram Sharma', course: 'JLPT N5', amount: 15000, date: '2026-07-15', status: 'COMPLETED' },
  { id: 2, student: 'Sita Poudel', course: 'JLPT N4', amount: 18000, date: '2026-07-14', status: 'COMPLETED' },
  { id: 3, student: 'Hari Thapa', course: 'JLPT N3', amount: 22000, date: '2026-07-12', status: 'COMPLETED' },
  { id: 4, student: 'Gita Devi', course: 'JLPT N5', amount: 15000, date: '2026-07-10', status: 'PENDING' },
  { id: 5, student: 'Krishna Rai', course: 'JLPT N2', amount: 28000, date: '2026-07-08', status: 'COMPLETED' },
];

export default function TeacherEarningsPage() {
  const totalEarnings = transactions.filter(t => t.status === 'COMPLETED').reduce((s, t) => s + t.amount, 0);
  const pendingEarnings = transactions.filter(t => t.status === 'PENDING').reduce((s, t) => s + t.amount, 0);
  const thisMonth = transactions.filter(t => {
    const d = new Date(t.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && t.status === 'COMPLETED';
  }).reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Earnings</h1>
            <p className="text-gray-500 mt-1">Track your income and payouts</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Earnings', value: formatCurrency(totalEarnings), icon: DollarSign, color: 'bg-green-500' },
          { label: 'This Month', value: formatCurrency(thisMonth), icon: TrendingUp, color: 'bg-blue-500' },
          { label: 'Pending', value: formatCurrency(pendingEarnings), icon: CreditCard, color: 'bg-yellow-500' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(value) => `NPR ${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {transactions.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{t.student}</p>
                    <p className="text-sm text-gray-500">{t.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">+{formatCurrency(t.amount)}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{formatDate(t.date)}</span>
                    <Badge variant={t.status === 'COMPLETED' ? 'success' : 'warning'} className="text-xs">
                      {t.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
