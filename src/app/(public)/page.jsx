
// 'use client';



// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { ScrollReveal, StaggerChildren, StaggerItem } from '@/components/shared/scroll-reveal';
// import { AnimatedCounter } from '@/components/shared/animated-counter';
// import { CardSkeleton } from '@/components/shared/loading-skeleton';
// import CountrySlider from '@/components/hero/country-slider';
// import { useApiQuery } from '@/hooks/use-api';
// import { coursesApi } from '@/lib/api/courses';
// import { erpApi } from '@/lib/api/erp';
// import { BookOpen, Plane, GraduationCap, Globe, Star, Users, ArrowRight } from 'lucide-react';

// const services = [
//   { icon: BookOpen, title: 'Japanese Courses', desc: 'Complete JLPT preparation from N5 to N1 with experienced native teachers.' },
//   { icon: Plane, title: 'Study Abroad', desc: 'End-to-end support for studying in Japan, USA, UK, Canada, and more.' },
//   { icon: GraduationCap, title: 'Exam Prep', desc: 'Extensive question bank with mock exams and detailed analytics.' },
//   { icon: Globe, title: 'Visa Assistance', desc: 'Complete visa documentation support and application tracking.' },
//   { icon: Star, title: 'AI Learning', desc: 'Personalized study plans and AI-powered learning recommendations.' },
//   { icon: Users, title: 'Career Guidance', desc: 'Expert counseling for university and course selection.' },
// ];

// const demoCourses = [
//   { level: 'N5', title: 'Beginner', price: '15,000', color: 'bg-blue-500', slug: 'jlpt-n5-complete-course' },
//   { level: 'N4', title: 'Elementary', price: '18,000', color: 'bg-green-500', slug: 'jlpt-n4-preparation-course' },
//   { level: 'N3', title: 'Intermediate', price: '22,000', color: 'bg-yellow-500', slug: 'jlpt-n3-intermediate-course' },
//   { level: 'N2', title: 'Upper Intermediate', price: '28,000', color: 'bg-red-500', slug: 'jlpt-n2-advanced-course' },
// ];

// export default function HomePage() {
//   const { data: featuredCoursesData, isLoading: coursesLoading } = useApiQuery(
//     'featured-courses', 
//     () => coursesApi.getFeatured()
//   );
  
//   const featuredCourses = featuredCoursesData?.data || [];

//   return (
//     <>
//       {/* COUNTRY SLIDER HERO - Replaces old hero section */}
//       <CountrySlider />

//       {/* Services Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <ScrollReveal>
//             <div className="text-center mb-12">
//               <Badge className="mb-4">Our Services</Badge>
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Everything You Need</h2>
//               <p className="text-lg text-gray-500 max-w-2xl mx-auto">
//                 Comprehensive Japanese education and study abroad services under one roof
//               </p>
//             </div>
//           </ScrollReveal>

//           <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
//             {services.map((service, i) => {
//               const Icon = service.icon;
//               return (
//                 <StaggerItem key={i}>
//                   <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
//                     <CardContent className="p-8">
//                       <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                         <Icon className="h-6 w-6 text-primary-600" />
//                       </div>
//                       <h3 className="text-xl font-bold mb-2">{service.title}</h3>
//                       <p className="text-gray-500">{service.desc}</p>
//                     </CardContent>
//                   </Card>
//                 </StaggerItem>
//               );
//             })}
//           </StaggerChildren>
//         </div>
//       </section>

//       {/* Courses Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <ScrollReveal>
//             <div className="text-center mb-12">
//               <Badge className="mb-4">JLPT Courses</Badge>
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Japanese Language Courses</h2>
//             </div>
//           </ScrollReveal>

//           {coursesLoading ? (
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {[1, 2, 3, 4].map(i => <CardSkeleton key={i} />)}
//             </div>
//           ) : (
//             <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {(featuredCourses.length > 0 ? featuredCourses : demoCourses).map((course, i) => (
//                 <StaggerItem key={course.id || i}>
//                   <Link href={`/courses/${course.slug || 'jlpt-n5-complete-course'}`}>
//                     <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
//                       <div className={`h-32 ${course.color || 'bg-blue-500'} flex items-center justify-center text-4xl`}>
//                         🇯🇵
//                       </div>
//                       <CardContent className="p-6">
//                         <Badge className="mb-3">{course.level} - {course.title || 'Beginner'}</Badge>
//                         <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 transition-colors">
//                           JLPT {course.level} Course
//                         </h3>
//                         <div className="flex justify-between items-center">
//                           <span className="text-xl font-extrabold text-primary-600">
//                             {course.price === 0 ? 'Free' : `NPR ${typeof course.price === 'number' ? course.price.toLocaleString() : course.price}`}
//                           </span>
//                           <Button size="sm">Learn More</Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </Link>
//                 </StaggerItem>
//               ))}
//             </StaggerChildren>
//           )}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 gradient-primary text-white">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <ScrollReveal>
//             <h2 className="text-4xl font-extrabold mb-4">Ready to Start Your Journey?</h2>
//             <p className="text-xl text-white/80 mb-8">Join 10,000+ students who have achieved their Japanese language goals</p>
//             <div className="flex justify-center gap-4">
//               <Link href="/register">
//                <Button
//                   size="lg"
//                   variant="outline"
//                   className="
//     border-2 border-white
//     bg-white
//     text-blue-600
//     hover:bg-transparent
//     hover:text-white
//     hover:border-white
//     transition-all
//     duration-300
//   "
//                 >
                 
