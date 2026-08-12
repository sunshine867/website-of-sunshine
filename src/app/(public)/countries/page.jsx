'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Globe, Building2, GraduationCap, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const countries = [
  {
    code: 'JPN', name: 'Japan', flag: '/flags/jp.png',
    capital: 'Tokyo', language: 'Japanese', currency: 'JPY (¥)',
    universities: '800+', students: '300,000+', 
    description: 'World-class education system with cutting-edge technology and rich cultural heritage.',
    benefits: ['World-class Universities', 'Safe Environment', 'Part-time Work', 'Post-study Work Visa'],
    popularFields: ['Engineering', 'IT', 'Business', 'Language']
  },
  {
    code: 'KOR', name: 'South Korea', flag: '/flags/ke.png',
    capital: 'Seoul', language: 'Korean', currency: 'KRW (₩)',
    universities: '200+', students: '150,000+',
    description: 'Rapidly growing education hub with strong technology focus.',
    benefits: ['Scholarships Available', 'Tech Industry', 'Modern Culture', 'Safe Environment'],
    popularFields: ['Technology', 'Engineering', 'Korean Language', 'Business']
  },

  {
    code: 'USA', name: 'United States', flag: '/flags/us.png',
    capital: 'Washington D.C.', language: 'English', currency: 'USD ($)',
    universities: '4000+', students: '1,000,000+',
    description: 'Home to the world\'s top-ranked universities with diverse academic programs.',
    benefits: ['Top-ranked Universities', 'OPT/CPT Programs', 'Research Opportunities', 'Diverse Culture'],
    popularFields: ['Computer Science', 'Business', 'Engineering', 'Medicine']
  },
  {
    code: 'UK', name: 'United Kingdom', flag: '/flags/uk.png',
    capital: 'London', language: 'English', currency: 'GBP (£)',
    universities: '300+', students: '500,000+',
    description: 'Prestigious universities with centuries of academic excellence.',
    benefits: ['Shorter Course Duration', 'Work While Studying', 'NHS Healthcare', 'Graduate Route Visa'],
    popularFields: ['Business', 'Law', 'Engineering', 'Arts']
  },
  {
    code: 'CAN', name: 'Canada', flag: '/flags/cd.png',
    capital: 'Ottawa', language: 'English/French', currency: 'CAD ($)',
    universities: '200+', students: '600,000+',
    description: 'High-quality education with clear pathway to permanent residency.',
    benefits: ['PR Pathway', 'Affordable Education', 'Safe Cities', 'Post-graduation Work'],
    popularFields: ['Engineering', 'Healthcare', 'IT', 'Business']
  },
  {
    code: 'AUS', name: 'Australia', flag: '/flags/au.png',
    capital: 'Canberra', language: 'English', currency: 'AUD ($)',
    universities: '150+', students: '400,000+',
    description: 'Excellent education system with great lifestyle and weather.',
    benefits: ['Post-study Work Visa', 'High Living Standard', 'Multicultural', 'Research Focus'],
    popularFields: ['Engineering', 'IT', 'Healthcare', 'Hospitality']
  },
  {
    code: 'GER', name: 'Germany', flag: '/flags/ge.png',
    capital: 'Berlin', language: 'German', currency: 'EUR (€)',
    universities: '400+', students: '350,000+',
    description: 'Free or low-cost education at world-class public universities.',
    benefits: ['Free/Low Tuition', 'Strong Economy', 'Research Excellence', 'EU Access'],
    popularFields: ['Engineering', 'Automotive', 'Science', 'Technology']
  },

  {
    code: 'NZL', name: 'New Zealand', flag: '/flags/nz.png',
    capital: 'Wellington', language: 'English', currency: 'NZD ($)',
    universities: '8', students: '100,000+',
    description: 'Safe and peaceful environment with quality education.',
    benefits: ['Safe Environment', 'Work Rights', 'Pathway to PR', 'Quality of Life'],
    popularFields: ['Agriculture', 'Tourism', 'IT', 'Engineering']
  },
  {
    code: 'FRA', name: 'France', flag: '/flags/fr.png',
    capital: 'Paris', language: 'French', currency: 'EUR (€)',
    universities: '250+', students: '300,000+',
    description: 'Rich cultural heritage with excellent higher education system.',
    benefits: ['Affordable Education', 'Cultural Experience', 'EU Access', 'Work Opportunities'],
    popularFields: ['Fashion', 'Business', 'Engineering', 'Arts']
  },
  {
    code: 'ITA', name: 'Italy', flag: '/flags/it.png',
    capital: 'Rome', language: 'Italian', currency: 'EUR (€)',
    universities: '150+', students: '100,000+',
    description: 'Historic universities with strong programs in arts, design, and architecture.',
    benefits: ['Cultural Heritage', 'Affordable Living', 'EU Access', 'Design Excellence'],
    popularFields: ['Architecture', 'Design', 'Fashion', 'History']
  },
  {
    code: 'ESP', name: 'Spain', flag: '/flags/sp.png',
    capital: 'Madrid', language: 'Spanish', currency: 'EUR (€)',
    universities: '100+', students: '200,000+',
    description: 'Vibrant culture with growing international education programs.',
    benefits: ['Warm Climate', 'Affordable Cost', 'EU Access', 'Language Learning'],
    popularFields: ['Spanish Language', 'Business', 'Tourism', 'Arts']
  },
  // {
  //   code: 'SGP', name: 'Singapore', flag: '/flags/singapore.png',
  //   capital: 'Singapore', language: 'English/Malay/Chinese/Tamil', currency: 'SGD ($)',
  //   universities: '30+', students: '80,000+',
  //   description: 'World-class education hub in Asia with strong English programs.',
  //   benefits: ['Top Asian Universities', 'English Speaking', 'Safe & Clean', 'Business Hub'],
  //   popularFields: ['Finance', 'Technology', 'Engineering', 'Business']
  // },
  {
    code: 'UAE', name: 'UAE', flag: '/flags/uae.png',
    capital: 'Abu Dhabi', language: 'Arabic/English', currency: 'AED',
    universities: '50+', students: '70,000+',
    description: 'Modern education infrastructure with international branch campuses.',
    benefits: ['Tax-free Income', 'Modern Infrastructure', 'Multicultural', 'Growing Economy'],
    popularFields: ['Business', 'Engineering', 'IT', 'Hospitality']
  },
  // {
  //   code: 'SWE', name: 'Sweden', flag: '/flags/sweden.png',
  //   capital: 'Stockholm', language: 'Swedish/English', currency: 'SEK (kr)',
  //   universities: '50+', students: '80,000+',
  //   description: 'Innovative education system with focus on sustainability and technology.',
  //   benefits: ['Innovation Hub', 'English Programs', 'Work-Life Balance', 'EU Access'],
  //   popularFields: ['Technology', 'Sustainability', 'Design', 'Engineering']
  // },
  // {
  //   code: 'NED', name: 'Netherlands', flag: '/flags/netherlands.png',
  //   capital: 'Amsterdam', language: 'Dutch/English', currency: 'EUR (€)',
  //   universities: '70+', students: '100,000+',
  //   description: 'Excellent English-taught programs in a progressive European country.',
  //   benefits: ['English Widely Spoken', 'Central Location', 'Innovation', 'EU Access'],
  //   popularFields: ['Water Management', 'Agriculture', 'Business', 'Engineering']
  // },
];

