
'use client';

 

import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/providers/auth-provider';
import {
  Eye, EyeOff, Mail, Lock, ArrowRight, Sun, Globe,
  GraduationCap, BookOpen, FileText, Plane, CheckCircle,
  Users, Star, Target, Award
} from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  let callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  if (callbackUrl.startsWith('/free-exam') && !callbackUrl.startsWith('/free-exams')) {
    callbackUrl = callbackUrl.replace('/free-exam', '/free-exams');
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
    } catch (error) {
      // Error handled in auth provider
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ============================================ */}
      {/* LEFT SIDE - Branding & Information */}
      {/* ============================================ */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative flex flex-col justify-center px-12 lg:px-16 w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              {/* With your image: */}
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
                <img src="/logo.png" alt="Sunshine International" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold">Sunshine International</h1>
                <p className="text-blue-200 text-lg">Education Center</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <Globe className="h-4 w-4" />
              <span>Language Training • Study Abroad • Career Development</span>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold mb-3">
              Your Gateway to Global Education
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Access comprehensive exam preparation, language training, and study abroad guidance all in one platform.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {[
              { icon: BookOpen, title: 'Language Courses', desc: 'JLPT, JFT, TOPIK & more' },
              { icon: FileText, title: 'Exam System', desc: '20+ free & premium exams' },
              { icon: Plane, title: 'Study Abroad', desc: '8+ countries supported' },
              { icon: GraduationCap, title: 'Career Guidance', desc: 'University placement help' },
            ].map((feature, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <feature.icon className="h-6 w-6 text-yellow-300 mb-2" />
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-blue-200 text-xs mt-1">{feature.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Exam Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-blue-200 mb-3">Available Exam Preparations:</p>
            <div className="flex flex-wrap gap-2">
              {['JLPT N5-N1', 'JFT-Basic', 'TOPIK I-II', 'IELTS', 'TOEFL', 'PTE', 'NAT-TEST'].map((exam) => (
                <Badge key={exam} className="bg-white/20 text-white border-white/30 text-xs">
                  {exam}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-8 mt-8 pt-8 border-t border-white/20"
          >
            {[
              { value: '10,000+', label: 'Students Trained' },
              { value: '500+', label: 'Japan Placements' },
              { value: '95%', label: 'Success Rate' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-extrabold text-yellow-300">{stat.value}</div>
                <div className="text-xs text-blue-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-12 lg:left-16 text-xs text-blue-300">
          © 2026 Sunshine International Education Center. All rights reserved.
        </div>
      </div>

      {/* ============================================ */}
      {/* RIGHT SIDE - Login Form */}
      
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo (visible only on small screens) */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sun className="h-7 w-7 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Sunshine International</h1>
            <p className="text-lg font-semibold text-blue-600">Education Center</p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-center text-gray-800">Welcome Back</CardTitle>
              <CardDescription className="text-center text-gray-500">
                Sign in to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      error={errors.password?.message}
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      {...register('rememberMe')}
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg" loading={loading}>
                  Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

              

                <p className="text-center text-sm text-gray-500 pt-2">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                    Create free account
                  </Link>
                </p>

                {/* Quick Links */}
                <div className="flex justify-center gap-4 pt-2">
                  <Link href="/free-exams" className="text-xs text-gray-400 hover:text-blue-600">
                    Free Practice Exams
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/courses" className="text-xs text-gray-400 hover:text-blue-600">
                    Browse Courses
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/contact" className="text-xs text-gray-400 hover:text-blue-600">
                    Contact Us
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Mobile Footer */}
          <p className="lg:hidden text-center text-xs text-gray-400 mt-6">
            © 2026 Sunshine International Education Center.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Main page with Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
