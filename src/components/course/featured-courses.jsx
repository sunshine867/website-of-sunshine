'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
} from '@/components/shared/scroll-reveal';

import { CardSkeleton } from '@/components/shared/loading-skeleton';

import { useApiQuery } from '@/hooks/use-api';
import { coursesApi } from '@/lib/api/courses';

const demoCourses = [
  {
    level: 'N5',
    title: 'Beginner',
    price: '15,000',
    color: 'bg-blue-500',
    slug: 'jlpt-n5-complete-course',
  },
  {
    level: 'N4',
    title: 'Elementary',
    price: '18,000',
    color: 'bg-green-500',
    slug: 'jlpt-n4-preparation-course',
  },
  {
    level: 'N3',
    title: 'Intermediate',
    price: '22,000',
    color: 'bg-yellow-500',
    slug: 'jlpt-n3-intermediate-course',
  },
  {
    level: 'N2',
    title: 'Upper Intermediate',
    price: '28,000',
    color: 'bg-red-500',
    slug: 'jlpt-n2-advanced-course',
  },
];

export default function FeaturedCourses() {
  const {
    data: featuredCoursesData,
    isLoading: coursesLoading,
  } = useApiQuery(
    'featured-courses',
    () => coursesApi.getFeatured()
  );

  const featuredCourses = featuredCoursesData?.data || [];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge className="mb-4">JLPT Courses</Badge>

            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Japanese Language Courses
            </h2>
          </div>
        </ScrollReveal>

        {coursesLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(featuredCourses.length > 0
              ? featuredCourses
              : demoCourses
            ).map((course, i) => (
              <StaggerItem key={course.id || i}>
                <Link
                  href={`/courses/${
                    course.slug || 'jlpt-n5-complete-course'
                  }`}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    <div
                      className={`h-32 ${
                        course.color || 'bg-blue-500'
                      } flex items-center justify-center text-4xl`}
                    >
                      🇯🇵
                    </div>

                    <CardContent className="p-6">
                      <Badge className="mb-3">
                        {course.level} - {course.title || 'Beginner'}
                      </Badge>

                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 transition-colors">
                        JLPT {course.level} Course
                      </h3>

                      <div className="flex justify-between items-center">
                        <span className="text-xl font-extrabold text-primary-600">
                          {course.price === 0
                            ? 'Free'
                            : `NPR ${
                                typeof course.price === 'number'
                                  ? course.price.toLocaleString()
                                  : course.price
                              }`}
                        </span>

                        <Button size="sm">
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>
    </section>
  );
}
