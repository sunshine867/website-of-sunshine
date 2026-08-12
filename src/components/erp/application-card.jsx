import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/shared/status-badge';
import { Building2, Globe, MapPin, Calendar, Eye } from 'lucide-react';

export default function ApplicationCard({ application }) {
  if (!application) return null;

  return (
    <Card className="hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-xl">🏛️</div>
            <div>
              <h3 className="font-bold text-lg">{application.university?.name}</h3>
              <p className="text-sm text-gray-500">{application.program_name}</p>
            </div>
          </div>
          <StatusBadge status={application.status} />
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> {application.university?.country?.name}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {application.university?.city}</span>
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {application.intake_date}</span>
        </div>
        {application.documents && application.documents.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Documents ({application.documents.length})</p>
            <div className="flex gap-1">
              {application.documents.map((doc, i) => (
                <Badge key={i} variant="secondary" className="text-xs">{doc.document_type}</Badge>
              ))}
            </div>
          </div>
        )}
        <Link href={`/dashboard/study-abroad/${application.id}`}>
          <Button variant="outline" size="sm" className="w-full"><Eye className="mr-1 h-4 w-4" /> View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}