'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/countries', label: 'Countries' },
  { href: '/blog', label: 'Blog' },
  { href: '/free-exams', label: 'Free Exam' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            {/* Logo Image - Left side */}
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Sunshine Edu"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>

            {/* Brand Name - Right side */}
            <div>
              <div className="text-2xl font-bold">
                <span className="text-red-600">Sunshine</span>
                <span className="text-blue-600">Internatonal</span>
              </div>
              <p className="text-xl text-gray-500"> Education Center</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === link.href ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login"><Button variant="outline" size="sm">Login</Button></Link>
            <Link href="/apply"><Button variant="gradient" size="sm">Apply Now</Button></Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className={cn('block px-3 py-2 rounded-lg text-sm font-medium', pathname === link.href ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50')}>
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-3">
                <Link href="/login" className="flex-1"><Button variant="outline" size="sm" className="w-full">Login</Button></Link>
                <Link href="/apply" className="flex-1"><Button variant="gradient" size="sm" className="w-full">Apply Now</Button></Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}