//                   Get Started Free
//                 </Button>
//               </Link>
//               <Link href="/contact">
//                <Button
//                   size="lg"
//                   variant="outline"
//                   className="
//     border-2 border-white
//     bg-white
//     text-blue-600
//     hover:bg-transparent
//     hover:text-white
//     hover:border-white
//     transition-all
//     duration-300
//   "
//                 >
//                   Contact
//                 </Button>
//               </Link>
//             </div>
//           </ScrollReveal>
//         </div>
//       </section>
//     </>
//   );
// }





// 'use client';



// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { ScrollReveal, StaggerChildren, StaggerItem } from '@/components/shared/scroll-reveal';
// import { AnimatedCounter } from '@/components/shared/animated-counter';
// import { CardSkeleton } from '@/components/shared/loading-skeleton';
// import CountrySlider from '@/components/hero/country-slider';
// import { useApiQuery } from '@/hooks/use-api';
// import { coursesApi } from '@/lib/api/courses';
// import { erpApi } from '@/lib/api/erp';
// import { BookOpen, Plane, GraduationCap, Globe, Star, Users, ArrowRight } from 'lucide-react';

// const services = [
//   { icon: BookOpen, title: 'Japanese Courses', desc: 'Complete JLPT preparation from N5 to N1 with experienced native teachers.' },
//   { icon: Plane, title: 'Study Abroad', desc: 'End-to-end support for studying in Japan, USA, UK, Canada, and more.' },
//   { icon: GraduationCap, title: 'Exam Prep', desc: 'Extensive question bank with mock exams and detailed analytics.' },
//   { icon: Globe, title: 'Visa Assistance', desc: 'Complete visa documentation support and application tracking.' },
//   { icon: Star, title: 'AI Learning', desc: 'Personalized study plans and AI-powered learning recommendations.' },
//   { icon: Users, title: 'Career Guidance', desc: 'Expert counseling for university and course selection.' },
// ];

// const demoCourses = [
//   { level: 'N5', title: 'Beginner', price: '15,000', color: 'bg-blue-500', slug: 'jlpt-n5-complete-course' },
//   { level: 'N4', title: 'Elementary', price: '18,000', color: 'bg-green-500', slug: 'jlpt-n4-preparation-course' },
//   { level: 'N3', title: 'Intermediate', price: '22,000', color: 'bg-yellow-500', slug: 'jlpt-n3-intermediate-course' },
//   { level: 'N2', title: 'Upper Intermediate', price: '28,000', color: 'bg-red-500', slug: 'jlpt-n2-advanced-course' },
// ];

// export default function HomePage() {
//   const { data: featuredCoursesData, isLoading: coursesLoading } = useApiQuery(
//     'featured-courses', 
//     () => coursesApi.getFeatured()
//   );
  
//   const featuredCourses = featuredCoursesData?.data || [];

//   return (
//     <>
//       {/* COUNTRY SLIDER HERO - Replaces old hero section */}
//       <CountrySlider />

//       {/* Services Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <ScrollReveal>
//             <div className="text-center mb-12">
//               <Badge className="mb-4">Our Services</Badge>
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Everything You Need</h2>
//               <p className="text-lg text-gray-500 max-w-2xl mx-auto">
//                 Comprehensive Japanese education and study abroad services under one roof
//               </p>
//             </div>
//           </ScrollReveal>

//           <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
//             {services.map((service, i) => {
//               const Icon = service.icon;
//               return (
//                 <StaggerItem key={i}>
//                   <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
//                     <CardContent className="p-8">
//                       <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                         <Icon className="h-6 w-6 text-primary-600" />
//                       </div>
//                       <h3 className="text-xl font-bold mb-2">{service.title}</h3>
//                       <p className="text-gray-500">{service.desc}</p>
//                     </CardContent>
//                   </Card>
//                 </StaggerItem>
//               );
//             })}
//           </StaggerChildren>
//         </div>
//       </section>

