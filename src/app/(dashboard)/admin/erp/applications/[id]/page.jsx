'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApiQuery } from '@/hooks/use-api';
import { erpApi } from '@/lib/api/erp';
import { formatDate } from '@/lib/utils';
import StatusBadge from '@/components/shared/status-badge';
import { ArrowLeft, Building2, Globe, MapPin, Calendar, User, Mail, Phone, FileCheck, Download } from 'lucide-react';

export default function AdminApplicationDetailPage() {
  const { id } = useParams();
  const { data: appData, isLoading } = useApiQuery(['admin-application', id], () => erpApi.getApplication(id));
  const application = appData?.data;

  if (isLoading) return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" /></div>;
  if (!application) return <div className="text-center py-16"><h2 className="text-xl font-bold text-gray-500">Application not found</h2><Link href="/admin/erp/applications"><Button variant="gradient" className="mt-4">Back</Button></Link></div>;

  const student = application.student?.profile;
  const university = application.university;
  const documents = application.documents || [];
  const visa = application.visa;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link href="/admin/erp/applications" className="inline-flex items-center text-gray-500 hover:text-gray-700"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">🏛️</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold">{university?.name}</h1>
                    <StatusBadge status={application.status} />
                  </div>
                  <p className="text-gray-500">{application.program_name}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> {university?.country?.name}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {university?.city}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {application.intake_date}</span>
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <p className="text-gray-500">Application #</p>
                <p className="font-mono font-bold">{application.application_number}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Student Information</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><p className="text-sm text-gray-500">Name</p><p className="font-medium">{student?.first_name} {student?.last_name}</p></div>
            <div><p className="text-sm text-gray-500">Email</p><p className="font-medium flex items-center gap-1"><Mail className="h-4 w-4" /> {student?.email}</p></div>
            <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium flex items-center gap-1"><Phone className="h-4 w-4" /> {student?.phone}</p></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><FileCheck className="h-5 w-5" /> Documents</CardTitle></CardHeader>
          <CardContent>
            {documents.length === 0 ? <p className="text-gray-500 text-sm">No documents uploaded</p> : (
              <div className="space-y-2">
                {documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{doc.document_type}</p>
                      <p className="text-xs text-gray-500">{doc.document_name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={doc.status} />
                      <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {visa && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" /> Visa Information</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div><p className="text-sm text-gray-500">Status</p><StatusBadge status={visa.status} /></div>
              <div><p className="text-sm text-gray-500">Type</p><p className="font-medium">{visa.visa_type}</p></div>
              <div><p className="text-sm text-gray-500">Country</p><p className="font-medium">{visa.country_code}</p></div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}