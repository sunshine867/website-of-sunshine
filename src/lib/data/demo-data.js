// apps/web/src/lib/data/demo-data.js

import { dataSource } from './data-source';

class DemoDataService {
  // Courses
  getCourses() {
    return {
      success: true,
      data: {
        data: [
          {
            id: 'demo-1',
            title: 'JLPT N5 Complete Course',
            slug: 'jlpt-n5-complete',
            description: 'Master basic Japanese with our comprehensive N5 course.',
            level: 'N5',
            course_type: 'PAID',
            price: 15000,
            total_lessons: 30,
            total_duration_minutes: 1800,
            average_rating: 4.8,
            total_enrollments: 1200,
            is_featured: true,
            status: 'PUBLISHED',
            teacher: { profile: { first_name: 'Tanaka', last_name: 'Sensei' } },
            category: { name: 'JLPT Preparation' },
          },
          // ... more demo courses
        ],
        meta: {
          pagination: { page: 1, limit: 10, total: 6, totalPages: 1 }
        }
      }
    };
  }

  // Enrollments
  getEnrollments() {
    return {
      success: true,
      data: [
        {
          id: 'enr-1',
          course_id: 'demo-1',
          status: 'ACTIVE',
          progress_percentage: 65,
          enrolled_at: '2026-01-15T00:00:00Z',
          course: {
            title: 'JLPT N5 Complete Course',
            level: 'N5',
            total_lessons: 30,
            total_duration_minutes: 1800,
          }
        },
        // ... more enrollments
      ]
    };
  }

  // Users (Admin view)
  getUsers() {
    return {
      success: true,
      data: {
        data: [
          { id: 'u-1', first_name: 'Ram', last_name: 'Sharma', email: 'ram@email.com', role: 'STUDENT', status: 'ACTIVE', created_at: '2026-01-01' },
          { id: 'u-2', first_name: 'Sita', last_name: 'Poudel', email: 'sita@email.com', role: 'STUDENT', status: 'ACTIVE', created_at: '2026-02-15' },
          { id: 'u-3', first_name: 'Tanaka', last_name: 'Sensei', email: 'teacher@email.com', role: 'TEACHER', status: 'ACTIVE', created_at: '2026-01-01' },
          { id: 'u-4', first_name: 'Admin', last_name: 'User', email: 'admin@email.com', role: 'ADMIN', status: 'ACTIVE', created_at: '2026-01-01' },
        ],
        meta: { pagination: { page: 1, limit: 10, total: 4, totalPages: 1 } }
      }
    };
  }

  // Leads
  getLeads() {
    return {
      success: true,
      data: {
        data: [
          { id: 'l-1', first_name: 'Rajesh', last_name: 'Hamal', email: 'rajesh@email.com', phone: '9841XXXXXX', status: 'NEW', source: 'WEBSITE', interested_countries: ['Japan'], created_at: '2026-07-20' },
          { id: 'l-2', first_name: 'Anita', last_name: 'Sharma', email: 'anita@email.com', phone: '9842XXXXXX', status: 'CONTACTED', source: 'FACEBOOK', interested_countries: ['USA'], created_at: '2026-07-19' },
          { id: 'l-3', first_name: 'Bikram', last_name: 'Thapa', email: 'bikram@email.com', phone: '9843XXXXXX', status: 'INTERESTED', source: 'REFERRAL', interested_countries: ['Australia'], created_at: '2026-07-18' },
        ],
        meta: { pagination: { page: 1, limit: 10, total: 3, totalPages: 1 } }
      }
    };
  }

  // ... similar methods for all other data types
}

export const demoData = new DemoDataService();