'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { galleryApi } from '@/lib/api/gallery';
import FileUpload from '@/components/shared/file-upload';
import { ArrowLeft, Save, Trash2, GripVertical } from 'lucide-react';

export default function AdminGalleryEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState(null);

  const { data: galleryData, isLoading } = useApiQuery(['admin-gallery', id], () => galleryApi.getPhotoGallery(id));
  const updateMutation = useApiMutation((data) => galleryApi.updatePhotoGallery(id, data), { successMessage: 'Gallery updated!', onSuccess: () => router.push('/admin/gallery') });
  const deleteMutation = useApiMutation(() => galleryApi.deletePhotoGallery(id), { successMessage: 'Gallery deleted!', onSuccess: () => router.push('/admin/gallery') });

  useEffect(() => {
    if (galleryData?.data) setFormData(galleryData.data);
  }, [galleryData]);

  if (isLoading || !formData) return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" /></div>;

  const handleSubmit = (e) => { e.preventDefault(); updateMutation.mutate(formData); };
  const handleUpload = (files) => { toast({ title: 'Uploaded!', description: `${files.length} photos added.` }); };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/admin/gallery" className="inline-flex items-center text-gray-500 hover:text-gray-700"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between"><h1 className="text-2xl font-extrabold">Edit Gallery</h1><Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate()}><Trash2 className="mr-1 h-4 w-4" /> Delete</Button></div>
      </motion.div>
      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div><label className="text-sm font-medium mb-1.5 block">Title *</label><Input value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} required /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Description</label><Textarea value={formData.description || ''} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Category</label><Input value={formData.category || ''} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} /></div>
            <div>
              <h3 className="font-bold mb-3">Images ({(formData.images || []).length})</h3>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {(formData.images || []).map((img, i) => (
                  <div key={i} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-2xl">🖼️</div>
                    <button className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100">✕</button>
                  </div>
                ))}
              </div>
              <FileUpload onUpload={handleUpload} accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }} maxFiles={10} label="Add more images" />
            </div>
            <div className="flex justify-end pt-4 border-t"><Button type="submit" variant="gradient" loading={updateMutation.isPending}><Save className="mr-2 h-4 w-4" /> Save Changes</Button></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}