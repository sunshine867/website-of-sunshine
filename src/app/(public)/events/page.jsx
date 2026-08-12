'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApiQuery } from '@/hooks/use-api';
import { galleryApi } from '@/lib/api/gallery';
import { formatDate } from '@/lib/utils';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';

export default function EventsPage() {
  const { data: eventsData } = useApiQuery('public-events', () => galleryApi.getEvents());
  const events = eventsData?.data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold mb-4">Events & Workshops</h1>
            <p className="text-xl text-white/80">Join our upcoming events and workshops</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all">
                <div className="h-32 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-3xl">
                  📅
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3">{event.event_type}</Badge>
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(event.start_datetime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(event.start_datetime, { hour: 'numeric', minute: 'numeric' })}</span>
                    </div>
                    {event.venue && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.venue}</span>
                      </div>
                    )}
                  </div>
                  <Button variant="gradient" size="sm" className="w-full">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
