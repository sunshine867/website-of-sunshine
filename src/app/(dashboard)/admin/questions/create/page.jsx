// apps/web/src/app/(dashboard)/admin/questions/create/page.jsx

'use client';

 

import React from 'react';
import { useRouter } from 'next/navigation';
import AdvancedQuestionEditor from '@/components/exam/advanced-question-editor';
import { toast } from 'sonner';
import { api } from '@/lib/api';

export default function CreateQuestionPage() {
  const router = useRouter();

  const handleSave = async (questionData) => {
    try {
      const response = await api.post('/questions', {
        ...questionData,
        status: 'draft',
      });
      toast.success('Question created successfully!');
      router.push(`/admin/questions/${response.data.id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to create question');
      throw error;
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-6">
      <AdvancedQuestionEditor
        onSave={handleSave}
        onCancel={handleCancel}
        questionBankId=""
      />
    </div>
  );
}
