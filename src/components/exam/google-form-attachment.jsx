// apps/web/src/components/exam/google-form-attachment.jsx

'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Link2,
  ExternalLink,
  Copy,
  Check,
  Trash2,
  Eye,
  FileText,
  Users,
  BarChart3,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

const GoogleFormAttachment = ({
  questionId,
  onAttach,
  onRemove,
  existingForm,
  isEmbedded = true,
}) => {
  const [formUrl, setFormUrl] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [description, setDescription] = useState('');
  const [openMethod, setOpenMethod] = useState('embedded');
  const [requireSubmission, setRequireSubmission] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [showInExam, setShowInExam] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [formValid, setFormValid] = useState(null);
  const [formId, setFormId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  // ============================================
  // VALIDATE FORM URL
  // ============================================
  const validateForm = async () => {
    if (!formUrl.trim()) {
      toast.error('Please enter a Google Form URL or ID');
      return;
    }

    try {
      setIsValidating(true);
      setFormValid(null);

      const response = await api.post('/google-forms/verify', { url: formUrl });
      const extractedId = response.data.data?.formId;

      if (extractedId) {
        setFormId(extractedId);
        setFormValid(true);
        toast.success('Valid Google Form found!');
      } else {
        setFormValid(false);
        toast.error('Invalid Google Form URL or ID');
      }
    } catch (error) {
      setFormValid(false);
      toast.error('Failed to validate Google Form');
    } finally {
      setIsValidating(false);
    }
  };

  // ============================================
  // ATTACH FORM
  // ============================================
  const handleAttach = async () => {
    if (!formId) {
      toast.error('Please validate the form first');
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        questionId,
        formId,
        formTitle: formTitle || 'Google Form',
        description: description || '',
        openMethod,
        isEmbedded: openMethod === 'embedded' || openMethod === 'sidebar',
        isQuiz,
        displayInExam: showInExam,
        requireSubmission,
      };

      const response = await api.post(`/google-forms/question/${questionId}/attach`, payload);

      toast.success('Google Form attached successfully!');
      if (onAttach) onAttach(response.data.data);

      // Reset form
      setFormUrl('');
      setFormTitle('');
      setDescription('');
      setFormId(null);
      setFormValid(null);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to attach form');
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // REMOVE FORM
  // ============================================
  const handleRemove = async () => {
    try {
      await api.delete(`/google-forms/${existingForm.id}`);
      toast.success('Form removed successfully');
      if (onRemove) onRemove();
      setRemoveDialogOpen(false);
    } catch (error) {
      toast.error('Failed to remove form');
    }
  };

  // ============================================
  // COPY LINK
  // ============================================
  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard');
    setTimeout(() => setCopied(false), 3000);
  };

  // ============================================
  // VIEW SUBMISSIONS
  // ============================================
  const viewSubmissions = async () => {
    try {
      setLoadingSubmissions(true);
      const response = await api.get(`/google-forms/${existingForm.id}/statistics`);
      setSubmissions(response.data.data?.submissions || []);
      setShowPreview(true);
    } catch (error) {
      toast.error('Failed to load submissions');
    } finally {
      setLoadingSubmissions(false);
    }
  };

  // ============================================
  // SYNC FORM
  // ============================================
  const syncForm = async () => {
    try {
      await api.post(`/google-forms/${existingForm.id}/sync`);
      toast.success('Form synced successfully');
      viewSubmissions();
    } catch (error) {
      toast.error('Failed to sync form');
    }
  };

  // If form already exists, show it
  if (existingForm) {
    const metadata = existingForm.metadata || {};
    const submissionsCount = metadata.totalSubmissions || 0;

    return (
      <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base">{existingForm.title}</CardTitle>
              <Badge variant="outline" className="text-xs">
                Google Form
              </Badge>
              {metadata.isQuiz && (
                <Badge variant="secondary" className="text-xs">
                  Quiz
                </Badge>
              )}
              {metadata.isEmbedded && (
                <Badge variant="outline" className="text-xs">
                  Embedded
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(existingForm.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Open
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyLink(existingForm.url)}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={viewSubmissions}
              >
                <Users className="h-4 w-4 mr-1" />
                {submissionsCount} Submissions
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600"
                onClick={() => setRemoveDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {existingForm.description && (
            <CardDescription>{existingForm.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Link2 className="h-4 w-4" />
              {metadata.formId}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              {submissionsCount} submissions
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              {metadata.requireSubmission ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-400" />
              )}
              {metadata.requireSubmission ? 'Required' : 'Optional'}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              {metadata.displayInExam ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-400" />
              )}
              {metadata.displayInExam ? 'Visible in exam' : 'Hidden from students'}
            </span>
          </div>
        </CardContent>

        {/* Submissions Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-3xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Form Submissions</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {submissions.length} submissions
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={syncForm}>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Sync
                  </Button>
                </div>
              </DialogTitle>
              <DialogDescription>
                Student submissions for "{existingForm.title}"
              </DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[60vh]">
              {loadingSubmissions ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : submissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No submissions yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((sub, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Student #{idx + 1}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(sub.timestamp).toLocaleString()}
                        </span>
                      </div>
                      {sub.data && (
                        <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                          {JSON.stringify(sub.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Close
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(existingForm.metadata?.responsesUrl, '_blank')}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                View Analytics
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Remove Dialog */}
        <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Google Form</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this Google Form from the question?
                This will not delete the form itself, only the link from this question.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemove} className="bg-red-600 hover:bg-red-700">
                Remove Form
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    );
  }

  // Form to attach new Google Form
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5 text-blue-600" />
          Attach Google Form
        </CardTitle>
        <CardDescription>
          Add a Google Form to this question. Students can access it directly in the exam.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Form URL */}
        <div className="space-y-2">
          <Label>Google Form URL or ID</Label>
          <div className="flex gap-2">
            <Input
              value={formUrl}
              onChange={(e) => setFormUrl(e.target.value)}
              placeholder="https://docs.google.com/forms/d/... or form ID"
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={validateForm}
              disabled={isValidating || !formUrl.trim()}
            >
              {isValidating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Validate'
              )}
            </Button>
          </div>
          {formValid === true && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>Valid Google Form: {formId}</span>
            </div>
          )}
          {formValid === false && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Invalid Google Form. Please check the URL.</span>
            </div>
          )}
        </div>

        {/* Form Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Form Title</Label>
            <Input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Enter form title"
            />
          </div>
          <div className="space-y-2">
            <Label>Open Method</Label>
            <Select value={openMethod} onValueChange={setOpenMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new_tab">New Tab</SelectItem>
                <SelectItem value="popup">Popup Window</SelectItem>
                <SelectItem value="sidebar">Sidebar</SelectItem>
                <SelectItem value="embedded">Embedded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Description (Optional)</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description for students..."
            rows={2}
          />
        </div>

        {/* Settings */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center justify-between">
            <Label>Show in Exam</Label>
            <Switch checked={showInExam} onCheckedChange={setShowInExam} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Require Submission</Label>
            <Switch checked={requireSubmission} onCheckedChange={setRequireSubmission} />
          </div>
          <div className="flex items-center justify-between">
            <Label>This is a Quiz</Label>
            <Switch checked={isQuiz} onCheckedChange={setIsQuiz} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Preview Form</Label>
            <Button
              variant="outline"
              size="sm"
              disabled={!formId}
              onClick={() => {
                const url = `https://docs.google.com/forms/d/${formId}/viewform`;
                window.open(url, '_blank');
              }}
            >
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
          </div>
        </div>

        {/* Attach Button */}
        <Button
          onClick={handleAttach}
          disabled={!formId || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Attaching...
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4 mr-2" />
              Attach Google Form
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Students will be able to access this form directly from the exam interface.
          Form submissions will be tracked in the question analytics.
        </p>
      </CardContent>
    </Card>
  );
};

export default GoogleFormAttachment;