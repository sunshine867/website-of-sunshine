import CourseCard from './course-card';
import LoadingSpinner from '@/components/shared/loading-spinner';
import EmptyState from '@/components/shared/empty-state';
import { BookOpen } from 'lucide-react';

export default function CourseList({ courses, enrollments, isLoading, emptyTitle, emptyDescription, emptyAction, onEmptyAction }) {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="animate-pulse bg-white rounded-2xl overflow-hidden">
            <div className="h-40 bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title={emptyTitle || 'No courses found'}
        description={emptyDescription}
        actionLabel={emptyAction}
        onAction={onEmptyAction}
      />
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          enrollment={enrollments?.find(e => e.course_id === course.id)}
        />
      ))}
    </div>
  );
}