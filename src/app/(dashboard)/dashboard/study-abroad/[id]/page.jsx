'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApiQuery } from '@/hooks/use-api';
import { erpApi } from '@/lib/api/erp';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import {
  ArrowLeft, Building2, Globe, MapPin, Calendar,
  FileCheck, Clock, CheckCircle, XCircle, AlertCircle,
  Download, ExternalLink
} from 'lucide-react';

const statusConfig = {
  DRAFT: { icon: Clock, color: 'bg-gray-100 text-gray-700', label: 'Draft' },
  SUBMITTED: { icon: FileCheck, color: 'bg-blue-100 text-blue-700', label: 'Submitted' },
  UNDER_REVIEW: { icon: AlertCircle, color: 'bg-yellow-100 text-yellow-700', label: 'Under Review' },
  OFFER_RECEIVED: { icon: CheckCircle, color: 'bg-green-100 text-green-700', label: 'Offer Received' },
  OFFER_ACCEPTED: { icon: CheckCircle, color: 'bg-green-200 text-green-800', label: 'Offer Accepted' },
  REJECTED: { icon: XCircle, color: 'bg-red-100 text-red-700', label: 'Rejected' },
  DEFERRED: { icon: Clock, color: 'bg-orange-100 text-orange-700', label: 'Deferred' },
};

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const { data: appData, isLoading } = useApiQuery(
    ['application', id],
    () => erpApi.getApplication(id)
  );

  const application = appData?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-16">
        <XCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-500">Application not found</h2>
        <Link href="/dashboard/study-abroad">
          <Button variant="gradient" className="mt-4">Back to Applications</Button>
        </Link>
      </div>
    );
  }

  const StatusIcon = statusConfig[application.status]?.icon || Clock;
  const statusColor = statusConfig[application.status]?.color || '';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/dashboard/study-abroad" className="inline-flex items-center text-gray-500 hover:text-gray-700">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Applications
      </Link>

      {/* Application Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">
                  🏛️
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold">{application.university?.name}</h1>
                    <Badge className={statusColor}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusConfig[application.status]?.label}
                    </Badge>
                  </div>
                  <p className="text-gray-500">{application.program_name}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Globe className="h-4 w-4" /> {application.university?.country?.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {application.university?.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Intake: {application.intake_date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <p className="text-gray-500">Application #</p>
                <p className="font-mono font-bold">{application.application_number}</p>
                <p className="text-gray-500 mt-2">Submitted</p>
                <p>{formatDate(application.submitted_at || application.created_at)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Application Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: 'Application Created', date: application.created_at, done: true },
              { label: 'Submitted', date: application.submitted_at, done: !!application.submitted_at },
              { label: 'Under Review', date: null, done: application.status === 'UNDER_REVIEW' || ['OFFER_RECEIVED', 'OFFER_ACCEPTED'].includes(application.status) },
              { label: 'Offer Received', date: application.offer_received_at, done: !!application.offer_received_at },
              { label: 'Offer Accepted', date: application.offer_accepted_at, done: !!application.offer_accepted_at },
              { label: 'Visa Applied', date: application.visa?.created_at, done: !!application.visa },
              { label: 'Visa Approved', date: application.visa?.decision_date, done: application.visa?.status === 'APPROVED' },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.done ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step.done ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                  {step.date && (
                    <p className="text-sm text-gray-500">{formatDate(step.date)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {application.documents?.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileCheck className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="font-medium">{doc.document_type}</p>
                    <p className="text-sm text-gray-500">{doc.document_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    doc.status === 'VERIFIED' ? 'success' :
                    doc.status === 'REJECTED' ? 'danger' : 'warning'
                  }>
                    {doc.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {(!application.documents || application.documents.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <FileCheck className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No documents uploaded yet</p>
                <Button variant="outline" size="sm" className="mt-3">Upload Document</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Visa Status */}
      {application.visa && (
        <Card>
          <CardHeader>
            <CardTitle>Visa Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                application.visa.status === 'APPROVED' ? 'bg-green-100' :
                application.visa.status === 'REJECTED' ? 'bg-red-100' : 'bg-yellow-100'
              }`}>
                {application.visa.status === 'APPROVED' ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : application.visa.status === 'REJECTED' ? (
                  <XCircle className="h-6 w-6 text-red-600" />
                ) : (
                  <Clock className="h-6 w-6 text-yellow-600" />
                )}
              </div>
              <div>
                <p className="font-bold text-lg">{application.visa.status}</p>
                <p className="text-sm text-gray-500">
                  Visa Type: {application.visa.visa_type} | Country: {application.visa.country_code}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Travel Arrangements */}
      {application.travel && (
        <Card>
          <CardHeader>
            <CardTitle>Travel Arrangements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Airline</p>
                <p className="font-medium">{application.travel.airline || 'TBD'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Flight</p>
                <p className="font-medium">{application.travel.flight_number || 'TBD'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Departure</p>
                <p className="font-medium">{application.travel.departure_date ? formatDate(application.travel.departure_date) : 'TBD'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Arrival</p>
                <p className="font-medium">{application.travel.arrival_date ? formatDate(application.travel.arrival_date) : 'TBD'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}