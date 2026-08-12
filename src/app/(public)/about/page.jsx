// src/app/about/page.js
'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {
  Target, Eye, Heart, Users, Award, BookOpen,
  Globe, TrendingUp, Star, ArrowRight, CheckCircle,
  GraduationCap, Plane, Building, Compass
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Users, value: '5,000+', label: 'Students Placed' },
    { icon: Globe, value: '200+', label: 'Partner Universities' },
    { icon: Award, value: '95%', label: 'Visa Success Rate' },
    { icon: TrendingUp, value: '10+', label: 'Countries Served' },
  ];

  const values = [
    {
      icon: Users,
      title: 'Student First',
      desc: 'We prioritize student success and satisfaction above everything else.'
    },
    {
      icon: Target,
      title: 'Excellence',
      desc: 'Striving for excellence in every service we provide.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      desc: 'Honest and transparent advice for all our students.'
    },
    {
      icon: Award,
      title: 'Innovation',
      desc: 'Continuously improving our services with modern approaches.'
    },
  ];

  const team = [
    { name: 'Ashish Nepal', role: 'Founder & CEO', experience: '15+ years', image: '/images/team/t1.jpeg' },
    { name: 'Manju Luitel', role: 'Academic Director', experience: '10+ years', image: '/images/team/t2.jpg' },
    { name: 'Saurav Prasad Ghimire', role: 'Visa Specialist / Developer', experience: '8+ years', image: '/images/team/t4.png' },
    { name: 'Sabina Kilambu', role: 'Instructor', experience: '10+ years', image: '/images/team/t5.jpg' },
  ];

  const achievements = [
    '5000+ Students Placed',
    '200+ Partner Universities',
    '95% Visa Success Rate',
    '10+ Countries Served',
    '8+ Years of Excellence',
    '100% Student Satisfaction',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-white/20 text-white border-white/30">About Us</Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Your Gateway to Global<br />Education & Study Abroad
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We are dedicated to helping students achieve their dreams of studying abroad at top universities worldwide. Your trusted partner in international education since 2015.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="text-center shadow-xl hover:shadow-2xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <p className="text-3xl font-extrabold text-primary-600">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-extrabold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2015, Sunshine International Education Center has grown from a small team of education enthusiasts to one of the leading study abroad consultancies. We've helped over 5,000 students achieve their dreams of studying at top universities worldwide.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our mission is to make international education accessible to every deserving student. We provide comprehensive guidance from university selection to visa processing, ensuring a smooth transition to your dream destination.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {achievements.map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/about.jpg"
                  alt="About Sunshine International Education Center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Our Values</Badge>
            <h2 className="text-3xl font-extrabold mb-4">What Drives Us</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our core values guide everything we do for our students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-7 w-7 text-primary-600" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                      <p className="text-gray-500 text-sm">{value.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team Section - Oval Shape Images */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl font-extrabold mb-4">Meet Our Experts</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Dedicated professionals ready to guide you every step of the way
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                {/* Oval Shape Image */}
                <div className="relative w-48 h-64 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full overflow-hidden border-[3px] border-[#b3d9ff] shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 bg-white">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-primary-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary-600 mb-2 font-medium">{member.role}</p>
                <p className="text-sm text-gray-500">{member.experience} experience</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold mb-4">Start Your Global Journey Today</h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of students who have achieved their dreams of studying abroad with us
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
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


                  Get Started Free
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
