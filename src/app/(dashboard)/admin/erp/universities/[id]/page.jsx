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
import { ArrowLeft, Globe, MapPin, Star, Users, Building2, Calendar, Phone, Mail, ExternalLink } from 'lucide-react';

export default function UniversityDetailPage() {
  const { id } = useParams();
  const { data: uniData } = useApiQuery(['university', id], () => erpApi.getUniversity(id));
  const university = uniData?.data;

  if (!university) return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link href="/admin/erp/universities" className="inline-flex items-center text-gray-500 hover:text-gray-700"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-6xl">🏛️</div>
          <CardContent className="p-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{university.name}</h1>
                  <Badge variant="success">{university.university_type}</Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> {university.country?.name}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {university.city}, {university.state}</span>
                  <span className="flex items-center gap-1"><Star className="h-4 w-4" /> World Rank #{university.world_ranking}</span>
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {university.total_students?.toLocaleString()} Students</span>
                </div>
              </div>
              <Button variant="gradient"><ExternalLink className="mr-2 h-4 w-4" /> Visit Website</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Quick Info</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-gray-500">Established</span><span className="font-medium">{university.established_year}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Type</span><Badge variant="outline">{university.university_type}</Badge></div>
            <div className="flex justify-between"><span className="text-gray-500">Int'l Students</span><span className="font-medium">{university.international_students?.toLocaleString()}</span></div>
            {university.scholarship_available && <div className="flex justify-between"><span className="text-gray-500">Scholarship</span><Badge variant="success">Available</Badge></div>}
            {university.accommodation_available && <div className="flex justify-between"><span className="text-gray-500">Accommodation</span><Badge variant="success">Available</Badge></div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {university.email && <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-gray-400" />{university.email}</div>}
            {university.phone && <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-gray-400" />{university.phone}</div>}
            {university.website_url && <div className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-gray-400" />{university.website_url}</div>}
            {university.address && <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-gray-400" />{university.address}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Programs & Fees</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-gray-500">Programs</span><span className="font-medium">{university.available_programs?.length || 0}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Avg Tuition</span><span className="font-medium">{university.average_tuition_fee?.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Application Fee</span><span className="font-medium">{university.application_fee?.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Intake Months</span><span className="font-medium">{university.intake_months?.join(', ') || 'N/A'}</span></div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Popular Majors</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(university.popular_majors || []).map((major, i) => (
              <Badge key={i} variant="secondary">{major}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {university.description && (
        <Card>
          <CardHeader><CardTitle>About</CardTitle></CardHeader>
          <CardContent><p className="text-gray-600">{university.description}</p></CardContent>
        </Card>
      )}
    </div>
  );
}