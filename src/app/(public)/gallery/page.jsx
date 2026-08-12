'use client';

 

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const photos = [
  { id: 1, url: '/api/placeholder/400/300', title: 'Campus Event 2026', category: 'Events' },
  { id: 2, url: '/api/placeholder/400/300', title: 'Japanese Culture Day', category: 'Culture' },
  { id: 3, url: '/api/placeholder/400/300', title: 'Student Graduation', category: 'Events' },
  { id: 4, url: '/api/placeholder/400/300', title: 'Language Workshop', category: 'Workshop' },
  { id: 5, url: '/api/placeholder/400/300', title: 'Study Abroad Fair', category: 'Events' },
  { id: 6, url: '/api/placeholder/400/300', title: 'Tea Ceremony', category: 'Culture' },
  { id: 7, url: '/api/placeholder/400/300', title: 'JLPT Preparation', category: 'Workshop' },
  { id: 8, url: '/api/placeholder/400/300', title: 'Calligraphy Class', category: 'Culture' },
  { id: 9, url: '/api/placeholder/400/300', title: 'Student Trip', category: 'Events' },
];

const videos = [
  { id: 1, thumbnail: '/api/placeholder/400/300', title: 'Student Testimonials', duration: '3:45' },
  { id: 2, thumbnail: '/api/placeholder/400/300', title: 'Campus Tour', duration: '5:20' },
  { id: 3, thumbnail: '/api/placeholder/400/300', title: 'Japanese Lesson Demo', duration: '10:15' },
];

const categories = ['All', 'Events', 'Culture', 'Workshop'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('photos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredPhotos = activeCategory === 'All' 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const navigateLightbox = (direction) => {
    setLightboxIndex(prev => {
      if (direction === 'next') return (prev + 1) % filteredPhotos.length;
      return (prev - 1 + filteredPhotos.length) % filteredPhotos.length;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold mb-4">Gallery</h1>
            <p className="text-xl text-white/80">Photos and videos from our events and activities</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {['photos', 'videos'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab === 'photos' ? '📸 Photos' : '🎬 Videos'}
            </button>
          ))}
        </div>

        {activeTab === 'photos' && (
          <>
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map(cat => (
                <Badge
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="cursor-pointer group relative overflow-hidden rounded-xl"
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                    🖼️
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                    <div className="p-3 w-full bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white text-sm font-medium">{photo.title}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">{photo.category}</Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'videos' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-4xl">
                      🎬
                    </div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-primary-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{video.title}</h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-8 w-8" />
            </button>
            <button
              className="absolute left-4 text-white/80 hover:text-white"
              onClick={() => navigateLightbox('prev')}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl max-h-[80vh]"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center text-8xl">
                🖼️
              </div>
              <p className="text-white text-center mt-4 text-lg">
                {filteredPhotos[lightboxIndex]?.title}
              </p>
            </motion.div>
            <button
              className="absolute right-4 text-white/80 hover:text-white"
              onClick={() => navigateLightbox('next')}
            >
              <ChevronRight className="h-10 w-10" />
            </button>
            <div className="absolute bottom-4 text-white/60 text-sm">
              {lightboxIndex + 1} / {filteredPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
