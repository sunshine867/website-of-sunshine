'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import { useAuthStore } from '@/stores/auth-store';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, getInitials } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  GraduationCap,
  Plane,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Users,
  BarChart3,
  Shield,
  Globe,
  Building2,
  FileCheck,
  Library,
  FileQuestion,
  ClipboardList,
  Award,
  Calendar,
  Sparkles,
  Brain,
  PieChart,
  UserCog,
  School,
  Database,
  Download,
  Upload,
  Activity,
  AlertCircle,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  Plus,
  Clock,
  CheckCircle,
  Target,
  Trophy,
  Medal,
  Rocket,
  HelpCircle,
  BookMarked,
} from 'lucide-react';

// ============================================
// SIDEBAR LINKS WITH EXAM MANAGEMENT
// ============================================

const sidebarLinks = {
  // ============================================
  // SUPER ADMIN - Full access with exam management
  // ============================================
  SUPER_ADMIN: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Shield, label: 'Users', href: '/admin/users' },
    { icon: Building2, label: 'Organizations', href: '/super-admin/organizations' },
    
    // === EXAM MANAGEMENT ===
    { 
      icon: ClipboardList, 
      label: 'Exam Management', 
      href: '/admin/exams',
      subItems: [
        { icon: FileText, label: 'All Exams', href: '/admin/exams' },
        { icon: Plus, label: 'Create Exam', href: '/admin/exams/create' },
        { icon: Calendar, label: 'Scheduled Exams', href: '/admin/exams/scheduled' },
        { icon: BarChart3, label: 'Results', href: '/admin/exams/results' },
        { icon: PieChart, label: 'Analytics', href: '/admin/exams/analytics' },
      ]
    },
    
    // === QUESTION BANK ===
    {
      icon: Library,
      label: 'Question Bank',
      href: '/admin/question-banks',
      subItems: [
        { icon: BookOpen, label: 'All Banks', href: '/admin/question-banks' },
        { icon: Plus, label: 'New Bank', href: '/admin/question-banks/create' },
        { icon: FileQuestion, label: 'All Questions', href: '/admin/questions' },
        { icon: Plus, label: 'Add Question', href: '/admin/questions/create' },
        { icon: Upload, label: 'Import', href: '/admin/question-banks/import' },
        { icon: Download, label: 'Export', href: '/admin/question-banks/export' },
      ]
    },
    
    // === AI FEATURES ===
    {
      icon: Brain,
      label: 'AI Features',
      href: '/admin/ai',
      subItems: [
        { icon: Sparkles, label: 'Generate Questions', href: '/admin/ai/generate' },
        { icon: ClipboardList, label: 'Review AI Questions', href: '/admin/ai/review' },
        { icon: BarChart3, label: 'AI Analytics', href: '/admin/ai/analytics' },
        { icon: Settings, label: 'AI Settings', href: '/admin/ai/settings' },
      ]
    },
    
    { icon: Award, label: 'Certificates', href: '/admin/certificates' },
    { icon: Globe, label: 'ERP', href: '/admin/erp' },
    { icon: CreditCard, label: 'Finance', href: '/admin/finance' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: Activity, label: 'System Health', href: '/super-admin/system-health' },
    { icon: AlertCircle, label: 'Audit Logs', href: '/admin/audit' },
    { icon: Settings, label: 'Global Settings', href: '/super-admin/global-settings' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ],

  // ============================================
  // ADMIN - Full access with exam management
  // ============================================
  ADMIN: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: BookOpen, label: 'Courses', href: '/admin/courses' },
    
    // === EXAM MANAGEMENT ===
    {
      icon: ClipboardList,
      label: 'Exam Management',
      href: '/admin/exams',
      subItems: [
        { icon: FileText, label: 'All Exams', href: '/admin/exams' },
        { icon: Plus, label: 'Create Exam', href: '/admin/exams/create' },
        { icon: Calendar, label: 'Scheduled Exams', href: '/admin/exams/scheduled' },
        { icon: BarChart3, label: 'Results', href: '/admin/exams/results' },
      ]
    },
    
    // === QUESTION BANK ===
    {
      icon: Library,
      label: 'Question Bank',
      href: '/admin/question-banks',
      subItems: [
        { icon: BookOpen, label: 'All Banks', href: '/admin/question-banks' },
        { icon: Plus, label: 'New Bank', href: '/admin/question-banks/create' },
        { icon: FileQuestion, label: 'All Questions', href: '/admin/questions' },
        { icon: Plus, label: 'Add Question', href: '/admin/questions/create' },
        { icon: Upload, label: 'Import', href: '/admin/question-banks/import' },
        { icon: Download, label: 'Export', href: '/admin/question-banks/export' },
      ]
    },
    
    // === AI FEATURES ===
    {
      icon: Brain,
      label: 'AI Features',
      href: '/admin/ai',
      subItems: [
        { icon: Sparkles, label: 'Generate Questions', href: '/admin/ai/generate' },
        { icon: ClipboardList, label: 'Review AI', href: '/admin/ai/review' },
        { icon: Settings, label: 'AI Settings', href: '/admin/ai/settings' },
      ]
    },
    
    { icon: Award, label: 'Certificates', href: '/admin/certificates' },
    { icon: Globe, label: 'ERP', href: '/admin/erp' },
    { icon: CreditCard, label: 'Finance', href: '/admin/finance' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: AlertCircle, label: 'Audit Logs', href: '/admin/audit' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ],

  // ============================================
  // TEACHER - Teaching tools with exam management
  // ============================================
  TEACHER: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/teacher' },
    
    // === MY EXAMS ===
    {
      icon: ClipboardList,
      label: 'My Exams',
      href: '/teacher/exams',
      subItems: [
        { icon: FileText, label: 'All Exams', href: '/teacher/exams' },
        { icon: Plus, label: 'Create Exam', href: '/teacher/exams/create' },
        { icon: Clock, label: 'Active Exams', href: '/teacher/exams/active' },
        { icon: Calendar, label: 'Upcoming', href: '/teacher/exams/upcoming' },
        { icon: BarChart3, label: 'Results', href: '/teacher/exams/results' },
      ]
    },
    
    // === QUESTION BANKS ===
    {
      icon: Library,
      label: 'Question Banks',
      href: '/teacher/question-banks',
      subItems: [
        { icon: BookOpen, label: 'My Banks', href: '/teacher/question-banks' },
        { icon: Plus, label: 'New Bank', href: '/teacher/question-banks/create' },
        { icon: FileQuestion, label: 'My Questions', href: '/teacher/questions' },
        { icon: Plus, label: 'Add Question', href: '/teacher/questions/create' },
      ]
    },
    
    // === AI ASSISTANT ===
    {
      icon: Brain,
      label: 'AI Assistant',
      href: '/teacher/ai',
      subItems: [
        { icon: Sparkles, label: 'Generate Questions', href: '/teacher/ai/generate' },
        { icon: ClipboardList, label: 'Review AI', href: '/teacher/ai/review' },
        { icon: BarChart3, label: 'Suggestions', href: '/teacher/ai/suggest' },
      ]
    },
    
    // === STUDENTS ===
    {
      icon: Users,
      label: 'Students',
      href: '/teacher/students',
      subItems: [
        { icon: Users, label: 'My Students', href: '/teacher/students' },
        { icon: BarChart3, label: 'Progress', href: '/teacher/students/progress' },
        { icon: PieChart, label: 'Performance', href: '/teacher/students/performance' },
        { icon: Award, label: 'Certificates', href: '/teacher/students/certificates' },
      ]
    },
    
    { icon: Award, label: 'Certificates', href: '/teacher/certificates' },
    { icon: Bell, label: 'Notifications', href: '/teacher/notifications' },
    { icon: Settings, label: 'Settings', href: '/teacher/settings' },
  ],

  // ============================================
  // STUDENT - Learning with exam access
  // ============================================
  STUDENT: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/student' },
    { icon: BookOpen, label: 'My Courses', href: '/student/courses' },
    { icon: FileText, label: 'Study Abroad', href: '/student/study-abroad' },
    
    // === MY EXAMS ===
    {
      icon: ClipboardList,
      label: 'My Exams',
      href: '/student/exams',
      subItems: [
        { icon: FileText, label: 'All Exams', href: '/student/exams' },
        { icon: Calendar, label: 'Upcoming', href: '/student/exams/upcoming' },
        { icon: Clock, label: 'Ongoing', href: '/student/exams/ongoing' },
        { icon: CheckCircle, label: 'Completed', href: '/student/exams/completed' },
        { icon: BarChart3, label: 'Results', href: '/student/exams/results' },
      ]
    },
    
    // === FREE EXAMS ===
    { icon: Rocket, label: 'Free Exams', href: '/free-exams' },
    
    // === LEARNING ===
    {
      icon: BookOpen,
      label: 'Learning',
      href: '/student/learning',
      subItems: [
        { icon: Target, label: 'Progress', href: '/student/learning/progress' },
        { icon: Sparkles, label: 'Recommended', href: '/student/learning/recommended' },
        { icon: BookMarked, label: 'Bookmarks', href: '/student/bookmarks' },
      ]
    },
    
    // === PROGRESS ===
    {
      icon: BarChart3,
      label: 'Progress',
      href: '/student/analytics',
      subItems: [
        { icon: PieChart, label: 'Analytics', href: '/student/analytics' },
        { icon: Trophy, label: 'Leaderboard', href: '/student/analytics/leaderboard' },
        { icon: Target, label: 'Weak Areas', href: '/student/analytics/weak-areas' },
      ]
    },
    
    { icon: Award, label: 'Certificates', href: '/student/certificates' },
    { icon: Medal, label: 'Achievements', href: '/student/achievements' },
    { icon: GraduationCap, label: 'Study Abroad', href: '/student/study-abroad' },
    { icon: Bell, label: 'Notifications', href: '/student/notifications' },
    { icon: HelpCircle, label: 'Help', href: '/student/help' },
    { icon: Settings, label: 'Settings', href: '/student/settings' },
  ],

  // ============================================
  // COUNSELOR - Student guidance
  // ============================================
  COUNSELOR: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/counselor' },
    { icon: Users, label: 'Leads', href: '/admin/erp/leads' },
    { icon: FileCheck, label: 'Applications', href: '/admin/erp/applications' },
    { icon: Building2, label: 'Universities', href: '/admin/erp/universities' },
    { icon: Globe, label: 'Countries', href: '/admin/erp' },
    { icon: BookOpen, label: 'Study Abroad', href: '/admin/erp/study-abroad' },
    { icon: Bell, label: 'Notifications', href: '/counselor/notifications' },
    { icon: Settings, label: 'Settings', href: '/counselor/settings' },
  ],

  // ============================================
  // ACCOUNTANT - Financial management
  // ============================================
  ACCOUNTANT: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/accountant' },
    { icon: CreditCard, label: 'Payments', href: '/admin/finance' },
    { icon: BarChart3, label: 'Reports', href: '/admin/finance/reports' },
    { icon: Users, label: 'Students', href: '/admin/finance/students' },
    { icon: FileText, label: 'Invoices', href: '/admin/finance/invoices' },
    { icon: Bell, label: 'Notifications', href: '/accountant/notifications' },
    { icon: Settings, label: 'Settings', href: '/accountant/settings' },
  ],
};

