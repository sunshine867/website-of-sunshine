// apps/web/src/components/exam/google-form-embed.jsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    Loader2,
    Maximize2,
    Minimize2,
    ExternalLink,
    RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';

const GoogleFormEmbed = ({
    embedUrl,
    height = 600,
    onLoad,
    onError,
    className,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const iframeRef = useRef(null);
    const containerRef = useRef(null);

    // ============================================
    // HANDLE IFRAME LOAD
    // ============================================
    const handleIframeLoad = () => {
        setIsLoading(false);
        setProgress(100);
        if (onLoad) onLoad();
    };

    // ============================================
    // HANDLE IFRAME ERROR
    // ============================================
    const handleIframeError = () => {
        setIsLoading(false);
        setLoadError('Failed to load Google Form. Please try opening it directly.');
        if (onError) onError(new Error('Failed to load form'));
    };

    // ============================================
    // SIMULATE PROGRESS
    // ============================================
    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(interval);
                        return 90;
                    }
                    return prev + 5;
                });
            }, 200);

            return () => clearInterval(interval);
        }
    }, [isLoading]);

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
    // RELOAD IFRAME
    // ============================================
    const reloadIframe = () => {
        setIsLoading(true);
        setProgress(0);
        setLoadError(null);

        if (iframeRef.current) {
            iframeRef.current.src = embedUrl;
        }
    };

    // ============================================
    // OPEN IN NEW TAB
    // ============================================
    const openInNewTab = () => {
        window.open(embedUrl, '_blank');
        toast.success('Form opened in new tab');
    };

    // ============================================
    // RENDER
    // ============================================
    return (
        <div
            ref={containerRef}
            className={`relative ${className || ''}`}
        >
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <div className="w-64">
                        <Progress value={progress} className="h-2" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                        Loading Google Form...
                    </p>
                </div>
            )}

            {loadError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
                    <div className="text-center space-y-4">
                        <div className="text-red-500">
                            <svg
                                className="h-12 w-12 mx-auto"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold">Failed to Load Form</h3>
                        <p className="text-muted-foreground">{loadError}</p>
                        <div className="flex gap-2 justify-center">
                            <Button onClick={reloadIframe}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Retry
                            </Button>
                            <Button variant="outline" onClick={openInNewTab}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Open Directly
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <iframe
                ref={iframeRef}
                src={embedUrl}
                className="w-full border-0 rounded-lg"
                style={{ height: isFullscreen ? '100vh' : `${height}px` }}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
                title="Google Form"
            />

            {/* Controls */}
            <div className="absolute top-2 right-2 flex gap-1">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 bg-background/80 backdrop-blur"
                    onClick={openInNewTab}
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
                    onClick={reloadIframe}
                >
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default GoogleFormEmbed;