'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useApiQuery } from '@/hooks/use-api';
import { analyticsApi } from '@/lib/api/analytics';
import { paymentsApi } from '@/lib/api/payments';
import { formatDate, formatCurrency } from '@/lib/utils';
import {
  DollarSign, TrendingUp, TrendingDown, CreditCard,
  Search, Download, Filter, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#2563EB', '#0EA5E9', '#7C3AED', '#10B981', '#F59E0B'];

export default function AdminFinancePage() {
  const [dateRange, setDateRange] = useState('month');
  const [search, setSearch] = useState('');

  const { data: revenueData } = useApiQuery(
    ['revenue', dateRange],
    () => analyticsApi.getRevenueAnalytics({ period: dateRange })
  );

  const { data: transactionsData } = useApiQuery(
    ['transactions', search],
    () => paymentsApi.getAllTransactions({ search })
  );

  const revenue = revenueData?.data || [];
  const transactions = transactionsData?.data?.data || [];

  const totalRevenue = revenue.reduce((s, r) => s + (r.total_revenue || 0), 0);
  const totalTransactions = transactions.length;
  const successfulTransactions = transactions.filter(t => t.status === 'COMPLETED').length;
  const refundedAmount = transactions.filter(t => t.status === 'REFUNDED').reduce((s, t) => s + t.total_amount, 0);

  const paymentMethodData = transactions.reduce((acc, t) => {
    if (!acc[t.payment_method]) acc[t.payment_method] = 0;
    acc[t.payment_method] += t.total_amount;
    return acc;
  }, {});

  const pieData = Object.entries(paymentMethodData).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Finance Dashboard</h1>
            <p className="text-gray-500 mt-1">Monitor revenue and transactions</p>
          </div>
          <div className="flex gap-2">
            <select
              className="border rounded-lg px-3 py-2 text-sm"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'bg-green-500', trend: '+12%', up: true },
          { label: 'Transactions', value: totalTransactions, icon: CreditCard, color: 'bg-blue-500', trend: '+8%', up: true },
          { label: 'Success Rate', value: totalTransactions > 0 ? Math.round((successfulTransactions / totalTransactions) * 100) + '%' : '0%', icon: TrendingUp, color: 'bg-purple-500', trend: '+3%', up: true },
          { label: 'Refunded', value: formatCurrency(refundedAmount), icon: TrendingDown, color: 'bg-red-500', trend: '-2%', up: false },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={`text-xs font-medium flex items-center gap-1 ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="total_revenue" stroke="#2563EB" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Transaction</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Amount</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Method</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {transactions.slice(0, 10).map((transaction, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-medium">{transaction.payment_for}</p>
                      <p className="text-sm text-gray-500">{transaction.payment_number}</p>
                    </td>
                    <td className="p-4 font-bold">{formatCurrency(transaction.total_amount)}</td>
                    <td className="p-4">
                      <Badge variant="outline">{transaction.payment_method}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={
                        transaction.status === 'COMPLETED' ? 'success' :
                        transaction.status === 'PENDING' ? 'warning' :
                        transaction.status === 'REFUNDED' ? 'info' : 'danger'
                      }>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{formatDate(transaction.created_at)}</td>
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
