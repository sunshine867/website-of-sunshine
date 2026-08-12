'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useApiMutation } from '@/hooks/use-api';
import { examsApi } from '@/lib/api/exams';
import { Upload, FileSpreadsheet, FileJson, FileText, CheckCircle, XCircle, Download } from 'lucide-react';

export default function BulkImport({ questionBankId, onImportComplete }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const { toast } = useToast();

  const importMutation = useApiMutation(
    (formData) => examsApi.bulkImport(questionBankId, formData),
    {
      onSuccess: (data) => {
        setResults(data.data);
        toast({ title: 'Import Complete!', description: `${data.data?.imported || 0} questions imported.` });
        onImportComplete?.(data.data);
      }
    }
  );

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    
    // Preview file content
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (file.name.endsWith('.csv')) {
          // Parse CSV preview
          const text = e.target.result;
          const lines = text.split('\n').filter(l => l.trim());
          const headers = lines[0].split(',');
          const rows = lines.slice(1, 3).map(line => {
            const values = line.split(',');
            const obj = {};
            headers.forEach((h, i) => { obj[h.trim()] = values[i]?.trim(); });
            return obj;
          });
          setPreview(rows);
        } else if (file.name.endsWith('.json')) {
          const data = JSON.parse(e.target.result);
          setPreview(Array.isArray(data) ? data.slice(0, 3) : []);
        }
      } catch (err) {
        toast({ title: 'Error', description: 'Failed to preview file', variant: 'destructive' });
      }
    };
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleImport = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('question_bank_id', questionBankId);
    importMutation.mutate(formData);
  };

  const downloadTemplate = (format) => {
    const templates = {
      csv: 'question_type,question_text,difficulty_level,marks,option_a,option_b,option_c,option_d,correct_answer,topic\nMCQ,What is 2+2?,EASY,1,3,4,5,6,B,Math',
      json: JSON.stringify([{
        question_type: 'MCQ',
        question_text: 'What is 2+2?',
        difficulty_level: 'EASY',
        marks: 1,
        options: [
          { option_text: '3', is_correct: false },
          { option_text: '4', is_correct: true },
          { option_text: '5', is_correct: false },
          { option_text: '6', is_correct: false },
        ],
        topic: 'Math',
      }], null, 2),
    };

    const blob = new Blob([templates[format]], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `question-template.${format}`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {isDragActive ? 'Drop your file here' : 'Upload Question File'}
            </h3>
            <p className="text-gray-500 text-sm">
              Supported formats: CSV, JSON, Excel (.xlsx)
            </p>
          </div>

          {/* Download Templates */}
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => downloadTemplate('csv')}>
              <Download className="mr-1 h-4 w-4" /> CSV Template
            </Button>
            <Button variant="outline" size="sm" onClick={() => downloadTemplate('json')}>
              <Download className="mr-1 h-4 w-4" /> JSON Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* File Preview */}
      {file && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <Button variant="gradient" onClick={handleImport} loading={importMutation.isPending}>
                Import Questions
              </Button>
            </div>

            {/* Preview Table */}
            {preview.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Preview (first {preview.length} rows)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(preview[0]).map(key => (
                          <th key={key} className="p-2 text-left text-xs font-medium text-gray-500 uppercase">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((row, i) => (
                        <tr key={i} className="border-t">
                          {Object.values(row).map((val, j) => (
                            <td key={j} className="p-2 text-xs max-w-[200px] truncate">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Import Results */}
      {results && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Import Results</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-green-600">{results.imported || 0}</p>
                  <p className="text-xs text-gray-500">Imported</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Badge variant="warning" className="mb-1">{results.skipped || 0}</Badge>
                  <p className="text-xs text-gray-500">Skipped</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-red-600">{results.errors || 0}</p>
                  <p className="text-xs text-gray-500">Errors</p>
                </div>
              </div>
              {results.error_details?.length > 0 && (
                <div className="text-sm text-red-600 space-y-1">
                  {results.error_details.map((err, i) => (
                    <p key={i}>Row {err.row}: {err.message}</p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}