//       {/* Courses Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <ScrollReveal>
//             <div className="text-center mb-12">
//               <Badge className="mb-4">JLPT Courses</Badge>
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Japanese Language Courses</h2>
//             </div>
//           </ScrollReveal>

//           {coursesLoading ? (
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {[1, 2, 3, 4].map(i => <CardSkeleton key={i} />)}
//             </div>
//           ) : (
//             <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {(featuredCourses.length > 0 ? featuredCourses : demoCourses).map((course, i) => (
//                 <StaggerItem key={course.id || i}>
//                   <Link href={`/courses/${course.slug || 'jlpt-n5-complete-course'}`}>
//                     <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
//                       <div className={`h-32 ${course.color || 'bg-blue-500'} flex items-center justify-center text-4xl`}>
//                         🇯🇵
//                       </div>
//                       <CardContent className="p-6">
//                         <Badge className="mb-3">{course.level} - {course.title || 'Beginner'}</Badge>
//                         <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 transition-colors">
//                           JLPT {course.level} Course
//                         </h3>
//                         <div className="flex justify-between items-center">
//                           <span className="text-xl font-extrabold text-primary-600">
//                             {course.price === 0 ? 'Free' : `NPR ${typeof course.price === 'number' ? course.price.toLocaleString() : course.price}`}
//                           </span>
//                           <Button size="sm">Learn More</Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </Link>
//                 </StaggerItem>
//               ))}
//             </StaggerChildren>
//           )}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 gradient-primary text-white">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <ScrollReveal>
//             <h2 className="text-4xl font-extrabold mb-4">Ready to Start Your Journey?</h2>
//             <p className="text-xl text-white/80 mb-8">Join 10,000+ students who have achieved their Japanese language goals</p>
//             <div className="flex justify-center gap-4">
//               <Link href="/register">
//                <Button
//                   size="lg"
//                   variant="outline"
//                   className="
//     border-2 border-white
//     bg-white
//     text-blue-600
//     hover:bg-transparent
//     hover:text-white
//     hover:border-white
//     transition-all
//     duration-300
//   "
//                 >
                 
//                   Get Started Free
//                 </Button>
//               </Link>
//               <Link href="/contact">
//                <Button
//                   size="lg"
//                   variant="outline"
//                   className="
//     border-2 border-white
//     bg-white
//     text-blue-600
//     hover:bg-transparent
//     hover:text-white
//     hover:border-white
//     transition-all
//     duration-300
//   "
//                 >
//                   Contact
//                 </Button>
//               </Link>
//             </div>
//           </ScrollReveal>
//         </div>
//       </section>
//     </>
//   );
// }


import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
} from '@/components/shared/scroll-reveal';
import CountrySlider from '@/components/hero/country-slider';
import {
  BookOpen,
  Plane,
  GraduationCap,
  Globe,
  Star,
  Users,
} from 'lucide-react';

import FeaturedCourses from './components/courses/featured-courses';

const services = [
  {
    icon: BookOpen,
    title: 'Japanese Courses',
    desc: 'Complete JLPT preparation from N5 to N1 with experienced native teachers.',
  },
  {
    icon: Plane,
    title: 'Study Abroad',
    desc: 'End-to-end support for studying in Japan, USA, UK, Canada, and more.',
  },
  {
    icon: GraduationCap,
    title: 'Exam Prep',
    desc: 'Extensive question bank with mock exams and detailed analytics.',
  },
  {
    icon: Globe,
    title: 'Visa Assistance',
    desc: 'Complete visa documentation support and application tracking.',
  },
  {
    icon: Star,
    title: 'AI Learning',
    desc: 'Personalized study plans and AI-powered learning recommendations.',
  },
  {
    icon: Users,
    title: 'Career Guidance',
    desc: 'Expert counseling for university and course selection.',
  },
];

export default function HomePage() {
  return (
    <>
      <CountrySlider />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Badge className="mb-4">Our Services</Badge>

              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                Everything You Need
              </h2>

              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Comprehensive Japanese education and study abroad services
                under one roof
              </p>
            </div>
          </ScrollReveal>

          <StaggerChildren
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.1}
          >
            {services.map((service, i) => {
              const Icon = service.icon;

              return (
                <StaggerItem key={i}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>

                      <h3 className="text-xl font-bold mb-2">
                        {service.title}
                      </h3>

                      <p className="text-gray-500">
                        {service.desc}
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      <FeaturedCourses />

      <section className="py-20 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-extrabold mb-4">
              Ready to Start Your Journey?
            </h2>

            <p className="text-xl text-white/80 mb-8">
              Join 10,000+ students who have achieved their Japanese language
              goals
            </p>

            <div className="flex justify-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-white text-blue-600 hover:bg-transparent hover:text-white hover:border-white transition-all duration-300"
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
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}




























