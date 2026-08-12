'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import FileUpload from '@/components/shared/file-upload';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { galleryApi } from '@/lib/api/gallery';
import { useToast } from '@/hooks/use-toast';
import { Plus, Image, Video, Star, Trash2, Edit, Upload } from 'lucide-react';

export default function AdminGalleryPage() {
  const [activeTab, setActiveTab] = useState('photos');
  const [showUpload, setShowUpload] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const { toast } = useToast();

  const { data: photosData } = useApiQuery('admin-photos', () => galleryApi.getPhotos());
  const { data: videosData } = useApiQuery('admin-videos', () => galleryApi.getVideos());
  const { data: storiesData } = useApiQuery('admin-stories', () => galleryApi.getSuccessStories());

  const photos = photosData?.data || [];
  const videos = videosData?.data || [];
  const stories = storiesData?.data || [];

  const deletePhotoMutation = useApiMutation(
    (id) => galleryApi.deletePhoto(id),
    { successMessage: 'Photo deleted', invalidateQueries: 'admin-photos' }
  );

  const deleteVideoMutation = useApiMutation(
    (id) => galleryApi.deleteVideo(id),
    { successMessage: 'Video deleted', invalidateQueries: 'admin-videos' }
  );

  const approveStoryMutation = useApiMutation(
    (id) => galleryApi.approveStory(id),
    { successMessage: 'Story approved', invalidateQueries: 'admin-stories' }
  );

  const handleUploadPhotos = (files) => {
    toast({ title: 'Uploaded!', description: `${files.length} photos uploaded.` });
    setShowUpload(false);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Gallery Management</h1>
            <p className="text-gray-500 mt-1">Manage photos, videos, and success stories</p>
          </div>
          <Button variant="gradient" onClick={() => setShowUpload(true)}>
            <Upload className="mr-2 h-4 w-4" /> Upload Media
          </Button>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="photos"><Image className="h-4 w-4 mr-2" /> Photos ({photos.length})</TabsTrigger>
          <TabsTrigger value="videos"><Video className="h-4 w-4 mr-2" /> Videos ({videos.length})</TabsTrigger>
          <TabsTrigger value="stories"><Star className="h-4 w-4 mr-2" /> Success Stories ({stories.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="mt-6">
          <div className="grid grid-cols-4 gap-4">
            {photos.map((gallery) => (
              <Card key={gallery.id} className="overflow-hidden">
                <div className="h-32 bg-gray-100 flex items-center justify-center text-3xl">🖼️</div>
                <CardContent className="p-4">
                  <h4 className="font-bold text-sm truncate">{gallery.title}</h4>
                  <p className="text-xs text-gray-500">{gallery.images?.length || 0} images</p>
                  <div className="flex gap-1 mt-2">
                    <Button variant="ghost" size="sm" className="flex-1"><Edit className="h-3 w-3 mr-1" /> Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => deletePhotoMutation.mutate(gallery.id)}><Trash2 className="h-3 w-3 text-red-500" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="space-y-3">
            {videos.map((video) => (
              <Card key={video.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 bg-gray-100 rounded flex items-center justify-center text-2xl">🎬</div>
                    <div>
                      <p className="font-medium">{video.title}</p>
                      <p className="text-sm text-gray-500">{video.duration_seconds}s</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteVideoMutation.mutate(video.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stories" className="mt-6">
          <div className="space-y-3">
            {stories.map((story) => (
              <Card key={story.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-xl">👤</div>
                    <div>
                      <p className="font-medium">{story.student_name}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{story.story_content}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={story.status === 'APPROVED' ? 'success' : 'warning'}>{story.status}</Badge>
                    {story.status !== 'APPROVED' && (
                      <Button size="sm" onClick={() => approveStoryMutation.mutate(story.id)}>Approve</Button>
                    )}
                    <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent>
          <DialogHeader><DialogTitle>Upload Media</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Album name (optional)" value={newAlbumName} onChange={(e) => setNewAlbumName(e.target.value)} />
            <FileUpload onUpload={handleUploadPhotos} accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] }} maxFiles={20} label="Drag & drop photos here" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
