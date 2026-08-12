'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApiQuery } from '@/hooks/use-api';
import { erpApi } from '@/lib/api/erp';
import { Search, MapPin, Star, Globe, ArrowRight } from 'lucide-react';

const countries = ['All', 'Japan', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'South Korea', 'New Zealand'];

export default function UniversitiesPage() {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const universities = [
    { id: 1, name: 'University of Tokyo', country: 'Japan', city: 'Tokyo', ranking: 1, programs: 150, students: 28000, scholarship: true },
    { id: 2, name: 'Kyoto University', country: 'Japan', city: 'Kyoto', ranking: 2, programs: 120, students: 22000, scholarship: true },
    { id: 3, name: 'Harvard University', country: 'USA', city: 'Cambridge', ranking: 1, programs: 200, students: 31000, scholarship: true },
    { id: 4, name: 'Oxford University', country: 'UK', city: 'Oxford', ranking: 1, programs: 180, students: 24000, scholarship: true },
    { id: 5, name: 'University of Toronto', country: 'Canada', city: 'Toronto', ranking: 1, programs: 160, students: 60000, scholarship: true },
    { id: 6, name: 'University of Melbourne', country: 'Australia', city: 'Melbourne', ranking: 1, programs: 140, students: 52000, scholarship: true },
    { id: 7, name: 'TU Munich', country: 'Germany', city: 'Munich', ranking: 1, programs: 130, students: 42000, scholarship: true },
    { id: 8, name: 'Seoul National University', country: 'South Korea', city: 'Seoul', ranking: 1, programs: 110, students: 28000, scholarship: true },
  ].filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || u.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold mb-4">Partner Universities</h1>
            <p className="text-xl text-white/80">Explore universities across 8+ countries</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input placeholder="Search universities..." className="pl-10 h-12" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-2">
            {countries.map(c => (
              <Badge key={c} variant={selectedCountry === c ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setSelectedCountry(c)}>
                {c}
              </Badge>
            ))}
          </div>
        </div>

        {/* University Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni, i) => (
            <motion.div key={uni.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="overflow-hidden hover:shadow-xl transition-all h-full">
                <div className="h-32 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-4xl">🏛️</div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{uni.country}</Badge>
                    <Badge variant="secondary">Rank #{uni.ranking}</Badge>
                    {uni.scholarship && <Badge variant="success">Scholarship</Badge>}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{uni.name}</h3>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{uni.city}, {uni.country}</div>
                    <div className="flex items-center gap-2"><Star className="h-4 w-4" />{uni.programs}+ Programs</div>
                    <div className="flex items-center gap-2"><Globe className="h-4 w-4" />{uni.students.toLocaleString()}+ Students</div>
                  </div>
                  <Button variant="gradient" size="sm" className="w-full">View Details <ArrowRight className="ml-1 h-4 w-4" /></Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
