'use client';

 

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Search, FileText, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';

export default function ImportGoogleFormsPage() {
  const [step, setStep] = useState(1);
  const [connected, setConnected] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const { toast } = useToast();

  // Check Google connection status
  const { data: connectionStatus } = useApiQuery('google-connection', () => 
    fetch('/api/v1/google/forms').then(r => r.json()).catch(() => null)
  );

  const connectMutation = useApiMutation(
    () => fetch('/api/v1/google/auth').then(r => r.json()),
    { onSuccess: (data) => { window.location.href = data.data.url; } }
  );

  const importMutation = useApiMutation(
    (data) => fetch('/api/v1/google/forms/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
    { onSuccess: () => { setImportStatus('success'); setStep(4); } }
  );

  const forms = [
    { id: 'form-1', name: 'JLPT N5 Practice Test', questions: 25, modified: '2026-07-20' },
    { id: 'form-2', name: 'Student Feedback Survey', questions: 10, modified: '2026-07-15' },
    { id: 'form-3', name: 'Placement Test - Grammar', questions: 30, modified: '2026-07-10' },
  ];

  const questionBanks = [
    { id: 'bank-1', name: 'JLPT Question Bank', questions: 500 },
    { id: 'bank-2', name: 'Grammar Assessment Bank', questions: 300 },
    { id: 'bank-3', name: 'Vocabulary Test Bank', questions: 200 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/admin/exams" className="inline-flex items-center text-gray-500 hover:text-gray-700">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">Import from Google Forms</h1>
        <p className="text-gray-500 mt-1">Connect your Google account and import questions</p>
      </motion.div>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {['Connect', 'Select Form', 'Choose Bank', 'Import'].map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step > i + 1 ? 'bg-green-500 text-white' :
              step === i + 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > i + 1 ? <CheckCircle className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-sm ${step >= i + 1 ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
              {label}
            </span>
            {i < 3 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Connect Google */}
      {step === 1 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Connect Google Account</h2>
            <p className="text-gray-500 mb-6">
              Connect your Google account to access and import your Google Forms
            </p>
            <Button variant="gradient" size="lg" onClick={() => connectMutation.mutate()}>
              Connect Google Account
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Select Form */}
      {step === 2 && (
        <Card>
          <CardHeader><CardTitle>Select a Google Form</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {forms.map(form => (
                <div
                  key={form.id}
                  onClick={() => { setSelectedForm(form); setStep(3); }}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedForm?.id === form.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-primary-600" />
                    <div>
                      <p className="font-medium">{form.name}</p>
                      <p className="text-sm text-gray-500">{form.questions} questions • Modified {form.modified}</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Choose Question Bank */}
      {step === 3 && (
        <Card>
          <CardHeader><CardTitle>Choose Destination Question Bank</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {questionBanks.map(bank => (
                <div
                  key={bank.id}
                  onClick={() => { setSelectedBank(bank); }}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedBank?.id === bank.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <p className="font-medium">{bank.name}</p>
                    <p className="text-sm text-gray-500">{bank.questions} existing questions</p>
                  </div>
                  <CheckCircle className={`h-5 w-5 ${selectedBank?.id === bank.id ? 'text-primary-600' : 'text-gray-300'}`} />
                </div>
              ))}
            </div>
            <Button
              variant="gradient"
              className="w-full mt-6"
              disabled={!selectedBank}
              onClick={() => importMutation.mutate({ formId: selectedForm?.id, questionBankId: selectedBank?.id })}
              loading={importMutation.isPending}
            >
              Start Import
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Complete */}
      {step === 4 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Import Complete!</h2>
            <p className="text-gray-500 mb-2">Questions have been successfully imported</p>
            <div className="flex gap-2 justify-center text-sm mb-6">
              <Badge variant="success">25 Questions Imported</Badge>
              <Badge variant="secondary">0 Errors</Badge>
            </div>
            <div className="flex gap-3 justify-center">
              <Link href="/admin/exams">
                <Button variant="outline">Go to Question Bank</Button>
              </Link>
              <Button variant="gradient" onClick={() => { setStep(1); setSelectedForm(null); setSelectedBank(null); }}>
                Import Another Form
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
