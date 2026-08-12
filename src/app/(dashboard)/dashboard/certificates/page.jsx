'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApiQuery } from '@/hooks/use-api';
import { formatDate } from '@/lib/utils';
import { Award, Download, Share2, Eye, CheckCircle } from 'lucide-react';
 
export default function CertificatesPage() {
  const certificates = [
    { id: 1, course: 'JLPT N5 Complete Course', level: 'N5', grade: 'A', percentage: 92, date: '2026-03-15', number: 'CERT-2026-00001' },
    { id: 2, course: 'JLPT N4 Preparation', level: 'N4', grade: 'A-', percentage: 88, date: '2026-06-20', number: 'CERT-2026-00045' },
    { id: 3, course: 'Japanese Vocabulary Master', level: 'N4', grade: 'B+', percentage: 82, date: '2026-07-10', number: 'CERT-2026-00102' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">My Certificates</h1>
        <p className="text-gray-500 mt-1">Certificates earned from completed courses</p>
      </motion.div>

      {certificates.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">No Certificates Yet</h3>
            <p className="text-gray-400 mb-4">Complete courses to earn certificates</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="overflow-hidden hover:shadow-xl transition-all">
                <div className="bg-gradient-to-br from-primary-600 to-secondary-500 p-6 text-white">
                  <Award className="h-12 w-12 mb-3 opacity-80" />
                  <h3 className="font-bold text-lg mb-1">{cert.course}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-white/20 text-white border-white/30">{cert.level}</Badge>
                    <Badge className="bg-white/20 text-white border-white/30">Grade: {cert.grade}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Score</p>
                      <p className="text-2xl font-extrabold text-green-600">{cert.percentage}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Issued</p>
                      <p className="font-medium">{formatDate(cert.date)}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">Certificate #: {cert.number}</p>
                  <div className="flex gap-2">
                    <Button variant="gradient" className="flex-1"><Download className="mr-1 h-4 w-4" /> Download</Button>
                    <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}