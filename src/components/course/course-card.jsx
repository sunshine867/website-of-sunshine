import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Star, Users, ArrowRight } from 'lucide-react';

export default function CourseCard({ course, enrollment, variant = 'default' }) {
  const levelColors = {
    N5: 'bg-blue-100 text-blue-700',
    N4: 'bg-green-100 text-green-700',
    N3: 'bg-yellow-100 text-yellow-700',
    N2: 'bg-red-100 text-red-700',
    N1: 'bg-purple-100 text-purple-700',
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all group h-full">
      <div className="h-40 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-4xl relative">
        📚
        <Badge className={`absolute top-3 left-3 ${levelColors[course.level] || ''}`}>{course.level}</Badge>
        {course.course_type !== 'FREE' && (
          <Badge className="absolute top-3 right-3 bg-white/90 text-gray-700">{course.course_type}</Badge>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.short_description || course.description}</p>
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {course.total_lessons} Lessons</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.total_duration_minutes}min</span>
          <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500" /> {course.average_rating}</span>
          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {course.total_enrollments}</span>
        </div>
        {enrollment && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1"><span>Progress</span><span>{enrollment.progress_percentage}%</span></div>
            <Progress value={enrollment.progress_percentage} className="h-1.5" />
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-lg font-extrabold text-primary-600">
            {course.price === 0 ? 'Free' : `NPR ${course.price?.toLocaleString()}`}
          </span>
          <Link href={`/courses/${course.slug || course.id}`}>
            <Button variant="gradient" size="sm">
              {enrollment ? 'Continue' : 'View'} <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}