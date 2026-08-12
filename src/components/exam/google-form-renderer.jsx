// apps/web/src/components/exam/google-form-renderer.jsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
    ExternalLink,
    Maximize2,
    Minimize2,
    FileText,
    CheckCircle,
    Clock,
    Users,
    BarChart3,
    Link2,
    Copy,
    Check,
    AlertCircle,
    Loader2,
    RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

const GoogleFormRenderer = ({
    resourceId,
    formData,
    openMethod = 'new_tab',
    isEmbedded = false,
    onSubmission,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formDetails, setFormDetails] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [copied, setCopied] = useState(false);
    const iframeRef = useRef(null);
    const [iframeHeight, setIframeHeight] = useState(600);

    // ============================================
    // LOAD FORM DETAILS
    // ============================================
    useEffect(() => {
        if (resourceId) {
            loadFormDetails();
        }
    }, [resourceId]);

    const loadFormDetails = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/google-forms/${resourceId}/embed`);
            setFormDetails(response.data);
        } catch (error) {
            toast.error('Failed to load form');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // ============================================
    // HANDLE FORM OPEN
    // ============================================
    const handleOpenForm = () => {
        if (!formDetails) return;

        const { resource, form } = formDetails;

        switch (openMethod) {
            case 'new_tab':
                // Open in new tab
                window.open(form.embedUrl, '_blank');
                break;

            case 'popup':
                // Open in popup window
                window.open(
                    form.embedUrl,
                    'GoogleForm',
                    'width=800,height=600,scrollbars=yes'
                );
                break;

            case 'sidebar':
                // Open in sidebar sheet
                setIsOpen(true);
                break;

            case 'embedded':
                // Open in embedded dialog
                setIsOpen(true);
                break;

            default:
                // Default to new tab
                window.open(form.embedUrl, '_blank');
        }
    };

    // ============================================
    // HANDLE IFRAME LOAD
    // ============================================
    const handleIframeLoad = () => {
        setIsLoading(false);

        // Try to adjust iframe height
        try {
            const iframe = iframeRef.current;
            if (iframe) {
                const height = iframe.contentWindow.document.body.scrollHeight;
                if (height) {
                    setIframeHeight(Math.min(height + 50, 800));
                }
            }
        } catch (e) {
            // Cross-origin restrictions
        }
    };

    // ============================================
    // COPY FORM LINK
    // ============================================
    const copyFormLink = () => {
        if (!formDetails) return;

        navigator.clipboard.writeText(formDetails.form.embedUrl);
        setCopied(true);
        toast.success('Form link copied to clipboard');

        setTimeout(() => setCopied(false), 3000);
    };

    // ============================================
    // TRACK SUBMISSION
    // ============================================
    const trackSubmission = async (data) => {
        try {
            await api.post(`/google-forms/${resourceId}/submit`, {
                responseData: data
            });

            setSubmissionStatus('submitted');
            if (onSubmission) {
                onSubmission(data);
            }

            toast.success('Form submission tracked');
        } catch (error) {
            console.error('Failed to track submission:', error);
        }
    };

    // ============================================
    // RENDER FORM CONTENT
    // ============================================
    const renderFormContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            );
        }

        if (!formDetails) {
            return (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Form not available</p>
                </div>
            );
        }

        const { resource, form } = formDetails;

        if (openMethod === 'embedded' || openMethod === 'sidebar') {
            return (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">{resource.title}</h3>
                            {resource.description && (
                                <p className="text-sm text-muted-foreground">
                                    {resource.description}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">
                                {resource.is_quiz ? 'Quiz' : 'Form'}
                            </Badge>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={copyFormLink}
                            >
                                {copied ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(form.embedUrl, '_blank')}
                            >
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                        <iframe
                            ref={iframeRef}
                            src={form.embedUrl}
                            className="w-full border-0"
                            style={{ height: `${iframeHeight}px` }}
                            onLoad={handleIframeLoad}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
                        />
                    </div>

                    {submissionStatus === 'submitted' && (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                            <CheckCircle className="h-5 w-5" />
                            <span>Form submitted successfully!</span>
                        </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {resource.metadata?.totalSubmissions || 0} submissions
                            </span>
                            <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {resource.metadata?.totalResponses || 0} responses
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={loadFormDetails}
                        >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Refresh
                        </Button>
                    </div>
                </div>
            );
        }

        // For new_tab and popup, show a card with link
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {resource.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        {resource.description || 'Click the button below to open the Google Form'}
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Button onClick={handleOpenForm}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open Form
                        </Button>

                        <Button variant="outline" onClick={copyFormLink}>
                            {copied ? (
                                <Check className="mr-2 h-4 w-4" />
                            ) : (
                                <Link2 className="mr-2 h-4 w-4" />
                            )}
                            Copy Link
                        </Button>
                    </div>

                    {formDetails.resource.metadata?.submissions?.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>
                                You have submitted this form{' '}
                                {formDetails.resource.metadata.submissions.length} time(s)
                            </span>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    // ============================================
    // MAIN RENDER
    // ============================================
    if (openMethod === 'sidebar') {
        return (
            <>
                <Button variant="outline" onClick={() => setIsOpen(true)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Open Google Form
                </Button>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetContent side="right" className="w-full sm:max-w-2xl">
                        <SheetHeader>
                            <SheetTitle>Google Form</SheetTitle>
                            <SheetDescription>
                                Complete the form to submit your response
                            </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6">
                            {renderFormContent()}
                        </div>
                    </SheetContent>
                </Sheet>
            </>
        );
    }

    if (openMethod === 'embedded') {
        return (
            <>
                <Button variant="outline" onClick={() => setIsOpen(true)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Open Google Form
                </Button>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="max-w-4xl max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle>Google Form</DialogTitle>
                            <DialogDescription>
                                Complete the form to submit your response
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 overflow-y-auto max-h-[70vh]">
                            {renderFormContent()}
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    // Default: render as is
    return renderFormContent();
};

export default GoogleFormRenderer;