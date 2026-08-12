'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { erpApi } from '@/lib/api/erp';
import { formatDate, getStatusColor } from '@/lib/utils';
import {
  Plane, Building2, FileCheck, Globe, MapPin,
  Calendar, ArrowRight, Plus, Search, Filter,
  Clock, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

export default function StudyAbroadPage() {
  const [activeTab, setActiveTab] = useState('applications');
  
  const { data: applicationsData } = useApiQuery('my-applications', () => 
    erpApi.getApplications()
  );
  const { data: countriesData } = useApiQuery('countries', () => erpApi.getCountries());
  const { data: universitiesData } = useApiQuery('universities', () => 
    erpApi.getUniversities()
  );

  const applications = applicationsData?.data?.data || [];
  const countries = countriesData?.data || [];
  const universities = universitiesData?.data?.universities || [];

  const statusIcons = {
    DRAFT: Clock,
    SUBMITTED: FileCheck,
    UNDER_REVIEW: Search,
    OFFER_RECEIVED: CheckCircle,
    OFFER_ACCEPTED: CheckCircle,
    REJECTED: XCircle,
    DEFERRED: AlertCircle,
  };

  const statusColors = {
    DRAFT: 'bg-gray-100 text-gray-700',
    SUBMITTED: 'bg-blue-100 text-blue-700',
    UNDER_REVIEW: 'bg-yellow-100 text-yellow-700',
    OFFER_RECEIVED: 'bg-green-100 text-green-700',
    OFFER_ACCEPTED: 'bg-green-200 text-green-800',
    REJECTED: 'bg-red-100 text-red-700',
    DEFERRED: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Study Abroad</h1>
            <p className="text-gray-500 mt-1">Manage your study abroad applications</p>
          </div>
          <Button variant="gradient" onClick={() => window.location.href = '/dashboard/study-abroad/apply'}>
            <Plus className="mr-2 h-4 w-4" /> New Application
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: FileCheck, label: 'Total Applications', value: applications.length, color: 'bg-blue-500' },
          { icon: CheckCircle, label: 'Offers Received', value: applications.filter(a => a.status === 'OFFER_RECEIVED').length, color: 'bg-green-500' },
          { icon: Globe, label: 'Countries', value: countries.length, color: 'bg-purple-500' },
          { icon: Building2, label: 'Universities', value: universities.length, color: 'bg-orange-500' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="countries">Countries</TabsTrigger>
          <TabsTrigger value="universities">Universities</TabsTrigger>
        </TabsList>

        {/* Applications Tab */}
        <TabsContent value="applications" className="mt-6">
          <div className="space-y-4">
            {applications.map((app, i) => {
              const StatusIcon = statusIcons[app.status] || Clock;
              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => window.location.href = `/dashboard/study-abroad/${app.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{app.university?.name}</h3>
                            <p className="text-sm text-gray-500">{app.program_name}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                {app.university?.country?.name}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {app.university?.city}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Intake: {app.intake_date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={statusColors[app.status]}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {app.status.replace('_', ' ')}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-2">
                            {formatDate(app.created_at)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
            {applications.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <FileCheck className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No applications yet</p>
                <p className="mb-4">Start your study abroad journey today!</p>
                <Button variant="gradient">Apply Now</Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Countries Tab */}
        <TabsContent value="countries" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map((country, i) => (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-5xl mb-4">{country.code === 'JPN' ? '🇯🇵' : country.code === 'USA' ? '🇺🇸' : '🌍'}</div>
                    <h3 className="font-bold text-lg mb-2">{country.name}</h3>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>Capital: {country.capital}</p>
                      <p>Currency: {country.currency}</p>
                      <p>Language: {country.language}</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View Universities <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Universities Tab */}
        <TabsContent value="universities" className="mt-6">
          <div className="space-y-4">
            {universities.map((uni, i) => (
              <motion.div
                key={uni.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                        🏛️
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{uni.name}</h3>
                        <p className="text-sm text-gray-500">{uni.country?.name} • {uni.city}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="secondary">Rank #{uni.world_ranking}</Badge>
                          {uni.scholarship_available && (
                            <Badge variant="success">Scholarship Available</Badge>
                          )}
                          {uni.accommodation_available && (
                            <Badge variant="info">Accommodation</Badge>
                          )}
                        </div>
                      </div>
                      <Button variant="gradient" size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
