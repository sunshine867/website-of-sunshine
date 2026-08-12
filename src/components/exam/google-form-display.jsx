// apps/web/src/components/exam/google-form-display.jsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  ExternalLink,
  Maximize2,
  Minimize2,
  Loader2,
  CheckCircle,
  XCircle,
  FileText,
  Link2,
  Copy,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

const GoogleFormDisplay = ({
  resource,
  onSubmission,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(600);

  const metadata = resource?.metadata || {};
  const openMethod = resource?.open_method || 'new_tab';
  const embedUrl = metadata?.embedUrl || '';
  const directUrl = metadata?.directUrl || resource?.url || '';

  // ============================================
  // TRACK FORM OPEN
  // ============================================
  const handleOpen = () => {
    setIsOpen(true);

    // Track that student opened the form
    if (metadata.requireSubmission) {
      api.post(`/google-forms/${resource.id}/track`, {
        action: 'opened',
      }).catch(console.error);
    }
  };

  // ============================================
  // HANDLE SUBMISSION (via iframe postMessage)
  // ============================================
  useEffect(() => {
    const handleMessage = (event) => {
      // Check if message is from Google Forms
      if (event.origin.includes('docs.google.com')) {
        if (event.data === 'submitted' || event.data?.type === 'formSubmit') {
          setSubmitted(true);
          if (onSubmission) onSubmission(event.data);
          toast.success('Form submitted successfully!');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSubmission]);

  // ============================================
  // COPY LINK
  // ============================================
  const copyLink = () => {
    navigator.clipboard.writeText(directUrl);
    setCopied(true);
    toast.success('Link copied to clipboard');
    setTimeout(() => setCopied(false), 3000);
  };

  // ============================================
  // TOGGLE FULLSCREEN
  // ============================================
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // ============================================
  // HANDLE IFRAME LOAD
  // ============================================
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // ============================================
  // RENDER BY OPEN METHOD
  // ============================================
  const renderFormContent = () => {
    if (openMethod === 'new_tab' || openMethod === 'popup') {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="font-medium">{resource.title}</span>
            {metadata.isQuiz && (
              <Badge variant="secondary" className="text-xs">
                Quiz
              </Badge>
            )}
          </div>
          {resource.description && (
            <p className="text-sm text-muted-foreground">{resource.description}</p>
          )}
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => {
              if (openMethod === 'popup') {
                window.open(directUrl, 'GoogleForm', 'width=800,height=600,scrollbars=yes');
              } else {
                window.open(directUrl, '_blank');
              }
              setIsOpen(true);
            }}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Google Form
            </Button>
            <Button variant="outline" onClick={copyLink}>
              {copied ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Link2 className="h-4 w-4 mr-2" />
              )}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>
          {metadata.requireSubmission && submitted && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <span>Form submitted successfully!</span>
            </div>
          )}
        </div>
      );
    }

    // Embedded or Sidebar
    return (
      <div ref={containerRef} className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={embedUrl}
          className="w-full border-0 rounded-lg"
          style={{ height: isFullscreen ? '100vh' : `${iframeHeight}px` }}
          onLoad={handleIframeLoad}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
          title={resource.title || 'Google Form'}
        />

        {/* Controls */}
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 bg-background/80 backdrop-blur"
            onClick={() => window.open(directUrl, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 bg-background/80 backdrop-blur"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 bg-background/80 backdrop-blur"
            onClick={copyLink}
          >
            {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          </Button>
        </div>

        {metadata.requireSubmission && submitted && (
          <div className="mt-3 flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Form submitted successfully!</span>
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // MAIN RENDER
  // ============================================
  if (openMethod === 'sidebar') {
    return (
      <>
        <Button variant="outline" onClick={handleOpen} className={className}>
          <FileText className="h-4 w-4 mr-2" />
          Open Google Form
          {metadata.requireSubmission && (
            <Badge variant="secondary" className="ml-2 text-xs">
              Required
            </Badge>
          )}
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className="w-full sm:max-w-2xl">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                {resource.title || 'Google Form'}
              </SheetTitle>
              {resource.description && (
                <SheetDescription>{resource.description}</SheetDescription>
              )}
            </SheetHeader>
            <div className="mt-4">
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
        <Button variant="outline" onClick={handleOpen} className={className}>
          <FileText className="h-4 w-4 mr-2" />
          Open Google Form
          {metadata.requireSubmission && (
            <Badge variant="secondary" className="ml-2 text-xs">
              Required
            </Badge>
          )}
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                {resource.title || 'Google Form'}
              </DialogTitle>
              {resource.description && (
                <DialogDescription>{resource.description}</DialogDescription>
              )}
            </DialogHeader>
            <div className="mt-4 overflow-y-auto max-h-[70vh]">
              {renderFormContent()}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Default: render inline (new_tab)
  return renderFormContent();
};

export default GoogleFormDisplay;