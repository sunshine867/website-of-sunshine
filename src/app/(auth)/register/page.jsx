'use client';

 

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/providers/auth-provider';
import { 
  Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, 
  CheckCircle, Sun, Globe, BookOpen, FileText, 
  Plane, GraduationCap, Star, Award
} from 'lucide-react';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Must contain uppercase, lowercase, and number'),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { acceptTerms: false },
  });

  const password = watch('password', '');
  const passwordStrength = {
    hasMin: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
  };
  const strengthScore = Object.values(passwordStrength).filter(Boolean).length;

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone || null,
        acceptTerms: true,
      });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success step
  if (step === 2) {
    return (
      <div className="min-h-screen flex">
        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative flex flex-col justify-center items-center px-12 lg:px-16 w-full text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-extrabold mb-3">Account Created Successfully!</h2>
            <p className="text-green-100 text-lg mb-8">
              We've sent a verification email to your inbox. Please verify your email to get started.
            </p>
            <div className="flex flex-col gap-3 w-64">
              <Link href="/login">
                <Button size="lg" className="w-full bg-white text-green-700 hover:bg-gray-100">
                  Go to Login <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/free-exams">
                <Button size="lg" variant="outline" className="w-full border-white/50 text-white hover:bg-white/10">
                  Try Free Exams
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Mobile Success */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50 p-4 lg:hidden">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
            <Card className="shadow-2xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
                <p className="text-gray-500 mb-6">We've sent a verification email. Please verify to continue.</p>
                <Link href="/login">
                  <Button variant="gradient" className="w-full">Go to Login</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Registration form
  return (
    <div className="min-h-screen flex">
      {/* ============================================ */}
      {/* LEFT SIDE - Branding & Benefits */}
      {/* ============================================ */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative flex flex-col justify-center px-12 lg:px-16 w-full">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
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

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
            <h2 className="text-3xl font-bold mb-3">Start Your Learning Journey</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Join thousands of students preparing for Japanese language exams and pursuing their dreams of studying abroad.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-4 mb-8">
            {[
              { icon: BookOpen, title: 'Free Practice Exams', desc: 'Access 6 free sample exams instantly' },
              { icon: FileText, title: 'Premium Content', desc: 'Unlock 20+ exams with detailed explanations' },
              { icon: Star, title: 'Track Progress', desc: 'Save scores and monitor improvement' },
              { icon: Award, title: 'Certificates', desc: 'Earn certificates for completed courses' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-yellow-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-blue-200 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex gap-8 pt-8 border-t border-white/20">
            {[
              { value: '10,000+', label: 'Students' },
              { value: '500+', label: 'Placements' },
              { value: '95%', label: 'Success' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-extrabold text-yellow-300">{stat.value}</div>
                <div className="text-xs text-blue-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-12 lg:left-16 text-xs text-blue-300">
          © 2026 Sunshine International Education Center.
        </div>
      </div>

      {/* ============================================ */}
      {/* RIGHT SIDE - Registration Form */}
      {/* ============================================ */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-8 overflow-y-auto">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="w-full max-w-lg py-8">
          
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sun className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-xl font-extrabold text-gray-900">Sunshine International</h1>
            <p className="text-sm font-semibold text-blue-600">Education Center</p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-center text-gray-800">Create Account</CardTitle>
              <CardDescription className="text-center text-gray-500">
                Join for free and start your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">First Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="First name" className="pl-10" error={errors.firstName?.message} {...register('firstName')} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Last Name *</label>
                    <Input placeholder="Last name" error={errors.lastName?.message} {...register('lastName')} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input type="email" placeholder="you@example.com" className="pl-10" error={errors.email?.message} {...register('email')} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone (Optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input type="tel" placeholder="+977 98XXXXXXXX" className="pl-10" {...register('phone')} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" className="pl-10 pr-10" error={errors.password?.message} {...register('password')} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= strengthScore ? ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'][i - 1] : 'bg-gray-200'}`} />
                        ))}
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-1">
                        {[
                          { key: 'hasMin', label: '8+ characters' },
                          { key: 'hasUpper', label: 'Uppercase' },
                          { key: 'hasLower', label: 'Lowercase' },
                          { key: 'hasNumber', label: 'Number' },
                        ].map(({ key, label }) => (
                          <div key={key} className="flex items-center gap-1.5 text-xs">
                            <CheckCircle className={`h-3 w-3 ${passwordStrength[key] ? 'text-green-500' : 'text-gray-300'}`} />
                            <span className={passwordStrength[key] ? 'text-green-600' : 'text-gray-400'}>{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input type="password" placeholder="Re-enter password" className="pl-10" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
                  </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" {...register('acceptTerms')} />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                {errors.acceptTerms && <p className="text-xs text-red-500">{errors.acceptTerms.message}</p>}

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg" loading={loading}>
                  Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign in</Link>
                </p>

                <div className="flex justify-center gap-4 pt-1">
                  <Link href="/free-exams" className="text-xs text-gray-400 hover:text-blue-600">Free Exams</Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/courses" className="text-xs text-gray-400 hover:text-blue-600">Courses</Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/contact" className="text-xs text-gray-400 hover:text-blue-600">Contact</Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="lg:hidden text-center text-xs text-gray-400 mt-4">
            © 2026 Sunshine International Education Center.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
