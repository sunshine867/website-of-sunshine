'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File, Image, Video, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FileUpload({ onUpload, accept, maxFiles = 1, maxSize = 5242880, label = 'Upload File' }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    onUpload?.(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
  });

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (type) => {
    if (type?.startsWith('image/')) return Image;
    if (type?.startsWith('video/')) return Video;
    if (type?.startsWith('audio/')) return Music;
    return File;
  };

  return (
    <div>
      <div        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
        <p className="text-sm text-gray-500">{isDragActive ? 'Drop files here...' : label}</p>
        <p className="text-xs text-gray-400 mt-1">or click to browse</p>
      </div>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => {
            const FileIcon = getFileIcon(file.type);
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileIcon className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-red-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}