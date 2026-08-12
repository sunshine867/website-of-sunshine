'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useApiMutation } from '@/hooks/use-api';
import { erpApi } from '@/lib/api/erp';
import { 
  User, Mail, Phone, BookOpen, 
  Globe, Calendar, Send, CheckCircle, ArrowRight
} from 'lucide-react';

const countries = ['Japan', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'South Korea', 'New Zealand'];
const intakes = ['April 2027', 'July 2027', 'October 2027', 'January 2028'];
const fields = ['Engineering', 'IT & Computer Science', 'Business & Management', 'Healthcare', 'Arts & Humanities', 'Science', 'Law', 'Other'];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    interestedCountries: [], preferredField: '', preferredIntake: '',
    highestEducation: '', budget: '', message: ''
  });
  const { toast } = useToast();

  const submitMutation = useApiMutation(
    (data) => erpApi.createLead(data),
    { successMessage: 'Application submitted successfully! We will contact you soon.' }
  );

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArray = (field, value) => {
    setFormData(prev => {
      const current = prev[field] || [];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(v => v !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMutation.mutate(formData, {
      onSuccess: () => setStep(3)
    });
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <Card>
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
              <p className="text-gray-500 mb-6">
                Thank you for your interest. Our counselor will contact you within 24 hours.
              </p>
              <Button variant="gradient" onClick={() => window.location.href = '/'}>
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold mb-4">Apply Now</h1>
            <p className="text-xl text-white/80">Start your study abroad journey today</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 2 && <div className={`w-20 h-1 ${step > s ? 'bg-primary-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-5">
                    <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          <User className="inline h-4 w-4 mr-1" /> First Name *
                        </label>
                        <Input required value={formData.firstName} 
                          onChange={e => updateField('firstName', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Last Name *</label>
                        <Input required value={formData.lastName}
                          onChange={e => updateField('lastName', e.target.value)} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          <Mail className="inline h-4 w-4 mr-1" /> Email *
                        </label>
                        <Input type="email" required value={formData.email}
                          onChange={e => updateField('email', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          <Phone className="inline h-4 w-4 mr-1" /> Phone *
                        </label>
                        <Input type="tel" required value={formData.phone}
                          onChange={e => updateField('phone', e.target.value)} />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button type="button" onClick={() => setStep(2)}>
                        Next Step <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <h2 className="text-2xl font-bold mb-6">Study Preferences</h2>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <Globe className="inline h-4 w-4 mr-1" /> Interested Countries *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {countries.map(country => (
                          <Badge
                            key={country}
                            variant={formData.interestedCountries.includes(country) ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => toggleArray('interestedCountries', country)}
                          >
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        <BookOpen className="inline h-4 w-4 mr-1" /> Preferred Field
                      </label>
                      <select className="w-full h-11 rounded-lg border-2 px-4" required
                        value={formData.preferredField}
                        onChange={e => updateField('preferredField', e.target.value)}>
                        <option value="">Select field</option>
                        {fields.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        <Calendar className="inline h-4 w-4 mr-1" /> Preferred Intake
                      </label>
                      <select className="w-full h-11 rounded-lg border-2 px-4" required
                        value={formData.preferredIntake}
                        onChange={e => updateField('preferredIntake', e.target.value)}>
                        <option value="">Select intake</option>
                        {intakes.map(i => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Highest Education</label>
                      <Input value={formData.highestEducation}
                        onChange={e => updateField('highestEducation', e.target.value)}
                        placeholder="e.g., Bachelor's Degree" />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Budget Range</label>
                      <select className="w-full h-11 rounded-lg border-2 px-4"
                        value={formData.budget}
                        onChange={e => updateField('budget', e.target.value)}>
                        <option value="">Select budget</option>
                        <option value="5-10 Lakhs">5-10 Lakhs NPR</option>
                        <option value="10-20 Lakhs">10-20 Lakhs NPR</option>
                        <option value="20-30 Lakhs">20-30 Lakhs NPR</option>
                        <option value="30+ Lakhs">30+ Lakhs NPR</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Additional Message</label>
                      <Textarea value={formData.message}
                        onChange={e => updateField('message', e.target.value)}
                        placeholder="Any specific requirements or questions..."
                        className="min-h-[100px]" />
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button type="submit" variant="gradient" size="lg" loading={submitMutation.isPending}>
                        <Send className="mr-2 h-5 w-5" /> Submit Application
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
