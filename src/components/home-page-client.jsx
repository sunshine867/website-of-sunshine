'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';

import {
  BookOpen,
  Plane,
  GraduationCap,
  Globe,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';


// ============================================================
// SERVICES
// ============================================================

const services = [
  {
    icon: BookOpen,
    title: 'Japanese Courses',
    desc: 'JLPT N5 to N1 preparation with native teachers',
  },
  {
    icon: Plane,
    title: 'Study Abroad',
    desc: 'Study in Japan, USA, UK, Canada, and more',
  },
  {
    icon: GraduationCap,
    title: 'Exam Prep',
    desc: 'Mock exams and detailed analytics',
  },
  {
    icon: Globe,
    title: 'Visa Assistance',
    desc: 'Complete visa documentation support',
  },
  {
    icon: Star,
    title: 'AI Learning',
    desc: 'Personalized study plans with AI',
  },
  {
    icon: Users,
    title: 'Career Guidance',
    desc: 'Expert counseling for your future',
  },
];


// ============================================================
// COURSES
// ============================================================

const courses = [
  {
    level: 'N5',
    title: 'Beginner',
    price: '15,000',
    color: 'bg-blue-500',
    slug: 'jlpt-n5',
  },
  {
    level: 'N4',
    title: 'Elementary',
    price: '18,000',
    color: 'bg-green-500',
    slug: 'jlpt-n4',
  },
  {
    level: 'N3',
    title: 'Intermediate',
    price: '22,000',
    color: 'bg-yellow-500',
    slug: 'jlpt-n3',
  },
  {
    level: 'N2',
    title: 'Upper Intermediate',
    price: '28,000',
    color: 'bg-red-500',
    slug: 'jlpt-n2',
  },
];


// ============================================================
// COUNTRIES
// ============================================================

const countries = [
  {
    flag: '🇯🇵',
    name: 'Japan',
  },
  {
    flag: '🇺🇸',
    name: 'USA',
  },
  {
    flag: '🇬🇧',
    name: 'UK',
  },
  {
    flag: '🇨🇦',
    name: 'Canada',
  },
  {
    flag: '🇦🇺',
    name: 'Australia',
  },
  {
    flag: '🇩🇪',
    name: 'Germany',
  },
  {
    flag: '🇰🇷',
    name: 'South Korea',
  },
  {
    flag: '🇳🇿',
    name: 'New Zealand',
  },
];


// ============================================================
// STATISTICS
// ============================================================

const stats = [
  {
    value: '10,000+',
    label: 'Students Trained',
  },
  {
    value: '500+',
    label: 'Japan Placements',
  },
  {
    value: '95%',
    label: 'JLPT Pass Rate',
  },
  {
    value: '8',
    label: 'Countries Covered',
  },
];


// ============================================================
// TESTIMONIALS
// ============================================================

const testimonials = [
  {
    name: 'Ram Sharma',
    role: 'JLPT N3 Certified | Studying in Tokyo',
    image: '👨‍🎓',
    text:
      'The JLPT preparation course was excellent! I passed N3 in just 6 months. The teachers are very supportive and the study materials are comprehensive.',
    rating: 5,
  },
  {
    name: 'Sita Poudel',
    role: 'MEXT Scholar | Kyoto University',
    image: '👩‍🎓',
    text:
      'The study abroad counseling was amazing. They helped me get admission to Kyoto University with the prestigious MEXT scholarship!',
    rating: 5,
  },
  {
    name: 'Bikash Thapa',
    role: 'JLPT N2 | Working in Japanese MNC',
    image: '👨‍💼',
    text:
      'The AI-powered mock tests helped me identify my weak areas. I improved from 60% to 95% in just 3 months!',
    rating: 5,
  },
];


// ============================================================
// HOME PAGE
// ============================================================

export default function HomePageClient() {
  return (
    <main>

      {/* ======================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600 text-white">

        {/* Background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT SIDE */}

            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >

              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🎌 #1 Japanese Language Institute in Nepal
              </Badge>


              <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">

                Learn Japanese &

                <br />

                <span className="text-yellow-300">
                  Study in Japan
                </span>

              </h1>


              <p className="text-lg text-white/80 mb-8 max-w-lg">
                Master Japanese from N5 to N1 with our comprehensive
                courses. Get expert guidance for studying abroad in Japan
                and 8+ countries.
              </p>


              <div className="flex flex-wrap gap-4">

                <Link href="/courses">

                  <Button
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-gray-100 shadow-xl"
                  >
                    Explore Courses

                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                </Link>


                <Link href="/apply">

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/50 text-white hover:bg-white/10"
                  >
                    Free Counseling
                  </Button>

                </Link>

              </div>


              {/* STATS */}

              <div className="flex flex-wrap gap-8 mt-10">

                {stats.map((stat) => (

                  <div key={stat.label}>

                    <div className="text-3xl font-extrabold">
                      {stat.value}
                    </div>

                    <div className="text-sm text-white/70">
                      {stat.label}
                    </div>

                  </div>

                ))}

              </div>

            </motion.div>


            {/* RIGHT SIDE */}

            <motion.div
              initial={{
                opacity: 0,
                x: 50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="hidden lg:block"
            >

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8">

                <div className="text-8xl text-center mb-6">
                  🇯🇵
                </div>


                <div className="space-y-4">

                  {[
                    'JLPT N5 to N1 Complete Course',
                    'Study in Japan Support',
                    'Visa Processing Assistance',
                    '100% Student Satisfaction',
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3 text-white/90"
                    >

                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />

                      <span>
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* ======================================================
          SERVICES SECTION
      ====================================================== */}

      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-12">

            <Badge className="mb-4">
              Our Services
            </Badge>

            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Everything You Need
            </h2>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Comprehensive Japanese education and study abroad services
              under one roof
            </p>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {services.map((service, index) => {

              const Icon = service.icon;

              return (

                <motion.div
                  key={service.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  viewport={{
                    once: true,
                  }}
                >

                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                    <CardContent className="p-8">

                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">

                        <Icon className="h-6 w-6 text-blue-600" />

                      </div>


                      <h3 className="text-xl font-bold mb-2">
                        {service.title}
                      </h3>


                      <p className="text-gray-500">
                        {service.desc}
                      </p>

                    </CardContent>

                  </Card>

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>


      {/* ======================================================
          COURSES SECTION
      ====================================================== */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-12">

            <Badge className="mb-4">
              JLPT Courses
            </Badge>

            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Japanese Language Courses
            </h2>

            <p className="text-lg text-gray-500">
              Structured learning path from beginner to advanced
            </p>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {courses.map((course, index) => (

              <motion.div
                key={course.level}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
              >

                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                  <div
                    className={`h-32 ${course.color} flex items-center justify-center text-4xl`}
                  >
                    🇯🇵
                  </div>


                  <CardContent className="p-6">

                    <Badge className="mb-3">
                      {course.level} - {course.title}
                    </Badge>


                    <h3 className="text-lg font-bold mb-2">
                      JLPT {course.level} Course
                    </h3>


                    <p className="text-sm text-gray-500 mb-4">
                      Complete preparation for JLPT {course.level}{' '}
                      examination
                    </p>


                    <div className="flex justify-between items-center">

                      <span className="text-xl font-extrabold text-blue-600">
                        NPR {course.price}
                      </span>


                      <Link
                        href={`/courses/${course.slug}`}
                      >
                        <Button size="sm">
                          Learn More
                        </Button>
                      </Link>

                    </div>

                  </CardContent>

                </Card>

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          COUNTRIES SECTION
      ====================================================== */}

      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-12">

            <Badge className="mb-4">
              Study Destinations
            </Badge>

            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Countries We Cover
            </h2>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {countries.map((country, index) => (

              <motion.div
                key={country.name}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                viewport={{
                  once: true,
                }}
              >

                <Card className="text-center p-6 hover:shadow-lg transition-all cursor-pointer">

                  <div className="text-5xl mb-3">
                    {country.flag}
                  </div>

                  <h3 className="font-semibold">
                    {country.name}
                  </h3>

                </Card>

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          TESTIMONIALS
      ====================================================== */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-12">

            <Badge className="mb-4">
              Testimonials
            </Badge>

            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              What Our Students Say
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-8">

            {testimonials.map((testimonial, index) => (

              <motion.div
                key={testimonial.name}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
              >

                <Card className="h-full">

                  <CardContent className="p-6">

                    <div className="flex gap-1 mb-4">

                      {Array.from({
                        length: testimonial.rating,
                      }).map((_, index) => (

                        <Star
                          key={index}
                          className="h-4 w-4 text-yellow-500 fill-yellow-500"
                        />

                      ))}

                    </div>


                    <p className="text-gray-600 mb-6 italic">
                      "{testimonial.text}"
                    </p>


                    <div className="flex items-center gap-3 border-t pt-4">

                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                        {testimonial.image}
                      </div>


                      <div>

                        <p className="font-bold text-sm">
                          {testimonial.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {testimonial.role}
                        </p>

                      </div>

                    </div>

                  </CardContent>

                </Card>

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          CTA SECTION
      ====================================================== */}

      <section className="py-20 bg-gradient-to-r from-blue-600 to-sky-500 text-white">

        <div className="max-w-4xl mx-auto px-4 text-center">

          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Start Your Journey?
          </h2>


          <p className="text-xl text-white/80 mb-8">
            Join 10,000+ students who have achieved their Japanese
            language goals with us
          </p>


          <div className="flex justify-center gap-4">

            <Link href="/register">

              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-gray-100"
              >
                Get Started Free
              </Button>

            </Link>


            <Link href="/contact">

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white bg-white text-blue-600 hover:bg-transparent hover:text-white hover:border-white transition-all duration-300"
              >
                Contact
              </Button>

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
