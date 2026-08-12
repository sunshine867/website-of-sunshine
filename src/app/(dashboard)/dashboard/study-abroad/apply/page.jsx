'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useApiMutation } from '@/hooks/use-api';
import { erpApi } from '@/lib/api/erp';
import { useApiQuery } from '@/hooks/use-api';
import { 
  Building2, Globe, BookOpen, Calendar, 
  User, Mail, Phone, MapPin, Send, ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';

export default function ApplyStudyAbroadPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const { data: countriesData } = useApiQuery('countries', () => erpApi.getCountries());
  const { data: universitiesData } = useApiQuery('universities', () => erpApi.getUniversities());

  const countries = countriesData?.data || [];
  const universities = universitiesData?.data?.universities || [];

  const [formData, setFormData] = useState({
    university_id: '',
    program_name: '',
    intake_date: '',
    previous_education: '',
    sop: '',
  });

  const createApplicationMutation = useApiMutation(
    (data) => erpApi.createApplication(data),
    {
      successMessage: 'Application created successfully!',
      onSuccess: () => router.push('/dashboard/study-abroad')
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createApplicationMutation.mutate(formData);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/dashboard/study-abroad" className="inline-flex items-center text-gray-500 hover:text-gray-700">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">New Application</h1>
        <p className="text-gray-500 mt-1">Apply to study abroad</p>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>{s}</div>
            {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-primary-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold mb-4">Select University & Program</h2>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    <Building2 className="inline h-4 w-4 mr-1" /> University *
                  </label>
                  <select 
                    className="w-full h-11 rounded-lg border-2 px-4"
                    value={formData.university_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, university_id: e.target.value }))}
                    required
                  >
                    <option value="">Select university</option>
                    {universities.map((uni) => (
                      <option key={uni.id} value={uni.id}>
                        {uni.name} - {uni.country?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    <BookOpen className="inline h-4 w-4 mr-1" /> Program Name *
                  </label>
                  <Input 
                    placeholder="e.g., Computer Science, Business Administration"
                    value={formData.program_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, program_name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    <Calendar className="inline h-4 w-4 mr-1" /> Intake *
                  </label>
                  <select 
                    className="w-full h-11 rounded-lg border-2 px-4"
                    value={formData.intake_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, intake_date: e.target.value }))}
                    required
                  >
                    <option value="">Select intake</option>
                    <option value="April 2027">April 2027</option>
                    <option value="July 2027">July 2027</option>
                    <option value="October 2027">October 2027</option>
                    <option value="January 2028">January 2028</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <Button type="button" onClick={() => setStep(2)}>Next Step</Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold mb-4">Educational Background</h2>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Previous Education *</label>
                  <Input 
                    placeholder="e.g., Bachelor's in Engineering"
                    value={formData.previous_education}
                    onChange={(e) => setFormData(prev => ({ ...prev, previous_education: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Statement of Purpose</label>
                  <Textarea 
                    placeholder="Why do you want to study abroad? What are your goals?"
                    className="min-h-[150px]"
                    value={formData.sop}
                    onChange={(e) => setFormData(prev => ({ ...prev, sop: e.target.value }))}
                  />
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button type="button" onClick={() => setStep(3)}>Next Step</Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-bold mb-4">Review & Submit</h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">University:</span>
                    <p className="font-medium">{universities.find(u => u.id === formData.university_id)?.name || 'Not selected'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Program:</span>
                    <p className="font-medium">{formData.program_name || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Intake:</span>
                    <p className="font-medium">{formData.intake_date || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Education:</span>
                    <p className="font-medium">{formData.previous_education || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>Back</Button>
                  <Button type="submit" variant="gradient" size="lg" loading={createApplicationMutation.isPending}>
                    <Send className="mr-2 h-5 w-5" /> Submit Application
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
