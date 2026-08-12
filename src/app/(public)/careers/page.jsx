'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Japanese Language Teacher',
    department: 'Teaching',
    type: 'Full-time',
    location: 'Kathmandu',
    experience: '2+ years',
    description: 'We are looking for experienced Japanese language teachers to join our team.',
    requirements: ['JLPT N2 or above', 'Teaching experience', 'Fluent in Nepali and English'],
    posted: '2026-07-20'
  },
  {
    id: 2,
    title: 'Study Abroad Counselor',
    department: 'Counseling',
    type: 'Full-time',
    location: 'Kathmandu',
    experience: '1+ years',
    description: 'Help students achieve their dreams of studying abroad with expert guidance.',
    requirements: ['Bachelor degree', 'Knowledge of education systems', 'Excellent communication'],
    posted: '2026-07-18'
  },
  {
    id: 3,
    title: 'Content Writer',
    department: 'Marketing',
    type: 'Part-time',
    location: 'Remote',
    experience: '1+ years',
    description: 'Create engaging content about Japanese language and study abroad topics.',
    requirements: ['Excellent writing skills', 'SEO knowledge', 'Japanese language knowledge is a plus'],
    posted: '2026-07-15'
  },
  {
    id: 4,
    title: 'Visa Documentation Officer',
    department: 'Visa Processing',
    type: 'Full-time',
    location: 'Kathmandu',
    experience: '2+ years',
    description: 'Handle visa documentation and application processing for students.',
    requirements: ['Visa processing experience', 'Attention to detail', 'Multi-tasking ability'],
    posted: '2026-07-10'
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Join Our Team</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Careers</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join our mission to provide world-class Japanese education and study abroad services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: '🌟', title: 'Great Culture', desc: 'Work in a supportive and collaborative environment' },
              { icon: '📈', title: 'Growth Opportunities', desc: 'Continuous learning and career development' },
              { icon: '💼', title: 'Competitive Benefits', desc: 'Attractive salary and comprehensive benefits package' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-8 text-center">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                          <Badge variant="outline">{job.department}</Badge>
                          <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {job.type}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Posted: {job.posted}</span>
                        </div>
                        <p className="text-gray-600 mb-3">{job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">{req}</Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="gradient" size="sm">
                        Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Don't See a Fit?</h2>
          <p className="text-gray-400 mb-8">Send us your resume and we'll keep you in mind for future opportunities</p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            Send Resume
          </Button>
        </div>
      </section>
    </div>
  );
}
