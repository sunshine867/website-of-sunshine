// src/components/Footer.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section - Logo on Top */}
          <div className="flex flex-col items-center md:items-start gap-3">
            {/* Logo Image */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Sunshine Edu Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Brand Name */}
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold leading-tight">
                <span className="text-red-600">Sunshine</span>
                <span className="text-blue-600">International</span>
              </div>
              <p className="text-xs text-gray-400"> Education Center</p>
            </div>

            <p className="text-gray-400 text-sm mt-2 max-w-sm text-center md:text-left">
              Your trusted partner for studying abroad. We help students achieve their dreams of international education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white border-b border-gray-700 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 text-sm hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/countries" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Countries
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-white border-b border-gray-700 pb-2">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/japanese-classes" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Japanese Classes
                </Link>
              </li>
              <li>
                <Link href="/services/jlpt" className="text-gray-400 text-sm hover:text-white transition-colors">
                  JLPT Preparation
                </Link>
              </li>
              <li>
                <Link href="/services/study-abroad" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Study Abroad
                </Link>
              </li>
              <li>
                <Link href="/services/visa" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Visa Processing
                </Link>
              </li>
              <li>
                <Link href="/services/counseling" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Career Counseling
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white border-b border-gray-700 pb-2">Contact</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm flex items-start gap-2 hover:text-white transition-colors">
                <span className="text-red-500 flex-shrink-0">📍</span>
                <span>Gatthaghar -3, Madhyapur Thimi, Nepal, 44600</span>
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-blue-500 flex-shrink-0">📞</span>
                <span>+977-01-5928989</span>
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-blue-400 flex-shrink-0">📧</span>
                <span>info@sunshineedu.com.np</span>
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-yellow-500 flex-shrink-0">🕐</span>
                <span>Sun-Fri: 6AM-6PM</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/SunShineIEC"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/sun.shine2082/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@SunShineInternationalEducation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@sunshineinternati0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.35h-3.12v13.2a2.67 2.67 0 11-2.67-2.67c.28 0 .55.04.8.12V9.8a5.8 5.8 0 00-.8-.06A5.79 5.79 0 1015.82 15V8.4a7.93 7.93 0 004.63 1.48V6.69h-.86z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SunShine International Education Center. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Website developed by{" "}
            <a
              href="https://spghimire.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Spghimire
            </a>
          </p>

          <div className="flex gap-4 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}