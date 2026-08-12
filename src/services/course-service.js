// import { coursesApi } from '@/lib/api/courses';

// const courseService = {
//   getCourses: async (params) => {
//     const { data } = await coursesApi.getAll(params);
//     return data;
//   },

//   getFeaturedCourses: async () => {
//     const { data } = await coursesApi.getFeatured();
//     return data.data;
//   },

//   getCourseBySlug: async (slug) => {
//     const { data } = await coursesApi.getBySlug(slug);
//     return data.data;
//   },

//   getCourseById: async (id) => {
//     const { data } = await coursesApi.getById(id);
//     return data.data;
//   },

//   getMyEnrollments: async () => {
//     const { data } = await coursesApi.getMyEnrollments();
//     return data.data;
//   },

//   getProgress: async (courseId) => {
//     const { data } = await coursesApi.getProgress(courseId);
//     return data.data;
//   },

//   enrollCourse: async (courseId, enrollmentData) => {
//     const { data } = await coursesApi.enroll(courseId, enrollmentData);
//     return data;
//   },

//   addReview: async (courseId, reviewData) => {
//     const { data } = await coursesApi.addReview(courseId, reviewData);
//     return data;
//   },

//   createCourse: async (courseData) => {
//     const { data } = await coursesApi.create(courseData);
//     return data.data;
//   },

//   updateCourse: async (id, courseData) => {
//     const { data } = await coursesApi.update(id, courseData);
//     return data.data;
//   },

//   deleteCourse: async (id) => {
//     await coursesApi.delete(id);
//   },

//   addLesson: async (courseId, lessonData) => {
//     const { data } = await coursesApi.addLesson(courseId, lessonData);
//     return data.data;
//   },

//   updateLesson: async (lessonId, lessonData) => {
//     const { data } = await coursesApi.updateLesson(lessonId, lessonData);
//     return data.data;
//   },
// };

// export default courseService;



import { supabase } from '../config/database.js';
import { redisHelpers } from '../config/redis.js';
import { ApiError } from '../utils/apiError.js';
import { helpers } from '../utils/helpers.js';

