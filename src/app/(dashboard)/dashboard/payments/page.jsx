'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApiQuery } from '@/hooks/use-api';
import { paymentsApi } from '@/lib/api/payments';
import { formatDate, formatCurrency } from '@/lib/utils';
import {
  CreditCard, Receipt, Download, ExternalLink,
  CheckCircle, Clock, XCircle, AlertCircle
} from 'lucide-react';

const statusConfig = {
  COMPLETED: { icon: CheckCircle, color: 'bg-green-100 text-green-700' },
  PENDING: { icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
  FAILED: { icon: XCircle, color: 'bg-red-100 text-red-700' },
  REFUNDED: { icon: AlertCircle, color: 'bg-blue-100 text-blue-700' },
};

export default function PaymentsPage() {
  const { data: paymentsData } = useApiQuery('payment-history', () => paymentsApi.getHistory());
  const { data: invoicesData } = useApiQuery('invoices', () => paymentsApi.getInvoices());

  const payments = paymentsData?.data?.data || [];
  const invoices = invoicesData?.data?.data || [];

  const totalPaid = payments
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.total_amount, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-gray-900">Payments</h1>
        <p className="text-gray-500 mt-1">View your payment history and invoices</p>
      </motion.div>

      {/* Summary Card */}
      <Card className="gradient-primary text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Total Paid</p>
              <p className="text-4xl font-extrabold">{formatCurrency(totalPaid)}</p>
            </div>
            <CreditCard className="h-16 w-16 text-white/50" />
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {payments.map((payment, i) => {
              const StatusIcon = statusConfig[payment.status]?.icon || Clock;
              const statusColor = statusConfig[payment.status]?.color || '';
              return (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${statusColor}`}>
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.payment_for}</p>
                      <p className="text-sm text-gray-500">
                        {payment.payment_method} • {formatDate(payment.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(payment.total_amount)}</p>
                    <Badge className={statusColor}>{payment.status}</Badge>
                  </div>
                </div>
              );
            })}
            {payments.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <CreditCard className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No payments yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {invoices.map((invoice, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <Receipt className="h-8 w-8 text-gray-400" />
                  <div>
                    <p className="font-medium">{invoice.invoice_number}</p>
                    <p className="text-sm text-gray-500">{formatDate(invoice.invoice_date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold">{formatCurrency(invoice.total)}</p>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