// ============================================
// SIDEBAR COMPONENT
// ============================================
const Sidebar = ({ links, sidebarOpen, setSidebarOpen, pathname, logout }) => {
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleSubMenu = (href) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  const hasSubItems = (link) => {
    return link.subItems && link.subItems.length > 0;
  };

  return (
    <aside className={cn(
      'fixed top-0 left-0 z-40 h-full bg-white border-r transition-all duration-300',
      sidebarOpen ? 'w-64' : 'w-20',
      'hidden lg:block'
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {sidebarOpen && (
          <Link href="/" className="text-xl font-extrabold text-gradient">
            Sunshine Edu
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="h-[calc(100%-8rem)]">
        <nav className="p-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
            const hasSub = hasSubItems(link);
            const isSubOpen = openSubMenus[link.href];

            if (hasSub && sidebarOpen) {
              return (
                <div key={link.href} className="space-y-1">
                  <button
                    onClick={() => toggleSubMenu(link.href)}
                    className={cn(
                      'flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer',
                      isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span>{link.label}</span>
                    </div>
                    {isSubOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
                  </button>
                  {isSubOpen && (
                    <div className="ml-6 space-y-1 border-l pl-3">
                      {link.subItems.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = pathname === sub.href || pathname?.startsWith(sub.href + '/');
                        return (
                          <Link key={sub.href} href={sub.href}>
                            <div className={cn(
                              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer',
                              isSubActive
                                ? 'bg-primary-50 text-primary-700'
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                            )}>
                              <SubIcon className="h-4 w-4 flex-shrink-0" />
                              <span>{sub.label}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Collapsed sidebar - show only icons
            if (!sidebarOpen) {
              return (
                <Link key={link.href} href={link.href}>
                  <div className={cn(
                    'flex items-center justify-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer',
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}>
                    <Icon className="h-5 w-5 flex-shrink-0" />
                  </div>
                </Link>
              );
            }

            // Regular link
            return (
              <Link key={link.href} href={link.href}>
                <div className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer',
                  isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}>
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{link.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t">
        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-all',
            !sidebarOpen && 'justify-center'
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

// ============================================
// MAIN DASHBOARD LAYOUT
// ============================================
export default function DashboardLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(true);

  // Handle role-based redirect on refresh
  useEffect(() => {
    if (!loading && user) {
      const role = user.role;
      const isAdminPath = pathname.startsWith('/admin');
      const isSuperAdminPath = pathname.startsWith('/super-admin');
      const isTeacherPath = pathname.startsWith('/teacher');
      const isStudentPath = pathname.startsWith('/student');
      const isCounselorPath = pathname.startsWith('/counselor');
      const isAccountantPath = pathname.startsWith('/accountant');
      
      // Super Admins and Admins should be on /admin paths
      if (['ADMIN', 'SUPER_ADMIN'].includes(role) && !isAdminPath && !isSuperAdminPath) {
        router.replace('/admin');
        return;
      }
      
      // Teachers should be on /teacher paths
      if (role === 'TEACHER' && !isTeacherPath && !isAdminPath) {
        router.replace('/teacher');
        return;
      }
      
      // Students should be on /student paths
      if (role === 'STUDENT' && !isStudentPath && !isAdminPath && !isTeacherPath) {
        router.replace('/student');
        return;
      }
      
      // Counselors should be on /counselor paths
      if (role === 'COUNSELOR' && !isCounselorPath && !isAdminPath) {
        router.replace('/counselor');
        return;
      }
      
      // Accountants should be on /accountant paths
      if (role === 'ACCOUNTANT' && !isAccountantPath && !isAdminPath) {
        router.replace('/accountant');
        return;
      }
      
      setIsRedirecting(false);
    } else if (!loading && !user) {
      setIsRedirecting(false);
    }
  }, [user, loading, pathname, router]);

  // Get sidebar links based on role
  let links = sidebarLinks.STUDENT;
  if (user?.role === 'SUPER_ADMIN') links = sidebarLinks.SUPER_ADMIN;
  else if (user?.role === 'ADMIN') links = sidebarLinks.ADMIN;
  else if (user?.role === 'TEACHER') links = sidebarLinks.TEACHER;
  else if (user?.role === 'COUNSELOR') links = sidebarLinks.COUNSELOR;
  else if (user?.role === 'ACCOUNTANT') links = sidebarLinks.ACCOUNTANT;

  // Determine dashboard path
  const getDashboardPath = () => {
    if (['ADMIN', 'SUPER_ADMIN'].includes(user?.role)) return '/admin';
    if (user?.role === 'TEACHER') return '/teacher';
    if (user?.role === 'COUNSELOR') return '/counselor';
    if (user?.role === 'ACCOUNTANT') return '/accountant';
    return '/student';
  };

  if (loading || isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar
        links={links}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        pathname={pathname}
        logout={logout}
      />

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed top-0 left-0 z-50 h-full w-64 bg-white lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b">
                <span className="text-xl font-extrabold text-gradient">Sunshine Edu</span>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="p-3 space-y-1">
                {links.map((link) => {
                  const Icon = link.icon;
                  const hasSub = link.subItems && link.subItems.length > 0;
                  
                  if (hasSub) {
                    return (
                      <div key={link.href} className="space-y-1">
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600">
                          <Icon className="h-5 w-5" />
                          <span>{link.label}</span>
                        </div>
                        <div className="ml-6 space-y-1">
                          {link.subItems.map((sub) => (
                            <Link key={sub.href} href={sub.href} onClick={() => setMobileMenuOpen(false)}>
                              <div className={cn(
                                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm',
                                pathname === sub.href
                                  ? 'bg-primary-50 text-primary-700'
                                  : 'text-gray-500 hover:bg-gray-100'
                              )}>
                                <sub.icon className="h-4 w-4" />
                                <span>{sub.label}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                      <div className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                        pathname === link.href
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      )}>
                        <Icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-3 border-t">
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={cn(
        'transition-all duration-300',
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      )}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </Button>
            </div>
            
            <div className="flex-1" />
            
            <div className="flex items-center gap-3">
              <Link href={`${getDashboardPath()}/notifications`}>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                    3
                  </span>
                </Button>
              </Link>
              
              <div className="flex items-center gap-3 pl-3 border-l">
                <Avatar>
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback className="bg-primary-100 text-primary-700">
                    {getInitials(user?.firstName, user?.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}