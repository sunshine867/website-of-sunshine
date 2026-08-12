'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, Home, BookOpen, FileText, User, LogIn } from 'lucide-react';

const mobileLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/exams', label: 'Exams', icon: FileText },
  { href: '/dashboard', label: 'Dashboard', icon: User },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button onClick={() => setOpen(true)} className="p-2 text-gray-600 hover:text-gray-900">
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-lg font-extrabold text-gradient">日本語 Edu</span>
                <button onClick={() => setOpen(false)} className="p-1"><X className="h-5 w-5" /></button>
              </div>
              <nav className="p-4 space-y-1">
                {mobileLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                      className={cn('flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                        isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50')}>
                      <Icon className="h-5 w-5" />{link.label}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t">
                  <Link href="/login" onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <LogIn className="h-5 w-5" />Login
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}