// apps/web/src/components/ui/media-upload.jsx

'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  X,
  Image as ImageIcon,
  AudioWaveform,
  Video,
  File,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { api } from '@/lib/api';

const MediaUpload = ({
  onUploadComplete,
  onRemove,
  multiple = false,
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024, // 50MB
  acceptedTypes = {
    'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'],
    'video/*': ['.mp4', '.webm', '.mov', '.avi'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  },
  className,
}) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const onDrop = useCallback(async (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0,
      url: null,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Auto-upload
    for (const fileData of newFiles) {
      await uploadFile(fileData);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    maxFiles,
    maxSize,
    accept: acceptedTypes,
  });

  const uploadFile = async (fileData) => {
    try {
      setUploading(true);
      setUploadProgress((prev) => ({ ...prev, [fileData.id]: 0 }));

      // Update status
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileData.id ? { ...f, status: 'uploading' } : f
        )
      );

      // Simulate upload with progress
      const formData = new FormData();
      formData.append('file', fileData.file);

      const response = await api.post('/media/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress((prev) => ({ ...prev, [fileData.id]: percentCompleted }));
        },
      });

      // Update file with URL
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileData.id
            ? {
                ...f,
                status: 'completed',
                url: response.data.url,
                progress: 100,
              }
            : f
        )
      );

      if (onUploadComplete) {
        onUploadComplete(response.data);
      }

      toast.success(`Uploaded: ${fileData.name}`);
    } catch (error) {
      console.error('Upload error:', error);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileData.id ? { ...f, status: 'error' } : f
        )
      );
      toast.error(`Failed to upload: ${fileData.name}`);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (id) => {
    const file = files.find((f) => f.id === id);
    setFiles((prev) => prev.filter((f) => f.id !== id));
    if (onRemove && file) {
      onRemove(file);
    }
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return ImageIcon;
    if (type.startsWith('audio/')) return AudioWaveform;
    if (type.startsWith('video/')) return Video;
    if (type.includes('pdf')) return FileText;
    return File;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className={className}>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-primary/50',
          uploading && 'opacity-50 pointer-events-none'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-medium">
            {isDragActive ? 'Drop files here...' : 'Drag & drop files here'}
          </p>
          <p className="text-xs text-muted-foreground">
            or click to browse (Max {maxSize / (1024 * 1024)}MB)
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {Object.entries(acceptedTypes).map(([type, extensions]) => (
              <Badge key={type} variant="outline" className="text-xs">
                {type.split('/')[0]}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => {
            const Icon = getFileIcon(file.type);
            const progress = uploadProgress[file.id] || file.progress || 0;
            const isUploading = file.status === 'uploading';
            const isCompleted = file.status === 'completed';
            const isError = file.status === 'error';

            return (
              <Card key={file.id} className="relative">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">
                        {file.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {formatFileSize(file.size)}
                      </Badge>
                      {isCompleted && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Done
                        </Badge>
                      )}
                      {isError && (
                        <Badge variant="destructive">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Failed
                        </Badge>
                      )}
                    </div>
                    {isUploading && (
                      <div className="mt-1">
                        <Progress value={progress} className="h-1" />
                        <span className="text-xs text-muted-foreground">
                          {progress}%
                        </span>
                      </div>
                    )}
                    {isCompleted && file.url && (
                      <div className="text-xs text-muted-foreground truncate">
                        {file.url}
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={() => removeFile(file.id)}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;