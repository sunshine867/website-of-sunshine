'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft, ChevronRight, ArrowRight, CheckCircle,
  Pause, Play, Globe, Building2, Users, Star
} from 'lucide-react';

// Country data
const countrySlides = [
  {
    country: 'Japan',
    flag: '🇯🇵',
    color: 'from-red-600 to-red-800',
    accent: 'bg-red-500',
    light: 'bg-red-100',
    imageUrl: '/images/countries/japan.png',
    placeholder: 'bg-gradient-to-br from-red-400 via-pink-300 to-orange-300',
    stats: { students: '500+', universities: '800+', satisfaction: '98%' },
    benefits: ['World-class Universities', 'Safe Environment', 'Part-time Work', 'Post-study Visa'],
    popularCourses: ['Engineering', 'IT', 'Business', 'Language'],
    description: 'Home to world-class universities and cutting-edge technology',
    slug: 'japan',
  },
  {
    country: 'United States',
    flag: '🇺🇸',
    color: 'from-blue-600 to-blue-900',
    accent: 'bg-blue-500',
    light: 'bg-blue-100',
    imageUrl: '/images/countries/usa.png',
    placeholder: 'bg-gradient-to-br from-blue-400 via-indigo-300 to-purple-300',
    stats: { students: '1000+', universities: '4000+', satisfaction: '95%' },
    benefits: ['Top-ranked Universities', 'OPT/CPT Programs', 'Research Opportunities', 'Diverse Culture'],
    popularCourses: ['Computer Science', 'Business', 'Engineering', 'Medicine'],
    description: "The world's most popular study destination with diverse programs",
    slug: 'usa',
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    color: 'from-indigo-600 to-purple-800',
    accent: 'bg-indigo-500',
    light: 'bg-indigo-100',
    imageUrl: '/images/countries/uk.png',
    placeholder: 'bg-gradient-to-br from-indigo-400 via-blue-300 to-cyan-300',
    stats: { students: '300+', universities: '300+', satisfaction: '96%' },
    benefits: ['Shorter Duration', 'Work While Study', 'NHS Healthcare', 'Graduate Visa'],
    popularCourses: ['Business', 'Law', 'Engineering', 'Arts'],
    description: 'Prestigious universities with centuries of academic excellence',
    slug: 'uk',
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    color: 'from-red-500 to-red-700',
    accent: 'bg-red-500',
    light: 'bg-red-100',
    imageUrl: '/images/countries/canada.png',
    placeholder: 'bg-gradient-to-br from-red-300 via-orange-200 to-yellow-200',
    stats: { students: '400+', universities: '200+', satisfaction: '97%' },
    benefits: ['PR Pathway', 'Affordable Education', 'Safe Cities', 'Work Permit'],
    popularCourses: ['Engineering', 'Healthcare', 'IT', 'Business'],
    description: 'Clear pathway to permanent residency with quality education',
    slug: 'canada',
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    color: 'from-green-600 to-teal-800',
    accent: 'bg-green-500',
    light: 'bg-green-100',
    imageUrl: '/images/countries/australia.png',
    placeholder: 'bg-gradient-to-br from-green-300 via-teal-200 to-blue-300',
    stats: { students: '250+', universities: '150+', satisfaction: '94%' },
    benefits: ['Post-study Visa', 'High Living Standard', 'Multicultural', 'Research Focus'],
    popularCourses: ['Engineering', 'IT', 'Healthcare', 'Hospitality'],
    description: 'Excellent education with great lifestyle and beautiful weather',
    slug: 'australia',
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    color: 'from-yellow-500 to-orange-700',
    accent: 'bg-yellow-500',
    light: 'bg-yellow-100',
    imageUrl: '/images/countries/germany.png',
    placeholder: 'bg-gradient-to-br from-yellow-300 via-orange-200 to-red-200',
    stats: { students: '200+', universities: '400+', satisfaction: '96%' },
    benefits: ['Free/Low Tuition', 'Strong Economy', 'Research Excellence', 'EU Access'],
    popularCourses: ['Engineering', 'Automotive', 'Science', 'Technology'],
    description: 'Free education at world-class public universities',
    slug: 'germany',
  },
  {
    country: 'South Korea',
    flag: '🇰🇷',
    color: 'from-blue-500 to-indigo-700',
    accent: 'bg-blue-500',
    light: 'bg-blue-100',
    imageUrl: '/images/countries/korea.png',
    placeholder: 'bg-gradient-to-br from-blue-300 via-purple-200 to-pink-200',
    stats: { students: '150+', universities: '200+', satisfaction: '93%' },
    benefits: ['Scholarships Available', 'Tech Industry', 'Modern Culture', 'Safe Environment'],
    popularCourses: ['Technology', 'Engineering', 'Korean Language', 'Business'],
    description: 'Rapidly growing education hub with strong technology focus',
    slug: 'south-korea',
  },
  {
    country: 'New Zealand',
    flag: '🇳🇿',
    color: 'from-emerald-600 to-green-800',
    accent: 'bg-emerald-500',
    light: 'bg-emerald-100',
    imageUrl: '/images/countries/nz.png',
    placeholder: 'bg-gradient-to-br from-emerald-300 via-green-200 to-teal-200',
    stats: { students: '100+', universities: '8', satisfaction: '97%' },
    benefits: ['Safe Environment', 'Work Rights', 'Pathway to PR', 'Quality Life'],
    popularCourses: ['Agriculture', 'Tourism', 'IT', 'Engineering'],
    description: 'Safe and peaceful environment with quality education',
    slug: 'new-zealand',
  },
];