// Flag Image Component with Fallback
function FlagImage({ country, className }) {
  const [imgError, setImgError] = useState(false);
  const emojiFlags = {
    JPN: '🇯🇵', USA: '🇺🇸', UK: '🇬🇧', CAN: '🇨🇦', AUS: '🇦🇺',
    GER: '🇩🇪', KOR: '🇰🇷', NZL: '🇳🇿', FRA: '🇫🇷', ITA: '🇮🇹',
    ESP: '🇪🇸', SGP: '🇸🇬', UAE: '🇦🇪', SWE: '🇸🇪', NED: '🇳🇱'
  };

  if (imgError) {
    return <span className={`text-7xl ${className}`}>{emojiFlags[country.code] || '🌍'}</span>;
  }

  return (
    <img
      src={country.flag}
      alt={`${country.name} flag`}
      className={`w-380 h-160 rounded-lg shadow-md object-cover border-2 border-white ${className}`}
      onError={() => setImgError(true)}
    />
  );
}

export default function CountriesPage() {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Study Destinations</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Study Abroad Countries</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Explore top study destinations and find the perfect country for your education
            </p>
            <div className="max-w-md mx-auto mt-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search countries..."
                className="pl-12 h-14 text-gray-900 text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((country, i) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="overflow-hidden hover:shadow-xl transition-all cursor-pointer h-full"
                  onClick={() => setSelectedCountry(selectedCountry?.code === country.code ? null : country)}
                >
                  <div className="h-40 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center relative p-4">
                    <FlagImage country={country} />
                    <Badge className="absolute top-3 right-3">{country.code}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{country.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{country.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">
                        <Building2 className="h-3 w-3 mr-1" /> {country.universities} Universities
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Users className="h-3 w-3 mr-1" /> {country.students} Int'l Students
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {country.popularFields.slice(0, 3).map((field, j) => (
                        <Badge key={j} variant="secondary" className="text-xs">{field}</Badge>
                      ))}
                    </div>
                    {selectedCountry?.code === country.code && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-t pt-4 mt-2"
                      >
                        <h4 className="font-semibold mb-2">Key Benefits</h4>
                        <ul className="space-y-1 mb-3">
                          {country.benefits.map((benefit, j) => (
                            <li key={j} className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="text-green-500">✓</span> {benefit}
                            </li>
                          ))}
                        </ul>
                        <Button variant="gradient" size="sm" className="w-full">
                          Explore {country.name} <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
