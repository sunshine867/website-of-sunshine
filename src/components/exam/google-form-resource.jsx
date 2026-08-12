// apps/web/src/components/exam/google-form-resource.jsx

'use client';

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    ExternalLink,
    FileText,
    CheckCircle,
    Clock,
    Users,
    BarChart,
    Copy,
    Check,
    Link2,
    Eye,
    Edit,
    Trash2,
    MoreVertical,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const GoogleFormResource = ({
    resource,
    onOpen,
    onEdit,
    onDelete,
    onCopy,
    showActions = true,
}) => {
    const [copied, setCopied] = useState(false);

    // ============================================
    // COPY LINK
    // ============================================
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(resource.url);
            setCopied(true);
            toast.success('Link copied to clipboard');

            if (onCopy) onCopy(resource);

            setTimeout(() => setCopied(false), 3000);
        } catch (error) {
            toast.error('Failed to copy link');
        }
    };

    // ============================================
    // GET STATUS COLOR
    // ============================================
    const getStatusColor = () => {
        const submissions = resource.metadata?.submissions?.length || 0;
        if (submissions > 0) {
            return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        }
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    };

    // ============================================
    // GET SUBMISSION COUNT
    // ============================================
    const getSubmissionCount = () => {
        return resource.metadata?.submissions?.length || 0;
    };

    // ============================================
    // GET RESPONSE COUNT
    // ============================================
    const getResponseCount = () => {
        return resource.metadata?.responses?.length || 0;
    };

    // ============================================
    // RENDER
    // ============================================
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <CardTitle className="text-base flex items-center gap-2">
                                {resource.title}
                                {resource.is_quiz && (
                                    <Badge variant="secondary" className="text-xs">
                                        Quiz
                                    </Badge>
                                )}
                                {resource.is_embedded && (
                                    <Badge variant="outline" className="text-xs">
                                        Embedded
                                    </Badge>
                                )}
                            </CardTitle>
                            <CardDescription className="text-sm">
                                {resource.description || 'Google Form'}
                            </CardDescription>
                        </div>
                    </div>

                    {showActions && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => onOpen?.(resource)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Form
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleCopy}>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Copy Link
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onEdit?.(resource)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => onDelete?.(resource)}
                                    className="text-red-600 focus:text-red-600"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Remove Form
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                    <Badge variant="outline" className={getStatusColor()}>
                        {getSubmissionCount() > 0 ? 'Submitted' : 'Pending'}
                    </Badge>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    {getSubmissionCount()} submissions
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                Total form submissions
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <BarChart className="h-4 w-4" />
                                    {getResponseCount()} responses
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                Total form responses collected
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    {resource.metadata?.lastSync
                                        ? new Date(resource.metadata.lastSync).toLocaleDateString()
                                        : 'Never synced'}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                Last sync date
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>

            <CardFooter className="flex flex-wrap gap-2 pt-0">
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => onOpen?.(resource)}
                >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Form
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                >
                    {copied ? (
                        <Check className="mr-2 h-4 w-4" />
                    ) : (
                        <Link2 className="mr-2 h-4 w-4" />
                    )}
                    {copied ? 'Copied!' : 'Copy Link'}
                </Button>

                {resource.metadata?.responses?.length > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            const analyticsUrl = `https://docs.google.com/forms/d/${resource.metadata.formId}/viewanalytics`;
                            window.open(analyticsUrl, '_blank');
                        }}
                    >
                        <BarChart className="mr-2 h-4 w-4" />
                        View Responses
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default GoogleFormResource;