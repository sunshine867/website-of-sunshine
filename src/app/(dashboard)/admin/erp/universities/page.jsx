'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApiQuery } from '@/hooks/use-api';
import { erpApi } from '@/lib/api/erp';
import SearchInput from '@/components/shared/search-input';
import EmptyState from '@/components/shared/empty-state';
import { Building2, MapPin, Star, Globe, Plus } from 'lucide-react';

export default function AdminUniversitiesPage() {
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');

  const { data: uniData } = useApiQuery('admin-universities', () => erpApi.getUniversities());
  const universities = uniData?.data?.universities || [];
  const countries = [...new Set(universities.map(u => u.country?.name))];

  const filtered = universities.filter(u => {
    const matchesSearch = u.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = countryFilter === 'all' || u.country?.name === countryFilter;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Universities</h1>
            <p className="text-gray-500 mt-1">Manage partner universities</p>
          </div>
          <Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> Add University</Button>
        </div>
      </motion.div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <SearchInput value={search} onChange={setSearch} placeholder="Search universities..." className="flex-1" />
            <select className="border rounded-lg px-3 py-2 text-sm" value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
              <option value="all">All Countries</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full"><EmptyState icon={Building2} title="No universities found" /></div>
        ) : (
          filtered.map((uni, i) => (
            <motion.div key={uni.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{uni.country?.name}</Badge>
                    <Badge variant="secondary">Rank #{uni.world_ranking}</Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{uni.name}</h3>
                  <div className="space-y-1 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {uni.city}</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {uni.available_programs?.length || 0} Programs</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
