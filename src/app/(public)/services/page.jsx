'use client';

 

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen, Plane, FileCheck, Globe,
  GraduationCap, Users, Headphones, Briefcase,
  ArrowRight, CheckCircle
} from 'lucide-react';

const services = [
  {
    icon: BookOpen,
    title: 'Japanese Language Courses',
    description: 'Comprehensive JLPT preparation from N5 to N1 with experienced native Japanese teachers. Includes vocabulary, grammar, kanji, reading, listening, and speaking practice.',
    features: ['JLPT N5 to N1', 'Native Teachers', 'Online & Physical Classes', 'Study Materials', 'Mock Tests'],
    color: 'bg-blue-500',
    href: '/courses'
  },
  {
    icon: Plane,
    title: 'Study Abroad Services',
    description: 'End-to-end support for studying in Japan, USA, UK, Canada, Australia, Germany, South Korea, and New Zealand.',
    features: ['University Selection', 'Application Process', 'Scholarship Guidance', 'Pre-departure Briefing'],
    color: 'bg-green-500',
    href: '/apply'
  },
  {
    icon: FileCheck,
    title: 'Visa Processing',
    description: 'Complete visa documentation support, interview preparation, and application tracking for student visas.',
    features: ['Document Preparation', 'Interview Coaching', 'Application Tracking', 'Appeal Support'],
    color: 'bg-purple-500',
    href: '/apply'
  },
  {
    icon: Globe,
    title: 'Test Preparation',
    description: 'Prepare for JLPT, JFT Basic, NAT-TEST, and other Japanese proficiency tests with our comprehensive preparation courses.',
    features: ['JLPT N5-N1', 'JFT Basic', 'Mock Exams', 'Performance Analytics'],
    color: 'bg-orange-500',
    href: '/exams'
  },
  {
    icon: GraduationCap,
    title: 'Career Counseling',
    description: 'Expert guidance for university and course selection based on your academic background, interests, and career goals.',
    features: ['Career Assessment', 'Course Matching', 'University Shortlisting', 'Application Strategy'],
    color: 'bg-pink-500',
    href: '/contact'
  },
  {
    icon: Headphones,
    title: 'Student Support',
    description: '24/7 support for all students including accommodation assistance, part-time job guidance, and cultural orientation.',
    features: ['Accommodation Help', 'Part-time Job Guide', 'Cultural Orientation', 'Emergency Support'],
    color: 'bg-teal-500',
    href: '/contact'
  },
];

const process = [
  { step: '01', title: 'Free Consultation', desc: 'Meet our counselors to discuss your goals and preferences.' },
  { step: '02', title: 'Course Selection', desc: 'Choose the right course or university based on your profile.' },
  { step: '03', title: 'Application', desc: 'We handle the complete application and documentation process.' },
  { step: '04', title: 'Visa Processing', desc: 'Get complete support for visa application and interview.' },
  { step: '05', title: 'Pre-Departure', desc: 'Attend orientation and prepare for your journey abroad.' },
  { step: '06', title: 'Arrival Support', desc: 'Receive airport pickup and settling-in assistance.' },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Our Services</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Comprehensive Education Services
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              From Japanese language learning to studying abroad, we provide complete support for your educational journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all group">
                    <CardContent className="p-8">
                      <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-gray-500 mb-6">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href={service.href}>
                        <Button variant="gradient" size="sm" className="w-full">
                          Learn More <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">How It Works</Badge>
            <h2 className="text-4xl font-extrabold mb-4">Our Process</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Simple and streamlined process to help you achieve your goals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-2xl font-extrabold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-8">Book a free consultation with our experts today</p>
          <div className="flex justify-center gap-4">
            <Link href="/apply">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                Apply Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="
    border-2 border-white
    bg-white
    text-blue-600
    hover:bg-transparent
    hover:text-white
    hover:border-white
    transition-all
    duration-300
  "
              >
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