const courseService = {
  // ============================================
  // GET ALL COURSES (PUBLIC)
  // ============================================
  getAllCourses: async (query) => {
    const { page, limit, offset } = helpers.getPaginationParams(query);
    
    let queryBuilder = supabase
      .from('courses')
      .select('*, category:course_categories(*), teacher:teachers(*, profile:user_profiles(first_name, last_name))', { count: 'exact' })
      .is('deleted_at', null);

    // Only show published courses to public
    if (!query.includeAll) {
      queryBuilder = queryBuilder.eq('status', 'PUBLISHED').eq('is_published', true);
    }

    if (query.level && query.level !== 'all') queryBuilder = queryBuilder.eq('level', query.level);
    if (query.course_type && query.course_type !== 'all') queryBuilder = queryBuilder.eq('course_type', query.course_type);
    if (query.category_id) queryBuilder = queryBuilder.eq('category_id', query.category_id);
    if (query.search) {
      queryBuilder = queryBuilder.or(`title.ilike.%${query.search}%,description.ilike.%${query.search}%`);
    }
    if (query.min_price) queryBuilder = queryBuilder.gte('price', query.min_price);
    if (query.max_price) queryBuilder = queryBuilder.lte('price', query.max_price);
    if (query.teacher_id) queryBuilder = queryBuilder.eq('teacher_id', query.teacher_id);

    const sortBy = query.sortBy || 'created_at';
    const sortOrder = query.sortOrder === 'ASC' ? true : false;

    const { data, error, count } = await queryBuilder
      .order(sortBy, { ascending: sortOrder })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Database error fetching courses:', error);
      throw ApiError.internal('Failed to fetch courses');
    }

    return {
      courses: data || [],
      pagination: helpers.buildPaginationResponse(count || 0, page, limit)
    };
  },

  // ============================================
  // GET FEATURED COURSES
  // ============================================
  getFeaturedCourses: async () => {
    const cacheKey = 'featured_courses';
    const cached = await redisHelpers.getCache(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
      .from('courses')
      .select('*, teacher:teachers(*, profile:user_profiles(first_name, last_name, profile_image_url))')
      .eq('is_featured', true)
      .eq('is_published', true)
      .eq('status', 'PUBLISHED')
      .is('deleted_at', null)
      .limit(8);

    if (error) {
      console.error('Database error fetching featured courses:', error);
      return [];
    }
    
    await redisHelpers.setCache(cacheKey, data, 3600);
    return data || [];
  },

  // ============================================
  // GET COURSE BY SLUG
  // ============================================
  getCourseBySlug: async (slug) => {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        category:course_categories(*),
        teacher:teachers(*, profile:user_profiles(first_name, last_name, profile_image_url, bio)),
        lessons(*),
        reviews:course_reviews(*, student:students(*, profile:user_profiles(first_name, last_name, profile_image_url)))
      `)
      .eq('slug', slug)
      .eq('status', 'PUBLISHED')
      .is('deleted_at', null)
      .single();

    if (error) return null;
    return data;
  },

  // ============================================
  // GET COURSE BY ID
  // ============================================
  getCourseById: async (id) => {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        category:course_categories(*),
        teacher:teachers(*, profile:user_profiles(first_name, last_name, profile_image_url)),
        lessons(*)
      `)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) return null;
    return data;
  },

  // ============================================
  // GET COURSE REVIEWS
  // ============================================
  getCourseReviews: async (courseId) => {
    const { data, error } = await supabase
      .from('course_reviews')
      .select('*, student:students(*, profile:user_profiles(first_name, last_name, profile_image_url))')
      .eq('course_id', courseId)
      .eq('status', 'APPROVED')
      .order('created_at', { ascending: false });

    if (error) return [];
    return data || [];
  },

  // ============================================
  // GET COURSE LESSONS
  // ============================================
  getCourseLessons: async (courseId) => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseId)
      .order('section_number', { ascending: true })
      .order('lesson_order', { ascending: true });

    if (error) return [];
    return data || [];
  },

  // ============================================
  // ENROLL IN COURSE (STUDENT)
  // ============================================
  enrollCourse: async (user, courseId, enrollmentData) => {
    // Find student profile
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!student) throw ApiError.notFound('Student profile not found. Please complete your profile.');

    // Check course exists
    const { data: course } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();

    if (!course) throw ApiError.notFound('Course not found');

    // Check if already enrolled
    const { data: existing } = await supabase
      .from('enrollments')
      .select('id')
      .eq('student_id', student.id)
      .eq('course_id', courseId)
      .single();

    if (existing) throw ApiError.conflict('You are already enrolled in this course');

    // Create enrollment
    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .insert({
        student_id: student.id,
        course_id: courseId,
        enrollment_type: enrollmentData.type || course.course_type,
        status: course.price > 0 ? 'PENDING_PAYMENT' : 'ACTIVE',
        enrolled_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw ApiError.internal('Failed to enroll in course');

    return enrollment;
  },

  // ============================================
  // ADD REVIEW (STUDENT)
  // ============================================
  addReview: async (user, courseId, reviewData) => {
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!student) throw ApiError.notFound('Student profile not found');

    // Check if enrolled
    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('student_id', student.id)
      .eq('course_id', courseId)
      .single();

    if (!enrollment) throw ApiError.forbidden('You must be enrolled to review this course');

    // Check for existing review
    const { data: existingReview } = await supabase
      .from('course_reviews')
      .select('id')
      .eq('student_id', student.id)
      .eq('course_id', courseId)
      .single();

    if (existingReview) throw ApiError.conflict('You have already reviewed this course');

    const { data, error } = await supabase
      .from('course_reviews')
      .insert({
        student_id: student.id,
        course_id: courseId,
        rating: reviewData.rating,
        review_text: reviewData.review,
        is_verified_purchase: !!enrollment.payment_id,
        status: 'PENDING'
      })
      .select()
      .single();

    if (error) throw ApiError.internal('Failed to add review');
    return data;
  },

  // ============================================
  // GET MY ENROLLMENTS (STUDENT)
  // ============================================
  getMyEnrollments: async (user) => {
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!student) return [];

    const { data, error } = await supabase
      .from('enrollments')
      .select('*, course:courses(*, teacher:teachers(*, profile:user_profiles(first_name, last_name)))')
      .eq('student_id', student.id)
      .order('created_at', { ascending: false });

    if (error) return [];
    return data || [];
  },

  // ============================================
  // GET COURSE PROGRESS (STUDENT)
  // ============================================
  getCourseProgress: async (user, courseId) => {
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!student) throw ApiError.notFound('Student profile not found');

    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('student_id', student.id)
      .eq('course_id', courseId)
      .single();

    if (error || !data) throw ApiError.notFound('Enrollment not found');
    return data;
  },

  // ============================================
  // CREATE COURSE (TEACHER/ADMIN)
  // ============================================
  createCourse: async (user, courseData) => {
    // Get teacher profile if user is a teacher
    let teacherId = null;
    if (user.role === 'TEACHER') {
      const { data: teacher } = await supabase
        .from('teachers')
        .select('id')
        .eq('user_id', user.id)
        .single();
      teacherId = teacher?.id;
    }

    const course = {
      title: courseData.title,
      slug: helpers.generateSlug(courseData.title),
      description: courseData.description || '',
      short_description: courseData.short_description || '',
      course_type: courseData.course_type || 'FREE',
      level: courseData.level || 'N5',
      module_type: courseData.module_type || 'GENERAL',
      price: courseData.price || 0,
      discount_price: courseData.discount_price || 0,
      currency: courseData.currency || 'NPR',
      total_lessons: courseData.total_lessons || 0,
      total_duration_minutes: courseData.total_duration_minutes || 0,
      difficulty_level: courseData.difficulty_level || 'BEGINNER',
      language: courseData.language || 'japanese',
      category_id: courseData.category_id || null,
      teacher_id: teacherId,
      learning_outcomes: courseData.learning_outcomes || [],
      prerequisites: courseData.prerequisites || [],
      target_audience: courseData.target_audience || [],
      is_featured: courseData.is_featured || false,
      is_published: courseData.is_published || false,
      status: courseData.status || 'DRAFT',
      meta_title: courseData.meta_title || courseData.title,
      meta_description: courseData.meta_description || '',
      meta_keywords: courseData.meta_keywords || '',
    };

    const { data, error } = await supabase
      .from('courses')
      .insert(course)
      .select()
      .single();

    if (error) {
      console.error('Error creating course:', error);
      throw ApiError.internal('Failed to create course');
    }

    await redisHelpers.deleteCacheByPattern('courses:*');
    return data;
  },

  // ============================================
  // UPDATE COURSE
  // ============================================
  updateCourse: async (id, updates) => {
    if (updates.title) {
      updates.slug = helpers.generateSlug(updates.title);
    }

    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw ApiError.internal('Failed to update course');
    
    await redisHelpers.deleteCacheByPattern('courses:*');
    return data;
  },

  // ============================================
  // DELETE COURSE (SOFT DELETE)
  // ============================================
  deleteCourse: async (id) => {
    const { error } = await supabase
      .from('courses')
      .update({ 
        deleted_at: new Date().toISOString(), 
        status: 'ARCHIVED' 
      })
      .eq('id', id);

    if (error) throw ApiError.internal('Failed to delete course');
    await redisHelpers.deleteCacheByPattern('courses:*');
  },

  // ============================================
  // PUBLISH COURSE
  // ============================================
  publishCourse: async (id) => {
    const { data, error } = await supabase
      .from('courses')
      .update({ 
        status: 'PUBLISHED', 
        is_published: true,
        published_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw ApiError.internal('Failed to publish course');
    await redisHelpers.deleteCacheByPattern('courses:*');
    return data;
  },

  // ============================================
  // FEATURE COURSE
  // ============================================
  featureCourse: async (id) => {
    const { data: course } = await supabase
      .from('courses')
      .select('is_featured')
      .eq('id', id)
      .single();

    const { data, error } = await supabase
      .from('courses')
      .update({ is_featured: !course?.is_featured })
      .eq('id', id)
      .select()
      .single();

    if (error) throw ApiError.internal('Failed to update feature status');
    return data;
  },

  // ============================================
  // ADD LESSON
  // ============================================
  addLesson: async (courseId, lessonData) => {
    const { data, error } = await supabase
      .from('lessons')
      .insert({
        course_id: courseId,
        title: lessonData.title,
        description: lessonData.description || '',
        lesson_type: lessonData.lesson_type || 'VIDEO',
        section_number: lessonData.section_number || 1,
        lesson_order: lessonData.lesson_order || 1,
        duration_minutes: lessonData.duration_minutes || 0,
        video_url: lessonData.video_url || null,
        content_text: lessonData.content_text || null,
        is_preview: lessonData.is_preview || false,
        is_mandatory: lessonData.is_mandatory !== false,
        status: 'PUBLISHED'
      })
      .select()
      .single();

    if (error) throw ApiError.internal('Failed to add lesson');
    
    // Update course lesson count
    await supabase.rpc('update_course_lesson_count', { course_id: courseId });
    
    return data;
  },

  // ============================================
  // UPDATE LESSON
  // ============================================
  updateLesson: async (lessonId, updates) => {
    const { data, error } = await supabase
      .from('lessons')
      .update(updates)
      .eq('id', lessonId)
      .select()
      .single();

    if (error) throw ApiError.internal('Failed to update lesson');
    return data;
  },

  // ============================================
  // DELETE LESSON
  // ============================================
  deleteLesson: async (lessonId) => {
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', lessonId);

    if (error) throw ApiError.internal('Failed to delete lesson');
  },
};

export { courseService };