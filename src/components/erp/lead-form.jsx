'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useApiMutation } from '@/hooks/use-api';
import { erpApi } from '@/lib/api/erp';
import { User, Mail, Phone, Globe, Send } from 'lucide-react';

export default function LeadForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    interested_countries: [], preferred_field: '', preferred_intake: '',
    source: 'WEBSITE', notes: '', priority: 'MEDIUM'
  });

  const createMutation = useApiMutation(
    (data) => erpApi.createLead(data),
    { successMessage: 'Lead created!', onSuccess }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const countries = ['Japan', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'South Korea', 'New Zealand'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block"><User className="inline h-3 w-3 mr-1" /> First Name *</label>
          <Input value={formData.first_name} onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))} required />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Last Name *</label>
          <Input value={formData.last_name} onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))} required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block"><Mail className="inline h-3 w-3 mr-1" /> Email</label>
          <Input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block"><Phone className="inline h-3 w-3 mr-1" /> Phone *</label>
          <Input type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} required />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1.5 block"><Globe className="inline h-3 w-3 mr-1" /> Interested Countries</label>
        <div className="flex flex-wrap gap-2">
          {countries.map(c => (
            <button key={c} type="button" onClick={() => setFormData(prev => ({
              ...prev,
              interested_countries: prev.interested_countries.includes(c) 
                ? prev.interested_countries.filter(x => x !== c)
                : [...prev.interested_countries, c]
            }))} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              formData.interested_countries.includes(c) ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
            }`}>{c}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1.5 block">Notes</label>
        <Textarea value={formData.notes} onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))} placeholder="Any additional information..." />
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" variant="gradient" loading={createMutation.isPending}>
          <Send className="mr-2 h-4 w-4" /> Save Lead
        </Button>
      </div>
    </form>
  );
}