// Single Country Slide Component
function CountrySlide({ country, direction }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeIn' }
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 w-full h-full"
    >
      {/* Background Layer */}
      <div className="absolute inset-0">
        {/* Gradient placeholder (always visible as base) */}
        <div className={`absolute inset-0 ${country.placeholder}`} />

        {/* Real image overlay */}
        {!imgError && (
          <img
            src={country.imageUrl}
            alt={`Study in ${country.country}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">

          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white space-y-6"
          >
            {/* Flag & Badge */}
            <div className="flex items-center gap-3">
              <motion.span
                className="text-5xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {country.flag}
              </motion.span>
              <Badge className="bg-white/20 text-white border-white/30 text-base px-4 py-1.5">
                <Globe className="inline h-3.5 w-3.5 mr-1" />
                Study in {country.country}
              </Badge>
            </div>

            {/* Country Name */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Study in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                {country.country}
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg lg:text-xl text-white/80 max-w-lg leading-relaxed">
              {country.description}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <Users className="h-5 w-5 text-yellow-300" />
                <div>
                  <div className="text-xl font-bold text-yellow-300">{country.stats.students}</div>
                  <div className="text-xs text-white/70">Students Placed</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <Building2 className="h-5 w-5 text-green-300" />
                <div>
                  <div className="text-xl font-bold text-green-300">{country.stats.universities}</div>
                  <div className="text-xs text-white/70">Universities</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <Star className="h-5 w-5 text-blue-300" />
                <div>
                  <div className="text-xl font-bold text-blue-300">{country.stats.satisfaction}</div>
                  <div className="text-xs text-white/70">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {country.benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 text-white/90"
                >
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/apply">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 font-semibold">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/countries">
                <Button
                  size="lg"
                  variant="outline"
                  className="
    border-2 border-white
    bg-white
    text-red-600
    hover:bg-transparent
    hover:text-white
    hover:border-white
    transition-all
    duration-300
  "
                >
                  Explore All Countries
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Popular Courses Card */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="h-5 w-5 text-white" />
                <h3 className="text-xl font-bold text-white">Popular Fields in {country.country}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {country.popularCourses.map((course, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`${country.accent} bg-opacity-30 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10 cursor-pointer hover:bg-opacity-40 transition-all`}
                  >
                    <span className="text-white font-semibold">{course}</span>
                  </motion.div>
                ))}
              </div>

              {/* Partner Universities Count */}
              <motion.div
                className="text-center pt-4 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="text-5xl font-extrabold text-white mb-1">
                  {country.stats.universities}
                </div>
                <div className="text-white/70 text-sm font-medium">
                  Partner Universities in {country.country}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Slider Component
export default function CountrySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const goToSlide = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % countrySlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + countrySlides.length) % countrySlides.length);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (isPaused || isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, isHovered, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch/swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const currentCountry = countrySlides[currentIndex];

  return (
    <section
      className="relative h-[600px] sm:h-[650px] lg:h-[700px] overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <CountrySlide
          key={currentIndex}
          country={currentCountry}
          direction={direction}
        />
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/20 hover:border-white/40 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/20 hover:border-white/40 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Pause/Play Button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-4 right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/20 hover:border-white/40"
        aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
      >
        {isPaused ? <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Pause className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
      </button>

      {/* Slide Counter */}
      <div className="absolute top-4 left-4 z-20 bg-black/30 backdrop-blur-md rounded-full px-3 py-1.5 text-white text-sm border border-white/20">
        {currentIndex + 1} / {countrySlides.length}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {countrySlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${index === currentIndex
                ? 'w-8 h-2.5 bg-white shadow-lg'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Country Quick Nav */}
      {/* Bottom Country Quick Nav */}
<div className="absolute bottom-16 left-0 right-0 z-20 px-4">
  <div className="flex flex-nowrap justify-center gap-2 overflow-x-auto scrollbar-hide">
    {countrySlides.map((country, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          index === currentIndex
            ? "bg-white text-gray-900 shadow-lg scale-105"
            : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
        }`}
      >
        <span>{country.flag}</span>
        <span>{country.country}</span>
      </button>
    ))}
  </div>
</div>
    </section>
  );
}