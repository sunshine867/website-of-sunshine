'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';


 


const stories = [
  {
    name: 'Ram Sharma',
    image: '🧑‍🎓',
    achievement: 'JLPT N3 Certified | Now studying in Tokyo',
    university: 'University of Tokyo',
    country: '🇯🇵 Japan',
    story: 'The JLPT preparation course was excellent! I passed N3 in just 6 months. The teachers are very supportive and the study materials are comprehensive. Now I am pursuing my dream of studying at the University of Tokyo.',
    rating: 5,
    date: '2026',
  },
  {
    name: 'Sita Poudel',
    image: '👩‍🎓',
    achievement: 'MEXT Scholarship Recipient',
    university: 'Kyoto University',
    country: '🇯🇵 Japan',
    story: 'The study abroad counseling was amazing. They helped me get admission to Kyoto University with the prestigious MEXT scholarship. Forever grateful for their guidance!',
    rating: 5,
    date: '2026',
  },
  {
    name: 'Bikash Thapa',
    image: '🧑‍💼',
    achievement: 'JLPT N2 Passed | Working in Japanese MNC',
    university: 'Self Study + Platform',
    country: '🇯🇵 Japan',
    story: 'The AI-powered mock tests helped me identify my weak areas. I improved from 60% to 95% in just 3 months! Now I work at a Japanese multinational company.',
    rating: 5,
    date: '2025',
  },
  {
    name: 'Anita Gurung',
    image: '👩‍💼',
    achievement: 'Studying Nursing in Australia',
    university: 'University of Sydney',
    country: '🇦🇺 Australia',
    story: 'The visa assistance and documentation support was incredible. They made the entire process smooth and stress-free. I am now pursuing Nursing at the University of Sydney.',
    rating: 5,
    date: '2025',
  },
  {
    name: 'Rajan KC',
    image: '🧑‍🔧',
    achievement: 'Engineering Student in Germany',
    university: 'TU Munich',
    country: '🇩🇪 Germany',
    story: 'From zero German knowledge to B1 level in 8 months! The structured learning approach and dedicated teachers made it possible. Now studying Engineering at TU Munich.',
    rating: 4,
    date: '2024',
  },
  {
    name: 'Maya Devi',
    image: '👩‍🏫',
    achievement: 'Japanese Language Teacher',
    university: 'Osaka University',
    country: '🇯🇵 Japan',
    story: 'I completed up to N1 level with this platform and now teach Japanese to other students. The comprehensive curriculum and native teachers made all the difference.',
    rating: 5,
    date: '2024',
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold mb-4">Success Stories</h1>
            <p className="text-xl text-white/80">Real stories from our successful students</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  {/* Quote */}
                  <Quote className="h-8 w-8 text-primary-200 mb-4" />
                  
                  {/* Story */}
                  <p className="text-gray-600 mb-6 italic leading-relaxed">
                    "{story.story}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 ${
                          j < story.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Student Info */}
                  <div className="flex items-center gap-4 border-t pt-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                      {story.image}
                    </div>
                    <div>
                      <h4 className="font-bold">{story.name}</h4>
                      <p className="text-sm text-gray-500">{story.achievement}</p>
                    </div>
                  </div>

                  {/* University & Country */}
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="secondary">{story.country}</Badge>
                    <Badge variant="outline" className="text-xs">{story.university}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}